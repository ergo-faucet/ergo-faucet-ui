'use client';

import { useState } from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const SearchbarInput = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <input
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='placeholder-gray-text-ergo-navbar ml-3 w-full text-xl font-medium tracking-widest text-gray-800
            focus:outline-none dark:text-white dark:placeholder-neutral-300'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-3 w-56' align='start'>
        <DropdownMenuItem>Assets</DropdownMenuItem>
        <DropdownMenuItem>Creator</DropdownMenuItem>
        <DropdownMenuItem>Auth Method</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchbarInput;
