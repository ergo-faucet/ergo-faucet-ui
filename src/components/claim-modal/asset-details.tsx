import { openSans } from '@/fonts';
import { Asset } from '@/types';

interface AssetDetailsProps {
  assets: Asset[];
}

export default function AssetDetails({ assets }: AssetDetailsProps) {
  return (
    // container
    <div className={`${openSans.className} mx-auto h-auto w-[311px] bg-transparent p-4`}>
      {/* the table */}
      <table className='w-full border-separate text-left text-sm text-white'>
        {/* headers */}
        <thead>
          <tr className='text-[10px] font-bold text-gray-800 dark:text-gray-300'>
            <th className='pl-3'>Asset Name</th>
            <th className='pr-7 text-right'>Amount</th>
          </tr>
        </thead>

        {/* assets */}
        <tbody>
          {assets.map((asset, idx) => (
            <tr key={idx}>
              <td colSpan={2}>
                {/* aseet row */}
                <div
                  className='flex h-4 w-full items-center justify-between rounded-[5px] border border-gray-700
                    bg-transparent px-3 py-2 text-[10px] text-black dark:border-gray-500'
                >
                  {/* logo and name */}
                  <div className='flex items-center gap-2 text-gray-700 dark:text-white'>
                    {/* TODO : doable after the merge of token details component */}
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
