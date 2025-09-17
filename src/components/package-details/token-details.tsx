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
  const url = ExplorerURL + '/tokens/' + asset.tokenId;
  const colors = getAssetColors(asset.name);

  return (
    // container
    <div
      className={`h-8 w-full bg-transparent text-sm font-light text-black dark:text-white ${inter.className} flex
        items-center justify-between gap-1 overflow-hidden`}
    >
      {/* token name & logo */}
      <div className='flex min-w-0 items-center gap-2'>
        <TokenAvatar assetName={asset.name} colors={colors} />
        <span className='max-w-[150px] truncate text-[14px] font-medium'>{asset.name}</span>
      </div>

      {/* formatted amount */}
      <div className='w-16 flex-none text-right'>
        <FormattedAmount amount={asset.amount} decimal={asset.decimal} />
      </div>

      {/* token ID & link */}
      <div className='relative flex h-full min-w-0 items-center justify-end'>
        {/* external link */}
        <a href={url} target='_blank' className='relative flex h-full w-full items-center gap-1'>
          {/* token ID */}
          <TooltipTokenId tokenId={asset.tokenId}>
            <span className='max-w-[120px] cursor-pointer truncate text-[11px] font-light hover:underline'>
              {asset.tokenId}
            </span>
          </TooltipTokenId>
          <FaExternalLinkAlt className='ml-1 h-3 w-3 shrink-0' />
        </a>
      </div>
    </div>
  );
};

export default TokenDetails;
