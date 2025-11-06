import { FaExternalLinkAlt } from 'react-icons/fa';

import TokenAvatar from '@/components/token-avatar';
import { TooltipTokenId } from '@/components/tooltip-tokenid';
import { ExplorerURL } from '@/configs';
import { inter } from '@/fonts';
import { getAssetColors } from '@/lib';
import { Asset } from '@/types';

import { FormattedAmount } from '../formatted-amount';

interface TokenDetailsProps {
  asset: Asset;
}

const TokenDetails = ({ asset }: TokenDetailsProps) => {
  const url = `${ExplorerURL}/en/token/${asset.tokenId}`;
  const colors = getAssetColors(asset.name);

  return (
    // container
    <div
      className={`${inter.className} flex h-8 w-full items-center justify-between overflow-hidden bg-transparent text-sm
        font-light text-black dark:text-white`}
    >
      {/* left: token name & logo */}
      <div className='flex min-w-0 flex-1 items-center gap-2 overflow-hidden'>
        <TokenAvatar assetName={asset.name} colors={colors} />
        <span className='truncate text-[14px] font-medium'>{asset.name}</span>
      </div>

      {/* middle: formatted amount (right-aligned, no wrapping) */}
      <div className='flex flex-shrink-0 items-center justify-end px-3 text-right'>
        <FormattedAmount amount={asset.amount} decimals={asset.decimals} />
      </div>

      {/* right: token ID & external link */}
      <div className='relative flex min-w-0 flex-shrink-0 items-center justify-end overflow-hidden'>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='flex max-w-[100px] min-w-0 items-center gap-1 overflow-hidden'
        >
          <TooltipTokenId tokenId={asset.tokenId}>
            <span className='min-w-0 truncate text-[11px] font-light hover:underline' title={asset.tokenId}>
              {asset.tokenId}
            </span>
          </TooltipTokenId>
          <FaExternalLinkAlt size={10} className='flex-shrink-0 text-gray-500 dark:text-gray-400' />
        </a>
      </div>
    </div>
  );
};

export default TokenDetails;
