import { cn } from '@/lib/utils';

import { PaginationItem, PaginationLink, PaginationEllipsis } from '../ui/pagination';
import { useHasNextPage, useHasPreviousPage, usePaginationStore } from './useStore';

export const RenderPages = () => {
  const { currentPage, totalPages, setCurrentPage } = usePaginationStore();
  const hasPreviousPage = useHasPreviousPage();
  const hasNextPage = useHasNextPage();

  const pages = [];

  // Always show page 1
  pages.push(
    <PaginationItem key='1'>
      <PaginationLink
        onClick={() => setCurrentPage(1)}
        className={cn(
          'size-[25px] rounded-full hover:text-white',
          // check if it is selected
          hasPreviousPage
            ? 'text-black hover:bg-gray-900 dark:text-white'
            : 'bg-gray-700 text-white dark:bg-gray-500 dark:text-black',
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
            onClick={() => setCurrentPage(i)}
            className={cn(
              'size-[25px] rounded-full hover:bg-gray-900 hover:text-white',
              // check if it is selected
              currentPage === i
                ? 'bg-gray-700 text-white dark:bg-gray-400 dark:text-black hover:dark:text-white'
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
          onClick={() => setCurrentPage(totalPages)}
          className={cn(
            'size-[25px] rounded-full hover:bg-gray-900 hover:text-white',
            // check if it is selected
            hasNextPage ? 'text-black dark:text-white' : 'bg-gray-700 text-white dark:bg-gray-400 dark:text-black',
          )}
          href={''}
          size={undefined}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return pages;
};
