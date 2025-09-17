import { cn } from '@/lib';
import { Asset } from '@/types';

import { LineAfterText } from './line-after-text';
import TokenDetails from './token-details';

interface PackageAssetsProps {
  assets: Asset[];
  className?: string;
}

const PackageAssets = ({ assets, className }: PackageAssetsProps) => {
  return (
    <div className={cn('flex h-auto w-full flex-col items-start justify-start overflow-hidden', className)}>
      <div className='mb-2'>
        <LineAfterText text='Assets' />
      </div>
      <div className='w-full'>
        <div className='flex flex-col gap-0'>
          {assets.map((asset, idx) => (
            <TokenDetails key={idx} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageAssets;
