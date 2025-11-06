import { FaExternalLinkAlt } from 'react-icons/fa';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ExplorerURL } from '@/configs';
import { inter } from '@/fonts';
import { getAssetColors } from '@/lib';
import { Asset } from '@/types';

import { FormattedAmount } from '../formatted-amount';
import TokenAvatar from '../token-avatar';
import { TooltipTokenId } from '../tooltip-tokenid';

interface AssetDetailsProps {
  assets: Asset[];
}

export default function AssetDetails({ assets }: AssetDetailsProps) {
  return (
    <div
      className={`${inter.className} -mr-3 flex h-auto w-full flex-col items-center justify-center overflow-hidden p-4
        pb-0`}
    >
      {/* fixed headers */}
      <div
        className='mb-1 flex w-[311px] items-center justify-between px-3 text-[10px] font-bold text-gray-800
          dark:text-gray-300'
      >
        <span className='pl-6'>Asset Name</span>
        <span className='pr-6 text-right'>Amount</span>
      </div>

      {/* scrollable body */}
      <ScrollArea
        className='h-40 w-[311px] rounded-md [&_[data-orientation=vertical]_>div]:bg-gray-700
          dark:[&_[data-orientation=vertical]_>div]:bg-gray-300'
      >
        {/* keep scroll content centered even with scrollbar */}
        <div className='flex w-full flex-col items-center justify-start gap-1 pr-3 pl-[2px]'>
          {assets.map((asset, idx) => (
            <div
              key={idx}
              className='flex h-7 w-full max-w-[311px] items-center justify-between gap-x-3 overflow-hidden
                rounded-[5px] border border-gray-700 bg-transparent px-6 py-2 text-[10px] text-black hover:bg-[#B5B2B2]
                dark:border-gray-500 dark:hover:bg-[#473F3F]'
            >
              {/* logo and name */}
              <div className='flex min-w-0 flex-1 items-center gap-2 text-gray-700 dark:text-white'>
                <TokenAvatar colors={getAssetColors(asset.name)} assetName={asset.name} />
                <TooltipTokenId tokenId={asset.tokenId}>
                  <a
                    href={`${ExplorerURL}/tokens/${asset.tokenId}`}
                    target='_blank'
                    className='flex max-w-[160px] min-w-0 cursor-pointer items-center gap-1 overflow-hidden
                      text-gray-700 dark:text-white'
                  >
                    <span className='truncate text-[14px] font-medium tracking-wide' title={asset.name}>
                      {asset.name}
                    </span>
                    <FaExternalLinkAlt className='flex-shrink-0' size={10} />
                  </a>
                </TooltipTokenId>
              </div>

              {/* amount */}
              <div className='flex-shrink-0 pr-1 text-right'>
                <FormattedAmount amount={asset.amount} decimals={asset.decimals} />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
