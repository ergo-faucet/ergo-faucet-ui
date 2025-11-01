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
        className='/* --- FIX for Radix viewport wrapper expanding width --- */ mt-1 h-28 w-full overflow-hidden
          rounded-md [&_[data-orientation=vertical]_>div]:bg-gray-700
          dark:[&_[data-orientation=vertical]_>div]:bg-gray-300 [&_[data-radix-scroll-area-viewport]]:max-w-full
          [&_[data-radix-scroll-area-viewport]]:min-w-0 [&_[data-radix-scroll-area-viewport]>div]:!block
          [&_[data-radix-scroll-area-viewport]>div]:!min-w-0'
      >
        {/* internal padding so scrollbar never overlaps content */}
        <div className='flex w-full max-w-full min-w-0 flex-col gap-1 pr-4 pl-[2px]'>
          {assets.map((asset, idx) => (
            <div key={idx} className='w-full min-w-0'>
              <TokenDetails asset={asset} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PackageAssets;
