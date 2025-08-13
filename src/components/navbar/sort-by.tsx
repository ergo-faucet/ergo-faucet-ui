'use client';

import React, { useState } from 'react';
import { LuArrowDownWideNarrow, LuArrowUpNarrowWide } from 'react-icons/lu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { viga } from '@/fonts';

const sortOptions = ['Name', 'Release Date'];

const SortBy = () => {
  const [isAscending, setIsAscending] = useState(true);
  const [selected, setSelected] = useState('Release Date');

  return (
    // Container
    <div
      className={`${viga.className} dark:from-gray-1100 flex h-[57px] w-[185px] items-center justify-between rounded-2xl
        border border-gray-400 bg-gradient-to-r from-gray-100 to-gray-300 bg-[length:200%_200%] bg-bottom-left
        dark:border-gray-700 dark:to-gray-800 [&_*]:transition-colors`}
    >
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger
          /* full height and width, so more area for the user to click on and trigger the menu*/
          className='h-full w-full outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none'
          asChild
        >
          {/* Texts */}
          <div className='flex flex-col items-start justify-center space-y-0.5 pt-1 pl-[18px]'>
            <span className='text-[12px] text-gray-700 dark:text-gray-500'>Sort by</span>
            <span className='text-[15px] tracking-wider text-black dark:text-white'>{selected}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='dark:bg-gray-1100 -mt-3 w-[183px] border border-gray-800 bg-gray-100 p-0'
          align='start'
        >
          <DropdownMenuLabel className='text-[13px] text-gray-800 dark:text-gray-500'>Sort by</DropdownMenuLabel>
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={() => setSelected(option)}
              className={`h-[39px] cursor-pointer rounded-none text-[15px] font-bold ${
                selected === option
                  ? 'dark:bg-gray-1000 bg-gray-200 text-black dark:text-white'
                  : 'hover:bg-gray-300 dark:hover:bg-gray-800'
              } `}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Icon button with vertical separator */}
      <button
        onClick={() => setIsAscending(!isAscending)}
        className='relative mr-2 h-full w-auto cursor-pointer bg-transparent pl-4 text-gray-600 before:absolute
          before:top-1/2 before:left-3 before:h-9 before:w-px before:-translate-y-1/2 before:bg-gray-600'
      >
        {isAscending ? <LuArrowUpNarrowWide size={30} /> : <LuArrowDownWideNarrow size={30} />}
      </button>
    </div>
  );
};

export default SortBy;
