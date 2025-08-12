'use client';

import { Inter } from 'next/font/google';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { TooltipTokenId } from '@/components/package-details/tooltip-tokenid';
import { Avatar } from '@/components/ui/avatar';
import { ExplorerURL } from '@/configs';
import { cn } from '@/lib';
import { getFractionalPart, getWholePart } from '@/lib/format-amount';
import { getAssetColors } from '@/lib/select-color';
import { Asset } from '@/types';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700'],
});

interface TokenDetailsProps {
  asset: Asset;
}

const TokenDetails = ({ asset }: TokenDetailsProps) => {
  const url = ExplorerURL + '/tokens/' + asset.tokenId;
  const colors = getAssetColors(asset.name);

  return (
    // container
    <div
      className={`h-8 w-90 bg-transparent text-sm font-light text-black dark:text-white ${inter.className} flex
        items-center justify-between`}
    >
      {/* token name & logo */}
      <div className='flex items-center justify-center gap-2'>
        <Avatar className={cn('flex h-[21px] w-[21px] items-center justify-center text-[15px] text-white', colors)}>
          {asset.name.charAt(0).toUpperCase()}
        </Avatar>
        <span className='text-[14px] font-medium'>{asset.name}</span>
      </div>

      {/* formatted amount */}
      <div>
        <span className='text-[13px] font-bold'>{getWholePart(asset.amount, asset.decimal)}.</span>
        <span className='text-[11px] font-semibold text-gray-900 dark:text-gray-200'>
          {getFractionalPart(asset.amount, asset.decimal)}
        </span>
      </div>

      {/* token ID & link */}
      <div className='flex h-full items-center justify-end'>
        {/* token ID */}
        <TooltipTokenId
          content='Click to Copy'
          clickedContent={
            <>
              <span className='text-green-300 dark:text-green-900'>{asset.tokenId}</span> <br></br>{' '}
              <span className='dark:text-green-1000 text-green-50'>Copied to Clipboard!</span>
            </>
          }
        >
          <span className='max-w-[40px] cursor-pointer truncate text-[8px] font-light hover:underline'>
            {asset.tokenId}
          </span>
        </TooltipTokenId>

        {/* external link */}
        <a href={url} className='relative h-full w-5'>
          <FaExternalLinkAlt className='absolute top-2 right-2' size={10} />
        </a>
      </div>
    </div>
  );
};

export default TokenDetails;
