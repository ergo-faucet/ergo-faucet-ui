'use client';

import { useState } from 'react';
import React from 'react';

import { Asset } from '@/types';

import Searchbar from './navbar/searchbar/searchbar';
import SortBy from './navbar/sort-by';
import { PackageDetails } from './package-details/package-details';
import { AuthTaskType } from './package-details/types';
import PackagePagination from './pagination/package-pagination';

interface selectedPackagedProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
}

export const MainGrid = () => {
  const [selectedPackage] = useState<selectedPackagedProps>({ title: '', assets: [], authTasks: [], description: '' });
  // TODO: fetch packages here and map them to render
  return (
    // container
    <div className='flex flex-col gap-4 p-8'>
      <div className='flex w-full items-start justify-between gap-4'>
        {/* packages &  searchbar */}
        <div className='flex w-full flex-col items-start justify-between gap-y-4'>
          <Searchbar />
          {/* packages */}
          <div className='justfiy-around grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {/* map packages here */}
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
      {/* pagination */}
      <PackagePagination />
    </div>
  );
};
