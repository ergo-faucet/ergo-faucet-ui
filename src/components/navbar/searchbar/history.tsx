import React from 'react';
import { VscHistory } from 'react-icons/vsc';

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import { useSearchbar } from './useStore';

const History = () => {
  const { history, clearHistory, setSearchQuery } = useSearchbar();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='dark:hover:bg-dark-green-ergo-navbar cursor-pointer rounded-full p-1 transition-colors
            hover:bg-gray-100'
          aria-label='Search settings'
        >
          <VscHistory size={28} className='stroke-[0.5px] text-gray-900 dark:text-gray-200' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='dark:bg-gray-1000 mt-2 w-56 border border-gray-800 bg-gray-100 dark:border-gray-600'
        align='start'
      >
        <DropdownMenuGroup>
          <span className='ml-1'>Recent searches</span>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* when there is no history*/}
        {!history.length && (
          // make it a group, so it is not hoverable
          <DropdownMenuGroup>
            <span className='pl-4 text-[11px] text-gray-800 dark:text-gray-300'>No history available</span>
          </DropdownMenuGroup>
        )}

        {history.map((his, id) => {
          return (
            <DropdownMenuItem
              onClick={() => {
                setSearchQuery(his);
              }}
              key={id}
              className='cursor-pointer'
            >
              {his}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={clearHistory} className='cursor-pointer'>
          <span className='text-[11px] text-gray-800 dark:text-gray-300'>Cleaer recent searches</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default History;
