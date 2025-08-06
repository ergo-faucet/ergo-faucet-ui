'use client';

import { useTheme } from 'next-themes';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import Avatar from '@mui/material/Avatar';

import { ExplorerURL } from '@/configs';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { getFractionalPart, getWholePart } from '@/lib/format-amount';
import { Asset } from '@/types';

import { getAssetColors } from './select-color';
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
  const { theme } = useTheme();
  const avatarBackgroundColor = theme === 'light' ? getAssetColors(asset.name)[0] : getAssetColors(asset.name)[1];
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const defaultTooltipText = <span className='text-green-300 dark:text-green-900'>click to copy</span>;
  const [tooltipText, setTooltipText] = useState(defaultTooltipText);

  const handleClick = async () => {
    setOpen(true);
    setClicked(true);

    const success = await copyToClipboard(asset.tokenId);
    if (success) {
      setTooltipText(
        <>
          <span className='text-green-300 dark:text-green-900'>{asset.tokenId}</span>
          <br />
          <span className='dark:text-green-1000 text-green-50'>Copied to Clipboard!</span>
        </>,
      );
    } else {
      setTooltipText(<span className='text-red-600'>failed to copy</span>);
    }

    setTimeout(() => {
      setOpen(false);
      setClicked(false);
      setTooltipText(defaultTooltipText);
    }, 3000);
  };

  // hover control close it unless it's from a click
  const handleTooltipClose = () => {
    if (!clicked) setOpen(false);
  };

  // open from hover only if not clicked
  const handleTooltipOpen = () => {
    if (!clicked) setOpen(true);
  };

  return (
    // container
    <div
      className={`h-8 w-90 bg-transparent text-sm font-light text-black dark:text-white ${inter.className} flex
        items-center justify-between`}
    >
      {/* token name & logo */}
      <div className='flex items-center justify-center gap-2'>
        <Avatar
          sx={{ bgcolor: avatarBackgroundColor, color: 'white', height: '21px', width: '21px', fontSize: '15px' }}
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
        <TooltipTokenId
          onOpen={handleTooltipOpen}
          onClose={handleTooltipClose}
          onClick={handleClick}
          open={open}
          arrow
          title={tooltipText}
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
