'use client';

import { useState } from 'react';
import React from 'react';

import { Asset } from '@/types';

import { PackageDetails } from './package-details/package-details';
// import Package from "./package/package"
import { AuthTaskType } from './package-details/types';
import Package from './package/package';
import PackagePagination from './pagination/package-pagination';

interface selectedPackagedProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
}

const assets: Asset[] = [
  { amount: 242n, decimal: 3, name: 'Ergo token', tokenId: '0x31j1hru1hr1hir1bhi3r' },
  { amount: 242n, decimal: 3, name: 'Ergo token', tokenId: '0x31j1hru1hr1hir1bhi3r' },
  { amount: 242n, decimal: 3, name: 'Ergo token2', tokenId: '0x31j1hru1hr1hir1bhi3r' },
  { amount: 242n, decimal: 3, name: 'Ergo token', tokenId: '0x31j1hru1hr1hir1bhi3r' },
  { amount: 242n, decimal: 3, name: 'Ergo token', tokenId: '0x31j1hru1hr1hir1bhi3r' },
  { amount: 242n, decimal: 3, name: 'Ergo token2', tokenId: '0x31j1hru1hr1hir1bhi3r' },
  { amount: 242n, decimal: 3, name: 'Ergo token', tokenId: '0x31j1hru1hr1hir1bhi3r' },
  { amount: 242n, decimal: 3, name: 'Ergo token', tokenId: '0x31j1hru1hr1hir1bhi3r' },
  { amount: 242n, decimal: 3, name: 'Ergo token2', tokenId: '0x31j1hru1hr1hir1bhi3r' },
];

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
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
          <Package
            title={'Nice Name'}
            assets={assets}
            authTypes={['discord', 'google']}
            startDate={new Date()}
            endDate={new Date()}
          />
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
