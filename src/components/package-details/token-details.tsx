'use client';

import { Inter } from 'next/font/google';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { Avatar } from '@/components/ui/avatar';
import { ExplorerURL } from '@/configs';
import { getFractionalPart, getWholePart } from '@/lib/format-amount';
import { Asset } from '@/types';

import { TooltipTokenId } from './tooltip-tokenid';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700'],
});

interface TokenDetailsProps {
  asset: Asset;
}

const TokenDetails = ({ asset }: TokenDetailsProps) => {
  const url = ExplorerURL + '/tokens/' + asset.tokenId;

  return (
    // container
    <div
      className={`h-8 w-90 bg-transparent text-sm font-light text-black dark:text-white ${inter.className} flex
        items-center justify-between`}
    >
      {/* token name & logo */}
      <div className='flex items-center justify-center gap-2'>
        <Avatar
          className='flex h-[21px] w-[21px] items-center justify-center bg-green-200 text-[15px] text-white
            dark:bg-green-900'
        >
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
        <TooltipTokenId clickedContent={'test'} content={'test content'}>
          <span className='max-w-[40px] cursor-pointer truncate text-[8px] font-light hover:underline'>
            {asset.tokenId} test
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
