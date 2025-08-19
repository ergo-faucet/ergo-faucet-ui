'use client';

import { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { TooltipTokenId } from '@/components/package-details/tooltip-tokenid';
import TokenAvatar from '@/components/token-avatar';
import { ExplorerURL } from '@/configs';
import { inter } from '@/fonts';
import { copyToClipboard, getAssetColors, getWholePart, getFractionalPart } from '@/lib';
import { Asset } from '@/types';

interface TokenDetailsProps {
  asset: Asset;
}

const TokenDetails = ({ asset }: TokenDetailsProps) => {
  const url = ExplorerURL + '/tokens/' + asset.tokenId;
  const colors = getAssetColors(asset.name);
  const defaultTooltip = (
    <div className='max-w-[194px] text-left wrap-break-word'>
      <span className='cursor-pointer text-green-300 hover:underline dark:text-green-900'>{asset.tokenId}</span>
    </div>
  );
  const [tooltip, setTooltip] = useState(defaultTooltip);
  const [open, setOpen] = useState(false);

  return (
    // container
    <div
      className={`h-8 w-90 bg-transparent text-sm font-light text-black dark:text-white ${inter.className} flex
        items-center justify-between`}
    >
      {/* token name & logo */}
      <div className='flex items-center justify-center gap-2'>
        <TokenAvatar assetName={asset.name} colors={colors} />
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
      <div className='relative flex h-full items-center justify-end'>
        {/* external link */}
        <a href={url} target='_blank' className='relative flex h-full w-full items-center gap-1'>
          {/* token ID */}
          <TooltipTokenId
            open={open}
            onOpenChange={(state) => {
              if (open && !state) {
                setTooltip(defaultTooltip);
              }
              setOpen(state);
            }}
            content={
              <button
                onClick={() => {
                  copyToClipboard(asset.tokenId);
                  setTooltip(
                    <div className='max-w-[194px] text-left wrap-break-word'>
                      <span className='text-green-300 dark:text-green-900'>{asset.tokenId}</span> <br></br>{' '}
                      <span className='dark:text-green-1000 font-semibold text-green-50'>Copied to Clipboard!</span>
                    </div>,
                  );
                }}
              >
                {tooltip}
              </button>
            }
          >
            <span className='max-w-[48px] cursor-pointer truncate text-[11px] font-light hover:underline'>
              {asset.tokenId}
            </span>
          </TooltipTokenId>
          <FaExternalLinkAlt className='top-2 right-2' size={10} />
        </a>
      </div>
    </div>
  );
};

export default TokenDetails;
