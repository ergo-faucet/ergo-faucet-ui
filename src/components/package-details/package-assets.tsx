import { Asset } from '@/types';

import TokenDetails from './token-details';

interface PackageAssetsProps {
  assets: Asset[];
}

const PackageAssets = ({ assets }: PackageAssetsProps) => {
  return (
    <div className='flex h-auto w-[286px] flex-col items-start justify-start'>
      <div
        className='relative mb-2 flex h-full w-full items-start justify-start text-gray-900 after:mt-3 after:ml-3
          after:block after:h-0.5 after:w-[100%] after:bg-gray-900 dark:text-gray-200 after:dark:bg-gray-200'
      >
        <span className='text-[15px] font-extrabold'>Assets</span>
      </div>
      {assets.map((asset, idx) => {
        return <TokenDetails key={idx} asset={asset} />;
      })}
    </div>
  );
};

export default PackageAssets;
