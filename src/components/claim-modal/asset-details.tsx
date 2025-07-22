import { openSans } from '@/fonts';
import GenerateIcon from '@/lib/generate-icon';
import { Asset } from '@/types';

interface AssetDetailsProps {
  assets: Asset[];
}

export default function AssetDetails({ assets }: AssetDetailsProps) {
  return (
    // container
    <div className={`${openSans.className} mx-auto w-[311px] bg-transparent p-4`}>
      {/* the table */}
      <table className='w-full border-separate border-spacing-y-2 text-left text-sm text-white'>
        {/* headers */}
        <thead>
          <tr className='text-[10px] font-bold text-gray-800 dark:text-gray-300'>
            <th className='pb-3 pl-3'>Asset Name</th>
            <th className='pr-7 pb-3 text-right'>Amount</th>
          </tr>
        </thead>

        {/* assets */}
        <tbody>
          {assets.map((asset, idx) => (
            <tr key={idx}>
              <td colSpan={2}>
                {/* aseet row */}
                <div
                  className='flex h-4 w-full items-center justify-between rounded-md border border-gray-700
                    bg-transparent px-3 py-2 text-[10px] text-black dark:border-gray-500'
                >
                  {/* logo */}
                  <div className='flex items-center gap-2 text-black dark:text-white'>
                    <GenerateIcon assetType={asset.assetType} />
                  </div>
                  {/* amount */}
                  <div className='pr-5 text-[10px] text-black dark:text-white'>{asset.amount}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
