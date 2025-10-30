import { ScrollArea } from '@/components/ui/scroll-area';
import { Asset } from '@/types';

import { LineAfterText } from './line-after-text';
import TokenDetails from './token-details';

interface PackageAssetsProps {
  assets: Asset[];
}

const PackageAssets = ({ assets }: PackageAssetsProps) => {
  return (
    <div className='flex h-auto w-[286px] flex-col items-start justify-start'>
      <LineAfterText text='Assets' />

      {/* scrollable list */}
      <ScrollArea
        className='mt-1 h-28 w-full rounded-md [&_[data-orientation=vertical]_>div]:bg-gray-700
          dark:[&_[data-orientation=vertical]_>div]:bg-gray-300'
      >
        {/* internal padding so scrollbar never overlaps content */}
        <div className='flex w-full flex-col gap-1 pr-4 pl-[2px]'>
          {assets.map((asset, idx) => (
            <TokenDetails key={idx} asset={asset} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PackageAssets;
