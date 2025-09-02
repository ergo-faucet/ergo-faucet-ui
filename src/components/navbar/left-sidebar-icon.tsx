import React, { ReactNode } from 'react';

import { cn } from '@/lib';

interface LeftSidebarIcon {
  children: ReactNode;
  title: string;
  selected: boolean;
}

const LeftSidebarIcon = ({ children, title, selected }: LeftSidebarIcon) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-green-500 dark:text-green-100',
        selected ? 'text-green-500 dark:text-green-100' : 'text-black dark:text-gray-200',
      )}
    >
      {children}
      <span>{title}</span>
    </div>
  );
};

export default LeftSidebarIcon;
