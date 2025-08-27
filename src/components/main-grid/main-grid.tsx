'use client';

import { useState } from 'react';
import React from 'react';

import { Asset } from '@/types';

import { PackageDetails } from '../package-details/package-details';
// import Package from "./package/package"
import { AuthTaskType } from '../package-details/types';
import Package from '../package/package';
import PackagePagination from '../pagination/package-pagination';
import Searchbar from './searchbar/searchbar';
import SortBy from './sort-by';

interface selectedPackagedProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
}

const assets: Asset[] = [
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
  { amount: 8142n, decimal: 12, name: 'Ergo token', tokenId: '0x1r1r1urh913r31r1' },
];

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
        </div>

        {/* sortby & package details */}
        <div className='flex flex-col items-start justify-between gap-y-4'>
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
