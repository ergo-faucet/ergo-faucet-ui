import { robotoCondensed, volkhov } from '@/fonts';
import { Asset, AuthType } from '@/types';

import Avatars from './avatars';
import Deadline from './deadline';

interface PackageProps {
  title: string;
  assets: Asset[];
  authTypes: AuthType[];
  startDate?: Date;
  endDate?: Date;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Package = ({ title, assets, authTypes, startDate, endDate, onClick }: PackageProps) => {
  return (
    // container
    <div
      onClick={onClick}
      className={`${robotoCondensed.className} dark:bg-gray-1000 flex h-[195px] max-w-full min-w-[250px] flex-col
        overflow-hidden rounded-[18px] border border-gray-500 bg-gray-100 shadow-[-1px_3px_10px_rgba(0,0,0,0.5)]
        transition-transform dark:border-gray-700`}
    >
      {/* title */}
      <div
        className={`${volkhov.className} mt-6 min-h-[51px] truncate px-6 text-[20px] tracking-wider text-gray-900
          dark:text-gray-200`}
        title={title}
      >
        {title}
      </div>

      {/* assets */}
      <div className='mt-1 flex h-8 w-full items-center justify-between overflow-hidden px-6'>
        <span className='truncate text-[14px] font-bold text-gray-700 dark:text-gray-600'>Assets in package</span>
        <Avatars className='ml-3 shrink-0 self-end' assets={assets} />
      </div>

      {/* auth methods */}
      <span className='mt-2 truncate px-6 text-gray-800 dark:text-[#A4A4A4]'>
        {authTypes.length} Auth methods/task required
      </span>

      {/* deadline */}
      <Deadline startDate={startDate} endDate={endDate} className='mt-auto mb-3 truncate px-6' />
    </div>
  );
};

export default Package;
