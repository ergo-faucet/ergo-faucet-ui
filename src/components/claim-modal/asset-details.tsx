import { FaExternalLinkAlt } from 'react-icons/fa';

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
    // container
    <div className={`${inter.className} mx-auto h-auto w-[311px] p-4`}>
      {/* the table */}
      <table className='w-full border-separate border-spacing-1 text-left text-sm text-white'>
        {/* headers */}
        <thead>
          <tr className='text-[10px] font-bold text-gray-800 dark:text-gray-300'>
            <th className='pl-10'>Asset Name</th>
            <th className='pr-3 text-right'>Amount</th>
          </tr>
        </thead>

        {/* assets */}
        <tbody>
          {assets.map((asset, idx) => (
            <tr key={idx}>
              <td colSpan={2}>
                {/* aseet row */}
                <div
                  className='flex h-7 w-full items-center justify-between rounded-[5px] border border-gray-700
                    bg-transparent px-3 py-2 pr-4 text-[10px] text-black hover:bg-[#B5B2B2] dark:border-gray-500
                    dark:hover:bg-[#473F3F]'
                >
                  {/* logo and name */}
                  <div className='flex items-center gap-2 text-center text-gray-700 dark:text-white'>
                    <TokenAvatar colors={getAssetColors(asset.name)} assetName={asset.name} />
                    <TooltipTokenId tokenId={asset.tokenId}>
                      <a
                        href={`${ExplorerURL}/tokens/${asset.tokenId}`}
                        target='_blank'
                        className='flex cursor-pointer items-center gap-1 text-gray-700 dark:text-white'
                      >
                        <span className='text-[14px] font-medium tracking-wide'>{asset.name}</span>
                        <FaExternalLinkAlt className='top-2 right-2' size={10} />
                      </a>
                    </TooltipTokenId>
                  </div>

                  {/* amount */}
                  <FormattedAmount amount={asset.amount} decimal={asset.decimal} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
