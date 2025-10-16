'use client';

import React, { useEffect, useMemo, useState, Suspense } from 'react';

import { toast } from 'sonner';
import useSWR from 'swr';

import { usePaginationStore } from '@/components/pagination/useStore';
import { swrFetcher } from '@/lib/api';
import { swrAuthFetcher } from '@/lib/api/auth-fetch';
import { useAuthStore } from '@/lib/api/auth-store';
import { Asset, AuthType, GetPackagesResponse } from '@/types';

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
}

type SortField = 'id';
type SortOrder = 'asc';

interface PackageAsset {
  tokenId: string;
  amount?: number | string | bigint;
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

  const accessToken = useAuthStore((s) => s.accessToken);
  const fetcher = useMemo<<T>(url: string) => Promise<T>>(
    () => (accessToken ? swrAuthFetcher : swrFetcher),
    [accessToken],
  );

  const entriesPerPage = usePaginationStore((s) => s.entriesPerPage);
  const currentPage = usePaginationStore((s) => s.currentPage);
  const setTotalEntries = usePaginationStore((s) => s.setTotalEntries);
  const setTotalPages = usePaginationStore((s) => s.setTotalPages);
  const setEntriesPerPage = usePaginationStore((s) => s.setEntriesPerPage);
  const setCurrentPage = usePaginationStore((s) => s.setCurrentPage);

  const offset = (currentPage - 1) * entriesPerPage;
  const limit = entriesPerPage;

  // TODO: use a store later
  const sortField: SortField = 'id';
  const sortOrder: SortOrder = 'asc';

  const key = useMemo<string>(
    () => `/controller/packages?offset=${offset}&limit=${limit}&sort=${sortField}&order=${sortOrder}`,
    [offset, limit, sortField, sortOrder],
  );

  const {
    data,
    error,
    isLoading,
  }: {
    data?: GetPackagesResponse[];
    error?: unknown;
    isLoading: boolean;
  } = useSWR<GetPackagesResponse[]>(key, fetcher);

  // Update pagination and selected package data
  useEffect(() => {
    if (Array.isArray(data)) {
      const approximateTotal: number = offset + data.length + (data.length === limit ? limit : 0);
      setTotalEntries(approximateTotal);
      setTotalPages(Math.max(1, Math.ceil(approximateTotal / entriesPerPage)));

      if (selectedPackageId) {
        const matched: GetPackagesResponse | undefined = data.find(
          (p: GetPackagesResponse) => String(p.id || p.name) === selectedPackageId,
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
              name: a.tokenId,
              amount: BigInt((a.amount ?? '0').toString()),
              decimal: 0,
              tokenId: a.tokenId,
            }),
          );

          const details: SelectedPackageProps = {
            title: matched.name,
            description: matched.description,
            delay: matched.delay,
            authTasks: mappedAuthTasks,
            assets: mappedAssets,
          };
          setSelectedPackage(details);
        }
      }
    }
  }, [data, entriesPerPage, offset, limit, selectedPackageId, setTotalEntries, setTotalPages]);

  // Handle error toast
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
          setSortField={() => {}}
          setSortOrder={() => {}}
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
          <div className='justfiy-around grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {isLoading ? (
              <div className='flex h-screen items-center justify-center text-gray-400'>Loading packages...</div>
            ) : Array.isArray(data) && data.length === 0 && !error ? (
              <div className='flex h-screen items-center justify-center text-gray-500'>No packages found</div>
            ) : (
              Array.isArray(data) &&
              data.map((pkg: GetPackagesResponse) => {
                const mappedAssets: Asset[] = (pkg.assets || []).map(
                  (a: PackageAsset): Asset => ({
                    name: a.tokenId,
                    amount: BigInt((a.amount ?? '0').toString()),
                    decimal: 0,
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
                      });
                    }}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* sortby & package details */}
        <div className='hidden flex-col items-start justify-between gap-y-4 lg:flex'>
          <SortBy />
          <PackageDetails
            title={selectedPackage.title}
            authTasks={selectedPackage.authTasks}
            assets={selectedPackage.assets}
            description={selectedPackage.description}
            cooldownTime={selectedPackage.delay}
          />
        </div>
      </div>

      <PackagePagination />
    </div>
  );
};
