'use client';

import { useState } from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { SearchbarFilterType } from './types';
import { useSearchbarFilters } from './useStore';

const SearchbarInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterComponents, setFilterComponents] = useState<SearchbarFilterType[]>([]);
  const {
    isAuthActivated,
    isAssetActivated,
    isCreatorActivated,
    setIsAuthActivated,
    setIsAssetActivated,
    setIsCreatorActivated,
  } = useSearchbarFilters();

  const handleFilters = (filterType: SearchbarFilterType) => {
    switch (filterType) {
      case 'asset':
        setFilterComponents((prev) => [...prev, 'asset']);
        break;
      case 'creator':
        setFilterComponents((prev) => [...prev, 'creator']);
        break;
      case 'authMethod':
        setFilterComponents((prev) => [...prev, 'authMethod']);
        break;
    }
  };

  return (
    <DropdownMenu>
      {/* filter components */}
      {filterComponents.map((filterComponent) => {
        switch (filterComponent) {
          case 'asset':
            return <span className='w-30'>asset</span>;
          case 'creator':
            return <span className='w-30'>creator</span>;
          case 'authMethod':
            return <span className='w-30'>auth method</span>;
        }
      })}

      <DropdownMenuTrigger className='flex items-center' asChild>
        <input
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='placeholder-gray-text-ergo-navbar w-fill ml-3 text-xl font-medium tracking-widest text-gray-800
            focus:outline-none dark:text-white dark:placeholder-neutral-300'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-3 w-56' align='start'>
        {!isAssetActivated && (
          <DropdownMenuItem
            onSelect={() => {
              handleFilters('asset');
              setIsAssetActivated(true);
            }}
          >
            Assets
          </DropdownMenuItem>
        )}
        {!isCreatorActivated && (
          <DropdownMenuItem
            onSelect={() => {
              handleFilters('creator');
              setIsCreatorActivated(true);
            }}
          >
            Creator
          </DropdownMenuItem>
        )}
        {!isAuthActivated && (
          <DropdownMenuItem
            onSelect={() => {
              handleFilters('authMethod');
              setIsAuthActivated(true);
            }}
          >
            Auth Method
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchbarInput;
