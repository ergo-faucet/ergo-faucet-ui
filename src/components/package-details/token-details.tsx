import { Inter } from 'next/font/google';
import { FaExternalLinkAlt } from 'react-icons/fa';

import Avatar from '@mui/material/Avatar';

import { formatAmount } from '@/lib';
import { Asset } from '@/types';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300'],
});

interface TokenDetailsProps {
  asset: Asset;
}

const TokenDetails = ({ asset }: TokenDetailsProps) => {
  const url = process.env.EXPLORER_URL + '/tokens/' + asset.tokenId;
  const formattedAmount = formatAmount(asset.amount, asset.decimal);

  return (
    // container
    <div
      className={`h-8 w-90 bg-transparent text-sm font-light text-black dark:text-white ${inter.className} flex
        items-center justify-between`}
    >
      {/* token name & logo */}
      <div className='flex items-center justify-center gap-2'>
        <Avatar sx={{ bgcolor: '#4B9448', color: 'white' }}>{asset.name.charAt(0).toUpperCase()}</Avatar>
        <span>{asset.name}</span>
      </div>

      {/* formatted amount */}
      <span className='font-bold'>{formattedAmount}</span>

      {/* token ID & link */}
      <div className='flex h-full items-center justify-end'>
        {/* token ID */}
        <span className='max-w-[120px] truncate'>{asset.tokenId}</span>

        {/* external link */}
        <a href={url} className='relative h-full w-5'>
          <FaExternalLinkAlt className='absolute top-1.5 right-0' size={12} />
        </a>
      </div>
    </div>
  );
};

export default TokenDetails;
