'use client';

import React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Step1, Step2, Step3 } from './steps';
import { useSearchbar } from './useStore';

const SearchbarInput = () => {
  const { filterComponents, searchQuery, setSearchQuery, addHistory } = useSearchbar();

  return (
    <DropdownMenu>
      <div className='flex items-center'>
        {/* filter components */}
        {filterComponents.map((FilterComponent, id) => {
          return <React.Fragment key={id}>{FilterComponent.element}</React.Fragment>;
        })}

        <DropdownMenuTrigger className='flex items-center' asChild>
          <input
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // stop form submit
                e.stopPropagation(); // stop Radix from toggling menu
                addHistory(searchQuery);
                setSearchQuery('');
              }
            }}
            className='mx-3 w-full text-[18px] font-medium tracking-wide text-gray-700 placeholder-gray-700
              focus:outline-none dark:text-gray-500 dark:placeholder-gray-500'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='dark:bg-gray-1000 mt-3 w-56 rounded-[8px] border border-gray-800 bg-gray-100 dark:border-gray-600
            [&_*]:text-black [&_*]:dark:text-white [&>*]:hover:bg-gray-300 [&>*]:hover:dark:bg-gray-800'
          align='start'
        >
          {/* steps */}
          <Step1 />
          <Step2 />
          <Step3 />
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default SearchbarInput;
