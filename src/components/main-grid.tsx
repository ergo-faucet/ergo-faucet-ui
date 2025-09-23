'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, Suspense } from 'react';
import React from 'react';

import { toast } from 'sonner';
import useSWR from 'swr';

import { useSortStore } from '@/components/navbar/sort-store';
import Package from '@/components/package/package';
import { usePaginationStore } from '@/components/pagination/useStore';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib';
import { swrFetcher } from '@/lib/api/api-fetch';
import { swrAuthFetcher } from '@/lib/api/auth-fetch';
import { useAuthStore } from '@/lib/api/auth-store';
import { Asset, AuthType, PackageDto } from '@/types';

import { PackageDetails } from './package-details/package-details';
import { AuthTaskType } from './package-details/types';
import PackagePagination from './pagination/package-pagination';

interface selectedPackagedProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
}

interface MainGridProps {
  className?: string;
}

function MainGridInner({ className }: MainGridProps) {
  const [selectedPackage, setSelectedPackage] = useState<selectedPackagedProps>({
    title: '',
    assets: [],
    authTasks: [],
    description: '',
  });
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [didInitFromUrl, setDidInitFromUrl] = useState<boolean>(false);
  const accessToken = useAuthStore((s) => s.accessToken);
  const fetcher = useMemo(() => (accessToken ? swrAuthFetcher : (url: string) => swrFetcher(url)), [accessToken]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const entriesPerPage = usePaginationStore((s) => s.entriesPerPage);
  const currentPage = usePaginationStore((s) => s.currentPage);
  const setTotalEntries = usePaginationStore((s) => s.setTotalEntries);
  const setTotalPages = usePaginationStore((s) => s.setTotalPages);
  const setEntriesPerPage = usePaginationStore((s) => s.setEntriesPerPage);
  const setCurrentPage = usePaginationStore((s) => s.setCurrentPage);

  const sortField = useSortStore((s) => s.field);
  const sortOrder = useSortStore((s) => s.order);
  const setSortField = useSortStore((s) => s.setField);
  const setSortOrder = useSortStore((s) => s.setOrder);

  // Map UI sort field to backend query field
  const backendSort = sortField === 'name' ? 'name' : 'openAt';
  const offset = (currentPage - 1) * entriesPerPage;
  const limit = entriesPerPage;

  const key = useMemo(
    () => `/controller/packages?offset=${offset}&limit=${limit}&sort=${backendSort}&order=${sortOrder}`,
    [offset, limit, backendSort, sortOrder],
  );

  const { data, error, isLoading } = useSWR<PackageDto[]>(key, fetcher);

  // Initialize stores from URL on first mount
  useEffect(() => {
    const sp = new URLSearchParams(searchParams?.toString());
    const pageParam = sp.get('page');
    const perPageParam = sp.get('perPage');
    const sortParam = sp.get('sort');
    const orderParam = sp.get('order');
    const selectedParam = sp.get('selected');

    const allowedPerPage = [10, 20, 50];

    // Apply perPage first so that it doesn't reset a page set later
    if (perPageParam) {
      const per = parseInt(perPageParam);
      if (allowedPerPage.includes(per)) {
        if (per !== entriesPerPage) setEntriesPerPage(per);
      } else {
        if (entriesPerPage !== 10) setEntriesPerPage(10);
      }
    }
    if (pageParam) {
      const pageNum = Math.max(1, parseInt(pageParam));
      if (!Number.isNaN(pageNum)) setCurrentPage(pageNum);
    }
    if (sortParam === 'name' || sortParam === 'releaseDate') {
      setSortField(sortParam);
    }
    if (orderParam === 'asc' || orderParam === 'desc') {
      setSortOrder(orderParam);
    }
    if (selectedParam) {
      setSelectedPackageId(selectedParam);
    }
    setDidInitFromUrl(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep selectedPackageId in sync with URL
  useEffect(() => {
    const sp = new URLSearchParams(searchParams?.toString());
    const selectedParam = sp.get('selected') || '';
    if (selectedParam !== selectedPackageId) {
      setSelectedPackageId(selectedParam);
    }
  }, [searchParams, selectedPackageId]);

  // Keep URL in sync with store values
  useEffect(() => {
    if (!didInitFromUrl) return;
    const currentSearch = typeof window !== 'undefined' ? window.location.search : searchParams?.toString() || '';
    const sp = new URLSearchParams(currentSearch);

    const allowedPerPage = [10, 20, 50];
    const desiredPerPage = allowedPerPage.includes(entriesPerPage) ? entriesPerPage : 10;
    const desiredPage = Math.max(1, Number.isFinite(currentPage) ? currentPage : 1);
    const desiredSort = sortField === 'name' || sortField === 'releaseDate' ? sortField : 'releaseDate';
    const desiredOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'desc';
    const desiredSelected = selectedPackageId || '';

    const curPage = sp.get('page') || '';
    const curPerPage = sp.get('perPage') || '';
    const curSort = sp.get('sort') || '';
    const curOrder = sp.get('order') || '';
    const curSelected = sp.get('selected') || '';

    const needsUpdate =
      curPage !== String(desiredPage) ||
      curPerPage !== String(desiredPerPage) ||
      curSort !== desiredSort ||
      curOrder !== desiredOrder ||
      curSelected !== desiredSelected;

    if (!needsUpdate) return;

    sp.set('page', String(desiredPage));
    sp.set('perPage', String(desiredPerPage));
    sp.set('sort', desiredSort);
    sp.set('order', desiredOrder);
    if (desiredSelected) sp.set('selected', desiredSelected);
    else sp.delete('selected');

    const next = sp.toString();
    router.replace(next ? `?${next}` : '?', { scroll: false });
  }, [currentPage, entriesPerPage, sortField, sortOrder, selectedPackageId, router, didInitFromUrl]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const approximateTotal = offset + data.length + (data.length === limit ? limit : 0);
      setTotalEntries(approximateTotal);
      setTotalPages(Math.max(1, Math.ceil(approximateTotal / entriesPerPage)));

      if (selectedPackageId) {
        const matched = (data as PackageDto[]).find((p) => String(p.id || p.name) === selectedPackageId);
        if (matched) {
          const details: selectedPackagedProps = {
            title: matched.name,
            description: matched.description,
            authTasks: (matched.authMethods || []).map((m: PackageDto['authMethods'][number]) => ({
              authType: m.name as AuthType,
              isCompleted: false,
            })),
            assets: (matched.assets || []).map((a: PackageDto['assets'][number]) => ({
              name: a.tokenId,
              amount: BigInt((a.amount ?? '0').toString()),
              decimal: 0,
              tokenId: a.tokenId,
            })),
          };
          setSelectedPackage(details);
        }
      }
    }
  }, [data, entriesPerPage, offset, limit, setTotalEntries, setTotalPages, selectedPackageId]);

  useEffect(() => {
    if (error) {
      let message = 'Failed to load packages';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const possibleMessage = (error as { message?: unknown }).message;
        if (typeof possibleMessage === 'string') {
          message = possibleMessage;
        }
      }
      toast.error(message);
    }
  }, [error]);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className='flex w-full flex-1 items-stretch justify-between gap-4'>
        <div className='flex w-full flex-col items-start justify-between gap-y-4'>
          <div
            className={cn('justfiy-around grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4')}
          >
            {isLoading ? (
              Array.from({ length: Math.max(1, entriesPerPage) }).map((_, i) => (
                <div
                  key={`pkg-skel-${i}`}
                  className='dark:bg-gray-1000 flex h-[195px] min-w-[250px] flex-col rounded-[18px] border
                    border-gray-500 bg-gray-100 p-4 dark:border-gray-700'
                >
                  <Skeleton className='mb-2 h-5 w-2/3' />
                  <Skeleton className='mb-3 h-3 w-1/3' />
                  <div className='mt-1 flex items-center justify-between'>
                    <Skeleton className='h-4 w-28' />
                    <Skeleton className='h-6 w-16 rounded-full' />
                  </div>
                  <Skeleton className='mt-3 h-3 w-5/6' />
                  <Skeleton className='mt-2 h-3 w-2/3' />
                </div>
              ))
            ) : Array.isArray(data) && data.length === 0 && !error ? (
              <div
                className='col-span-full flex min-h-[60vh] w-full items-center justify-center text-center text-gray-700
                  dark:text-gray-400'
              >
                <div>
                  <div className='text-[16px] font-semibold'>No packages on this page</div>
                  <div className='mt-1 text-[14px]'>Try previous page, next page, or change items per page.</div>
                </div>
              </div>
            ) : (
              Array.isArray(data) &&
              (data as PackageDto[]).map((p: PackageDto) => (
                <div
                  key={p.id || p.name}
                  className='w-full cursor-pointer'
                  onClick={() => {
                    const details: selectedPackagedProps = {
                      title: p.name,
                      description: p.description,
                      authTasks: (p.authMethods || []).map((m: PackageDto['authMethods'][number]) => ({
                        authType: m.name as AuthType,
                        isCompleted: false,
                      })),
                      assets: (p.assets || []).map((a: PackageDto['assets'][number]) => ({
                        name: a.tokenId,
                        amount: BigInt((a.amount ?? '0').toString()),
                        decimal: 0,
                        tokenId: a.tokenId,
                      })),
                    };
                    setSelectedPackage(details);
                    setSelectedPackageId(String(p.id || p.name));
                  }}
                >
                  <Package
                    title={p.name}
                    assets={
                      (p.assets || []).map((a: PackageDto['assets'][number]) => ({
                        name: a.tokenId,
                        amount: BigInt((a.amount ?? '0').toString()),
                        decimal: 0,
                        tokenId: a.tokenId,
                      })) as Asset[]
                    }
                    authTypes={(p.authMethods || []).map((m: PackageDto['authMethods'][number]) => m.name as AuthType)}
                    startDate={p.openAt ? new Date(p.openAt) : new Date()}
                    endDate={
                      p.closeAt ? new Date(p.closeAt) : new Date(Date.now() + 24 * 60 * 60 * 1000 * (p.delay || 0))
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className='hidden flex-1 flex-col items-start justify-between gap-y-4 lg:flex'>
          <PackageDetails
            title={selectedPackage.title}
            authTasks={selectedPackage.authTasks}
            assets={selectedPackage.assets}
            description={selectedPackage.description}
          />
        </div>
      </div>
      <PackagePagination />
    </div>
  );
}

export const MainGrid = (props: MainGridProps) => {
  return (
    <Suspense fallback={<div>Loading packages...</div>}>
      <MainGridInner {...props} />
    </Suspense>
  );
};
