import React, { ReactNode } from 'react';

import { cn } from '@/lib';

interface LeftSidebarIconProps {
  children: ReactNode;
  title: string;
  selected: boolean;
  onClick?: () => void;
}

const LeftSidebarIcon = ({ children, title, selected, onClick }: LeftSidebarIconProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center',
        selected ? 'text-green-500 dark:text-green-100' : 'text-black dark:text-gray-200',
      )}
    >
      {children}
      <span>{title}</span>
    </div>
  );
};

export default LeftSidebarIcon;
