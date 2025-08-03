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
  const { history, clearHistory } = useSearchbar();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='dark:hover:bg-dark-green-ergo-navbar rounded-full p-1 transition-colors hover:bg-gray-100'
          aria-label='Search settings'
        >
          <VscHistory size={28} className='stroke-[0.5px] text-gray-900 dark:text-gray-200' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='dark:bg-gray-1000 mt-2 w-56 border border-gray-800 bg-gray-100 dark:border-gray-600'
        align='start'
      >
        <DropdownMenuGroup>Recent searches</DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* when there is not history just show a gap to be more appealing*/}
        {!history.length && (
          <DropdownMenuItem>
            <div className='h-5'></div>
          </DropdownMenuItem>
        )}

        {history.map((his, id) => {
          return <DropdownMenuItem key={id}>{his}</DropdownMenuItem>;
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={clearHistory}>Cleaer recent searches</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default History;
