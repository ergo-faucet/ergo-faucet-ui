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

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
}

export function ItemsPerPageSelector({ itemsPerPage }: ItemsPerPageSelectorProps) {
  return (
    <Select>
      {/* override the shadcn classname */}
      <SelectTrigger
        className='ml-px w-[60px] border-transparent bg-transparent shadow-transparent focus-visible:border-transparent
          focus-visible:ring-transparent dark:border-transparent dark:bg-transparent dark:shadow-transparent
          dark:hover:bg-transparent'
      >
        <SelectValue placeholder={itemsPerPage} />
        <SelectContent
          className='dark:bg-gray-1000 border border-gray-700 bg-gray-100 text-[14px] text-black ring-transparent
            dark:border-gray-500 dark:text-white'
        >
          <SelectGroup>
            <SelectLabel>Items per page</SelectLabel>
            <SelectItem value='412424'>4</SelectItem>
            <SelectItem value='9'>9</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
}
