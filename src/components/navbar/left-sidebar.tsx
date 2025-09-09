'use client';

import { useState } from 'react';
import { HiUsers } from 'react-icons/hi2';
import { MdOutlineExplore } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';

import { cn } from '@/lib';

import LeftSidebarIcon from './left-sidebar-icon';

interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar = ({ className }: LeftSidebarProps) => {
  const [selected, setSelected] = useState<string | null>('Explore');

  return (
    // container
    <div
      className={cn(
        `dark:bg-gray-1100 flex min-h-screen w-24 flex-col items-center justify-start gap-y-6 bg-gray-50 pt-30
        dark:border dark:border-gray-700 [&>*]:transition-colors [&>*]:duration-300`,
        className,
      )}
    >
      {/* explore */}
      <LeftSidebarIcon title='Explore' selected={selected === 'Explore'} onClick={() => setSelected('Explore')}>
        <MdOutlineExplore size={50} />
      </LeftSidebarIcon>

      {/* history */}
      <LeftSidebarIcon title='History' selected={selected === 'History'} onClick={() => setSelected('History')}>
        <RiHistoryLine size={35} />
      </LeftSidebarIcon>

      {/* about us */}
      <LeftSidebarIcon title='About Us' selected={selected === 'About Us'} onClick={() => setSelected('About Us')}>
        <HiUsers className='scale-x-[-1]' size={40} />
      </LeftSidebarIcon>
    </div>
  );
};

export default LeftSidebar;
