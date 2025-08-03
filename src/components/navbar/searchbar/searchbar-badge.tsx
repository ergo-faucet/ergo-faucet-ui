import React from 'react';

import clsx from 'clsx';

import { Badge } from '@/components/ui/badge';

interface SearchbarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: React.ReactNode;
}

const SearchbarBadge = ({ className, children, ...props }: SearchbarBadgeProps) => {
  return (
    <Badge className={clsx('m-1 h-[30px] cursor-pointer dark:bg-gray-800 dark:text-white', className)} {...props}>
      {children}
    </Badge>
  );
};

export default SearchbarBadge;
