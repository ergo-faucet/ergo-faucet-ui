import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { usePaginationStore } from './useStore';

export function ItemsPerPageSelector() {
  const entriesPerPage = usePaginationStore((state) => state.entriesPerPage);
  const setEntriesPerPage = usePaginationStore((state) => state.setEntriesPerPage);

  return (
    <Select value={entriesPerPage.toString()} onValueChange={(value) => setEntriesPerPage(parseInt(value))}>
      <SelectTrigger
        className='ml-px w-[60px] border-transparent bg-transparent shadow-transparent focus-visible:border-transparent
          focus-visible:ring-transparent dark:border-transparent dark:bg-transparent dark:shadow-transparent
          dark:hover:bg-transparent'
      >
        <SelectValue placeholder={entriesPerPage.toString()} />
      </SelectTrigger>
      <SelectContent
        className='dark:bg-gray-1000 border border-gray-700 bg-gray-100 text-[14px] text-black ring-transparent
          dark:border-gray-500 dark:text-white'
      >
        <SelectGroup>
          <SelectLabel>Items per page</SelectLabel>
          <SelectItem value='4'>4</SelectItem>
          <SelectItem value='9'>9</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
