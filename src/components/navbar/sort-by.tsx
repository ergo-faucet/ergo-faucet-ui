import React from 'react';
import { LuArrowUpNarrowWide } from 'react-icons/lu';

import { viga } from '@/fonts';

const SortBy = () => {
  return (
    // cotainer
    <div
      className={`${viga.className} dark:from-gray-1100 flex h-[57px] w-[185px] items-center justify-between rounded-2xl
        border border-gray-400 bg-gradient-to-r from-gray-100 to-gray-300 dark:border-gray-700 dark:to-gray-800
        [&_*]:transition-colors [&_*]:duration-700`}
    >
      {/* texts */}
      <div className='flex flex-col items-start justify-center space-y-0.5 pt-1 pl-[18px]'>
        <span className='text-[12px] text-gray-700 dark:text-gray-500'>Sort by</span>
        <span className='text-[15px] tracking-wider text-black dark:text-white'>Release Date</span>
      </div>

      {/* button and vertical line */}
      <button
        className='relative mr-2 h-full w-auto bg-transparent pl-4 text-gray-600 before:absolute before:top-1/2
          before:left-3 before:h-9 before:w-px before:-translate-y-1/2 before:bg-gray-600'
      >
        <LuArrowUpNarrowWide size={30} />
      </button>
    </div>
  );
};

export default SortBy;
