'use client';

import { Pavanam } from 'next/font/google';
import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const pavanam = Pavanam({
  subsets: ['latin'],
  weight: ['400'],
});

const PackagePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFirstIndex, setCurrentFirstIndex] = useState(1);
  const [entriesPerPage] = useState(9);
  // TODO: determine these by fetching and calculating
  const totalPages = 21;
  const totalEntries = 233;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setCurrentFirstIndex((page - 1) * entriesPerPage + 1);
    }
  };

  const renderPages = () => {
    const pages = [];

    // Always show page 1
    pages.push(
      <PaginationItem key='1'>
        <PaginationLink
          onClick={() => goToPage(1)}
          className={cn(
            'size-[25px] rounded-full',
            currentPage === 1
              ? 'bg-gray-700 text-white dark:bg-gray-500 dark:text-black'
              : 'text-black hover:bg-gray-900 dark:text-white',
          )}
          href={''}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    // Start ellipsis
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key='start-ellipsis'>
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Middle pages (excluding 1 and totalPages)
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => goToPage(i)}
              className={cn(
                'size-[25px] rounded-full hover:bg-gray-900 hover:text-white',
                currentPage === i
                  ? 'bg-gray-700 text-white dark:bg-gray-400 dark:text-black'
                  : 'text-black dark:text-white',
              )}
              href={''}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    }

    // End ellipsis
    if (currentPage < totalPages - 2) {
      pages.push(
        <PaginationItem key='end-ellipsis'>
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Always show last page if it's not page 1
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => goToPage(totalPages)}
            className={cn(
              'size-[25px] rounded-full hover:bg-gray-900',
              currentPage === totalPages
                ? 'bg-gray-700 text-white dark:bg-gray-400 dark:text-black'
                : 'text-black dark:text-white',
            )}
            href={''}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    // container
    <div
      className={`${pavanam.className} text-gray-1100 dark:bg-gray-1000 flex h-[50px] w-[932px] items-center
        justify-between rounded-xl border border-gray-700 bg-gray-100 p-4 text-[14px] dark:border-gray-500
        dark:text-gray-400 [&>*]:transition-colors [&>*]:duration-500`}
    >
      {/* showing entries details */}
      <span className='hidden w-1/3 lg:block'>
        Showing {currentFirstIndex} to {currentFirstIndex + entriesPerPage - 1} of {totalEntries} Entries
      </span>

      {/* pages */}
      <Pagination className='w-1/3'>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <button
              aria-label='Previous page'
              onClick={() => goToPage(currentPage - 1)}
              className={cn(
                'flex items-center justify-center rounded-full px-2.5 sm:pl-2.5',
                currentPage === 1
                  ? 'pointer-events-none text-gray-700 dark:text-gray-500'
                  : 'text-black hover:text-gray-900 dark:text-white',
              )}
            >
              <ChevronLeftIcon />
            </button>
          </PaginationItem>

          {/* Dynamic Page Links */}
          {renderPages()}

          {/* Next Button */}
          <PaginationItem>
            <button
              aria-label='Next page'
              onClick={() => goToPage(currentPage + 1)}
              className={cn(
                'flex items-center justify-center rounded-full px-2.5 sm:pl-2.5',
                currentPage === totalPages
                  ? 'pointer-events-none text-gray-700 dark:text-gray-500'
                  : 'text-black hover:text-gray-900 dark:text-white',
              )}
            >
              <ChevronRightIcon />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* showing entries details */}
      <span className='hidden w-1/3 text-end lg:block'>Items per page {entriesPerPage}</span>
    </div>
  );
};

export default PackagePagination;
