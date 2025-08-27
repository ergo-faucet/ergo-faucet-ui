'use client';

import { Pavanam } from 'next/font/google';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

import { ItemsPerPageSelector } from './items-per-page-selector';
import { RenderPages } from './render-pages';
import { useCurrentLastIndex, useHasNextPage, useHasPreviousPage, usePaginationStore } from './useStore';

const pavanam = Pavanam({
  subsets: ['latin'],
  weight: ['400'],
});

const PackagePagination = () => {
  // TODO: set totalEntries by fetching and calculating
  const { currentFirstIndex, totalEntries, increaseCurrentPage, decreaseCurrentPage } = usePaginationStore();
  const hasPreviousPage = useHasPreviousPage();
  const hasNextPage = useHasNextPage();
  const currentLastIndex = useCurrentLastIndex();

  return (
    // container
    <div
      className={`${pavanam.className} text-gray-1100 dark:bg-gray-1000 flex h-[50px] w-full items-center
        justify-between rounded-xl border border-gray-700 bg-gray-100 p-4 text-[14px] dark:border-gray-500
        dark:text-gray-400 [&>*]:transition-colors [&>*]:duration-500`}
    >
      {/* showing entries details */}
      <span className='hidden w-1/3 lg:block'>
        Showing {currentFirstIndex} to {currentLastIndex} of {totalEntries} Entries
      </span>

      {/* pages */}
      <Pagination className='w-1/3'>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <button
              aria-label='Previous page'
              onClick={() => decreaseCurrentPage()}
              className={cn(
                'flex cursor-pointer items-center justify-center rounded-full px-2.5 sm:pl-2.5',
                hasPreviousPage
                  ? 'text-black hover:text-gray-900 dark:text-white'
                  : 'pointer-events-none text-gray-700 dark:text-gray-500',
              )}
            >
              <ChevronLeftIcon />
            </button>
          </PaginationItem>

          {/* Dynamic Page Links */}
          {RenderPages()}

          {/* Next Button */}
          <PaginationItem>
            <button
              aria-label='Next page'
              onClick={() => increaseCurrentPage()}
              className={cn(
                'flex cursor-pointer items-center justify-center rounded-full px-2.5 sm:pl-2.5',
                hasNextPage
                  ? 'text-black hover:text-gray-900 dark:text-white'
                  : 'pointer-events-none text-gray-700 dark:text-gray-500',
              )}
            >
              <ChevronRightIcon />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* showing entries details */}
      <div className='mr-2 hidden w-1/3 items-center justify-end text-end lg:flex'>
        <span>Items per page </span>
        <ItemsPerPageSelector />
      </div>
    </div>
  );
};

export default PackagePagination;
