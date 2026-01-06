'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState, Suspense } from 'react';

import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';

import { usePaginationStore } from '@/components/pagination/useStore';
import { swrFetcher } from '@/lib/api';
import { swrAuthFetcher } from '@/lib/api/auth-fetch';
import { Asset, AuthType, PackageType, GetPackagesResponse } from '@/types';

import Searchbar from '../navbar/searchbar/searchbar';
import SortBy from '../navbar/sort-by';
import { PackageDetails } from '../package-details/package-details';
import { AuthTaskType } from '../package-details/types';
import Package from '../package/package';
import PackagePagination from '../pagination/package-pagination';
import MainGridSearchParamsSync from './search-params-sync';

interface SelectedPackageProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
  delay?: string;
  openAt?: number;
  closeAt?: number;
  lastRequestTime?: number;
  lastRequestStatus?: string;
}

interface PackageAsset {
  tokenId: string;
  assetName: string;
  amount?: number | string | bigint;
  decimals?: number;
}

interface PackageAuthMethod {
  name: string;
  status?: string;
}

export const MainGrid: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackageProps>({
    title: '',
    assets: [],
    authTasks: [],
    description: '',
    delay: undefined,
  });
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [didInitFromUrl, setDidInitFromUrl] = useState<boolean>(false);

  const [sortField, setSortField] = useState<'name' | 'releaseDate'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data: session } = useSession();
  const hasAccessToken = Boolean(session?.accessToken);

  const entriesPerPage = usePaginationStore((s) => s.entriesPerPage);
  const currentPage = usePaginationStore((s) => s.currentPage);
  const setTotalEntries = usePaginationStore((s) => s.setTotalEntries);
  const setTotalPages = usePaginationStore((s) => s.setTotalPages);
  const setEntriesPerPage = usePaginationStore((s) => s.setEntriesPerPage);
  const setCurrentPage = usePaginationStore((s) => s.setCurrentPage);

  const offset = (currentPage - 1) * entriesPerPage;
  const limit = entriesPerPage;

  const key = `/controller/packages?offset=${offset}&limit=${limit}&sort=${sortField}&order=${sortOrder}`;
  const fetcher = hasAccessToken ? swrAuthFetcher : swrFetcher;
  const { data, error, isLoading } = useSWR<GetPackagesResponse>(didInitFromUrl ? key : null, fetcher);

  // refetch packages immediately after login
  useEffect(() => {
    if (hasAccessToken) {
      mutate((k) => typeof k === 'string' && k.startsWith('/controller/packages'));
    }
  }, [hasAccessToken]);

  // Update pagination and selected package data
  useEffect(() => {
    if (!didInitFromUrl) return;
    if (data) {
      setTotalEntries(data.total);
      setTotalPages(Math.max(1, Math.ceil(data.total / entriesPerPage)));

      if (selectedPackageId) {
        const matched: PackageType | undefined = data.packages.find(
          (p) => String(p.id || p.name) === selectedPackageId,
        );
        if (matched) {
          const mappedAuthTasks: AuthTaskType[] = (matched.authMethods || []).map(
            (m: PackageAuthMethod): AuthTaskType => ({
              authType: m.name as AuthType,
              isCompleted: (m.status ?? '') === 'passed',
            }),
          );

          const mappedAssets: Asset[] = (matched.assets || []).map(
            (a: PackageAsset): Asset => ({
              name: a.assetName,
              amount: BigInt((a.amount ?? '0').toString()),
              decimals: a.decimals ?? 0,
              tokenId: a.tokenId,
            }),
          );

          const details: SelectedPackageProps = {
            title: matched.name,
            description: matched.description,
            delay: matched.delay,
            authTasks: mappedAuthTasks,
            assets: mappedAssets,
            openAt: matched.openAt,
            closeAt: matched.closeAt,
            lastRequestTime: matched.lastRequestTime,
            lastRequestStatus: matched.lastRequestStatus,
          };
          setSelectedPackage(details);
        }
      }
    }
  }, [data, didInitFromUrl, entriesPerPage, offset, limit, selectedPackageId, setTotalEntries, setTotalPages]);

  // ensure package details are updated after revalidation (login)
  useEffect(() => {
    if (!didInitFromUrl) return;
    if (!selectedPackageId) return;
    if (!data) return;

    const matched = data.packages.find((p) => String(p.id || p.name) === selectedPackageId);
    if (!matched) return;

    const mappedAuthTasks: AuthTaskType[] = (matched.authMethods || []).map(
      (m: PackageAuthMethod): AuthTaskType => ({
        authType: m.name as AuthType,
        isCompleted: (m.status ?? '') === 'passed',
      }),
    );

    const mappedAssets: Asset[] = (matched.assets || []).map(
      (a: PackageAsset): Asset => ({
        name: a.assetName,
        amount: BigInt((a.amount ?? '0').toString()),
        decimals: a.decimals ?? 0,
        tokenId: a.tokenId,
      }),
    );

    const details: SelectedPackageProps = {
      title: matched.name,
      description: matched.description,
      delay: matched.delay,
      authTasks: mappedAuthTasks,
      assets: mappedAssets,
      openAt: matched.openAt,
      closeAt: matched.closeAt,
    };
    setSelectedPackage(details);
  }, [data, selectedPackageId, didInitFromUrl]);

  // handle error toast
  useEffect(() => {
    if (error) {
      let message: string = 'Failed to load packages';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const possibleMessage = (error as { message?: unknown }).message;
        if (typeof possibleMessage === 'string') message = possibleMessage;
      }
      toast.error(message);
    }
  }, [error]);

  return (
    <div className='flex flex-col gap-4 p-8'>
      <Suspense fallback={null}>
        <MainGridSearchParamsSync
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setSelectedPackageId={setSelectedPackageId}
          selectedPackageId={selectedPackageId}
          didInitFromUrl={didInitFromUrl}
          setDidInitFromUrl={setDidInitFromUrl}
        />
      </Suspense>

      <div className='flex w-full items-start justify-between gap-4'>
        {/* packages & searchbar */}
        <div className='flex w-full flex-col items-start justify-between gap-y-4'>
          <Searchbar />

          {isLoading ? (
            <div className='flex min-h-[400px] w-full items-center justify-center text-gray-400'>
              Loading packages...
            </div>
          ) : data && data.packages.length === 0 && !error ? (
            <div className='flex min-h-[400px] w-full items-center justify-center text-gray-500'>No packages found</div>
          ) : (
            <div className='justfiy-around grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
              {data &&
                data.packages.map((pkg: PackageType) => {
                  const mappedAssets: Asset[] = (pkg.assets || []).map(
                    (a: PackageAsset): Asset => ({
                      name: a.assetName,
                      amount: BigInt((a.amount ?? '0').toString()),
                      decimals: a.decimals ?? 0,
                      tokenId: a.tokenId,
                    }),
                  );

                  const mappedAuthTasks: AuthTaskType[] = (pkg.authMethods || []).map(
                    (method: PackageAuthMethod): AuthTaskType => ({
                      authType: method.name as AuthType,
                      isCompleted: (method.status ?? '') === 'passed',
                    }),
                  );

                  return (
                    <Package
                      key={pkg.id || pkg.name}
                      title={pkg.name}
                      assets={mappedAssets}
                      authTypes={(pkg.authMethods || []).map((m: PackageAuthMethod): AuthType => m.name as AuthType)}
                      startDate={pkg.openAt ? new Date(pkg.openAt) : undefined}
                      endDate={pkg.closeAt ? new Date(pkg.closeAt) : undefined}
                      onClick={() => {
                        setSelectedPackageId(String(pkg.id || pkg.name));
                        setSelectedPackage({
                          title: pkg.name,
                          description: pkg.description,
                          delay: pkg.delay,
                          assets: mappedAssets,
                          authTasks: mappedAuthTasks,
                          openAt: pkg.openAt,
                          closeAt: pkg.closeAt,
                          lastRequestTime: pkg.lastRequestTime,
                          lastRequestStatus: pkg.lastRequestStatus,
                        });
                      }}
                    />
                  );
                })}
            </div>
          )}
        </div>

        {/* sortby & package details */}
        <div className='hidden flex-col items-start justify-between gap-y-4 lg:flex'>
          <SortBy />
          <PackageDetails
            packageId={Number(selectedPackageId)}
            title={selectedPackage.title}
            authTasks={selectedPackage.authTasks}
            assets={selectedPackage.assets}
            description={selectedPackage.description}
            delay={selectedPackage.delay}
            lastRequestTime={selectedPackage.lastRequestTime}
            lastRequestStatus={selectedPackage.lastRequestStatus}
            openAt={selectedPackage.openAt}
            closeAt={selectedPackage.closeAt}
          />
        </div>
      </div>

      <PackagePagination />
    </div>
  );
};
