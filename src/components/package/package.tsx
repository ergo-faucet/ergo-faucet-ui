import { Volkhov } from 'next/font/google';

import { Asset, AuthType } from '@/types';

import Avatars from './avatars';
import Deadline from './deadline';

const volkhov = Volkhov({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface PackageProps {
  title: string;
  assets: Asset[];
  authTypes: AuthType[];
  startDate: Date;
  endDate: Date;
}

const Package = ({ title, assets, authTypes, startDate, endDate }: PackageProps) => {
  return (
    // container
    <div
      className={`${volkhov.className} dark:bg-gray-1000 flex h-[195px] w-[300px] flex-col rounded-[18px] border
        border-gray-500 bg-gray-100 shadow-[-1px_3px_10px_rgba(0,0,0,0.5)] dark:border-gray-700`}
    >
      {/* title */}
      <div className='mt-4 ml-6 max-w-[250px] text-[20px] tracking-wider text-gray-900 dark:text-gray-200'>{title}</div>

      {/* assets */}
      <div className='mt-2 ml-4 flex h-8 w-67 items-center justify-between'>
        <span className='text-[14px] font-bold text-gray-700 dark:text-gray-600'>Assets in package</span>
        <Avatars assets={assets} />
      </div>

      {/* auth methods */}
      <span className='mt-2 ml-4 text-gray-800 dark:text-[#A4A4A4]'>{authTypes.length} Auth methods/task required</span>

      {/* deadline */}
      <Deadline startDate={startDate} endDate={endDate} className='mt-4 ml-4' />
    </div>
  );
};

export default Package;
