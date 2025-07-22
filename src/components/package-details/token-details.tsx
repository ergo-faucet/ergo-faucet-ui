import { Inter } from 'next/font/google';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { GenerateAssetTypeIcon } from '@/lib';
import { AssetType } from '@/types';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300'],
});

interface TokenDetails {
  type: AssetType;
  amount: number;
  contractAddress: string;
  href: string;
}

const TokenDetails = ({ type, amount, contractAddress, href }: TokenDetails) => {
  return (
    // container
    <div
      className={`h-8 w-90 bg-transparent text-sm font-light text-black dark:text-white ${inter.className} flex
        items-center justify-between`}
    >
      {/* name and logo */}
      <GenerateAssetTypeIcon assetType={type} />

      {/* amount */}
      <span className='font-bold'>{amount}</span>

      <a href={href} className='flex h-full items-center justify-end'>
        {/* contract address */}
        <span className='max-w-[120px] truncate'>{contractAddress}</span>

        {/* external link */}
        <div className='relative h-full w-5'>
          <FaExternalLinkAlt className='absolute top-1.5 right-0' size={12} />
        </div>
      </a>
    </div>
  );
};

export default TokenDetails;
