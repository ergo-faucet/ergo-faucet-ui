'use client';

import React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Step1, Step2, Step3 } from './steps';
import { useSearchbar } from './useStore';

const SearchbarInput = () => {
  const { filterComponents, searchQuery, setSearchQuery } = useSearchbar();

  return (
    <DropdownMenu>
      {/* filter components */}
      {filterComponents.map((FilterComponent, id) => {
        return <React.Fragment key={id}>{FilterComponent}</React.Fragment>;
      })}

      <DropdownMenuTrigger className='flex items-center' asChild>
        <input
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-fill ml-3 text-[18px] font-medium tracking-wide text-gray-700 placeholder-gray-700
            focus:outline-none dark:text-gray-500 dark:placeholder-gray-500'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-3 w-56' align='start'>
        {/* steps */}
        <Step1 />
        <Step2 />
        <Step3 />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchbarInput;
