'use client';

import React, { useState } from 'react';

import useSWR from 'swr';

import { swrFetcher } from '@/lib/api';
import { Asset } from '@/types';
import { GetPackagesResponse } from '@/types';

import Searchbar from '../navbar/searchbar/searchbar';
import SortBy from '../navbar/sort-by';
import { PackageDetails } from '../package-details/package-details';
import { AuthTaskType } from '../package-details/types';
import Package from '../package/package';
import PackagePagination from '../pagination/package-pagination';

interface SelectedPackageProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
}

export const MainGrid = () => {
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackageProps>({
    title: '',
    assets: [],
    authTasks: [],
    description: '',
  });

  const {
    data: packages,
    error,
    isLoading,
  } = useSWR<GetPackagesResponse[]>('/controller/packages?offset=0&limit=25&sort=id&order=desc', swrFetcher);

  const handlePackageClick = (pkg: GetPackagesResponse) => {
    const mappedAuthTasks: AuthTaskType[] = pkg.authMethods.map((method) => ({
      authType: method.name.toLowerCase() as AuthTaskType['authType'],
      isCompleted: method.status === 'passed', // ✅ handle optional status safely
    }));

    setSelectedPackage({
      title: pkg.name,
      description: pkg.description,
      assets: pkg.assets,
      authTasks: mappedAuthTasks,
    });
  };

  if (error)
    return <div className='flex h-screen items-center justify-center text-red-400'>Failed to load packages</div>;

  if (isLoading || !packages)
    return <div className='flex h-screen items-center justify-center text-gray-400'>Loading packages...</div>;

  return (
    <div className='flex flex-col gap-4 p-8'>
      <div className='flex w-full items-start justify-between gap-4'>
        {/* packages & searchbar */}
        <div className='flex w-full flex-col items-start justify-between gap-y-4'>
          <Searchbar />
          <div className='justfiy-around grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {packages.map((pkg) => (
              <Package
                key={pkg.id}
                title={pkg.name}
                assets={pkg.assets}
                authTypes={pkg.authMethods.map((a) => a.name.toLowerCase() as AuthTaskType['authType'])}
                startDate={new Date(pkg.openAt * 1000)}
                endDate={new Date(pkg.closeAt * 1000)}
                onClick={() => handlePackageClick(pkg)}
              />
            ))}
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
          />
        </div>
      </div>

      <PackagePagination />
    </div>
  );
};
