'use client';

import { useEffect, useMemo, useState } from 'react';
import React from 'react';

import useSWR from 'swr';

import { useSortStore } from '@/components/navbar/sort-store';
import Package from '@/components/package/package';
import { usePaginationStore } from '@/components/pagination/useStore';
import { cn } from '@/lib';
import { swrFetcher } from '@/lib/api/api-fetch';
import { swrAuthFetcher } from '@/lib/api/auth-fetch';
import { useAuthStore } from '@/lib/api/auth-store';
import { Asset, AuthType, PackageDto } from '@/types';

import { PackageDetails } from '../package-details/package-details';
import { AuthTaskType } from '../package-details/types';
import PackagePagination from '../pagination/package-pagination';

interface selectedPackagedProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
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
  });

  const accessToken = useAuthStore((s) => s.accessToken);
  const fetcher = useMemo(() => (accessToken ? swrAuthFetcher : (url: string) => swrFetcher(url)), [accessToken]);

  const entriesPerPage = usePaginationStore((s) => s.entriesPerPage);
  const currentPage = usePaginationStore((s) => s.currentPage);
  const setTotalEntries = usePaginationStore((s) => s.setTotalEntries);
  const setTotalPages = usePaginationStore((s) => s.setTotalPages);

  const sortField = useSortStore((s) => s.field);
  const sortOrder = useSortStore((s) => s.order);

  // Map UI sort fields to backend fields
  const backendSort = sortField === 'name' ? 'name' : 'openAt';

  const offset = (currentPage - 1) * entriesPerPage;
  const limit = entriesPerPage;

  const key = useMemo(
    () => `/controller/packages?offset=${offset}&limit=${limit}&sort=${backendSort}&order=${sortOrder}`,
    [offset, limit, backendSort, sortOrder],
  );

  const { data, error, isLoading } = useSWR<PackageDto[]>(key, fetcher);

  useEffect(() => {
    if (Array.isArray(data)) {
      const approximateTotal = offset + data.length + (data.length === limit ? limit : 0);
      setTotalEntries(approximateTotal);
      setTotalPages(Math.max(1, Math.ceil(approximateTotal / entriesPerPage)));
    }
  }, [data, entriesPerPage, offset, limit, setTotalEntries, setTotalPages]);

  return (
    // container
    <div className={cn('flex flex-col gap-4', className)}>
      <div className='flex w-full items-start justify-between gap-4'>
        {/* packages &  searchbar */}
        <div className='flex w-full flex-col items-start justify-between gap-y-4'>
          {/* packages */}
          <div className='justfiy-around grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {isLoading && <div className='text-gray-600 dark:text-gray-400'>Loading packages...</div>}
            {error && <div className='text-red-600 dark:text-red-400'>Failed to load packages</div>}
            {Array.isArray(data) &&
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
                    endDate={p.closeAt ? new Date(p.closeAt) : new Date()}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* sortby & package details */}
        <div className='hidden flex-col items-start justify-between gap-y-4 lg:flex'>
          <PackageDetails
            title={selectedPackage.title}
            authTasks={selectedPackage.authTasks}
            assets={selectedPackage.assets}
            description={selectedPackage.description}
          />
        </div>
      </div>
      {/* pagination */}
      <PackagePagination />
    </div>
  );
};
