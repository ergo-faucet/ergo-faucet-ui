'use client';

import { useState } from 'react';
import React from 'react';

import { Asset } from '@/types';

import { PackageDetails } from './package-details/package-details';
// import Package from "./package/package"
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
    <div className='flex w-full items-start justify-between gap-4 p-4'>
      {/* packages & pagination */}
      <div className='flex w-full flex-col items-start justify-between gap-y-4'>
        {/* packages */}
        <div className='justfiy-around grid w-full grid-cols-1 gap-4 xl:grid-cols-3 2xl:grid-cols-4'>
          {/* map packages here */}
        </div>
        {/* pagination */}
        <PackagePagination />
      </div>

      {/* package details */}
      <PackageDetails
        title={selectedPackage.title}
        authTasks={selectedPackage.authTasks}
        assets={selectedPackage.assets}
        description={selectedPackage.description}
      />
    </div>
  );
};
