'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
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

import { PackageDetails } from '../package-details/package-details';
import { AuthTaskType } from '../package-details/types';
import PackagePagination from '../pagination/package-pagination';
import MainGridSearchParamsSync from './search-params-sync';

interface selectedPackagedProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
  delay?: string;
}

interface MainGridProps {
  className?: string;
}

export const MainGrid = ({ className }: MainGridProps) => {
  const [selectedPackage, setSelectedPackage] = useState<selectedPackagedProps>({
    title: '',
    assets: [],
    authTasks: [],
    description: '',
    delay: undefined,
  });
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [didInitFromUrl, setDidInitFromUrl] = useState<boolean>(false);
  const accessToken = useAuthStore((s) => s.accessToken);
  const fetcher = useMemo(() => (accessToken ? swrAuthFetcher : (url: string) => swrFetcher(url)), [accessToken]);

  const router = useRouter();

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

  // Sort fields now match backend API directly
  const offset = (currentPage - 1) * entriesPerPage;
  const limit = entriesPerPage;

  const key = useMemo(
    () => `/controller/packages?offset=${offset}&limit=${limit}&sort=${sortField}&order=${sortOrder}`,
    [offset, limit, sortField, sortOrder],
  );

  const { data, error, isLoading } = useSWR<PackageDto[]>(key, fetcher);

  // search params syncing is handled by a dedicated component

  // Keep URL in sync with store values without causing loops
  useEffect(() => {
    if (!didInitFromUrl) return;
    const currentSearch = typeof window !== 'undefined' ? window.location.search : '';
    const sp = new URLSearchParams(currentSearch);

    const allowedPerPage = [10, 20, 50];
    const desiredPerPage = allowedPerPage.includes(entriesPerPage) ? entriesPerPage : 10;
    const desiredPage = Math.max(1, Number.isFinite(currentPage) ? currentPage : 1);
    const desiredSort = ['id', 'name', 'openAt', 'closeAt'].includes(sortField) ? sortField : 'id';
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

      // If we have a selected id and the data for the current page includes it, populate selectedPackage
      if (selectedPackageId) {
        const matched = (data as PackageDto[]).find((p) => String(p.id || p.name) === selectedPackageId);
        if (matched) {
          const details: selectedPackagedProps = {
            title: matched.name,
            description: matched.description,
            delay: matched.delay,
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

  // Show toast for load errors
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
    // container
    <div className={cn('flex flex-col gap-4', className)}>
      <Suspense fallback={null}>
        <MainGridSearchParamsSync
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          setCurrentPage={setCurrentPage}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
          setSelectedPackageId={setSelectedPackageId}
          selectedPackageId={selectedPackageId}
          didInitFromUrl={didInitFromUrl}
          setDidInitFromUrl={setDidInitFromUrl}
        />
      </Suspense>
      <div className='flex w-full flex-1 items-stretch justify-between gap-4'>
        {/* packages &  searchbar */}
        <div className='flex w-full flex-col items-start justify-between gap-y-4'>
          {/* packages */}
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
                    // set selected package details
                    // convert API dto into PackageDetails expected types
                    const details: selectedPackagedProps = {
                      title: p.name,
                      description: p.description,
                      delay: p.delay,
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
                    // local state setter
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
                    startDate={p.openAt && p.openAt > 0 ? new Date(p.openAt) : undefined}
                    endDate={p.closeAt && p.closeAt > 0 ? new Date(p.closeAt) : undefined}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* sortby & package details */}
        <div className='hidden flex-1 flex-col items-start justify-between gap-y-4 lg:flex'>
          <PackageDetails
            title={selectedPackage.title}
            authTasks={selectedPackage.authTasks}
            assets={selectedPackage.assets}
            description={selectedPackage.description}
            cooldownTime={selectedPackage.delay}
          />
        </div>
      </div>
      {/* pagination */}
      <PackagePagination />
    </div>
  );
};
