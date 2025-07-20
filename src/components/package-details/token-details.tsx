import { Inter } from 'next/font/google';
import { FaBitcoin, FaExternalLinkAlt } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300'],
});

interface TokenDetails {
  type: 'bitcoin' | 'tether';
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
      <div className='ml-2 flex items-center justify-center gap-x-2'>
        {/* logo */}
        {type === 'bitcoin' ? (
          <FaBitcoin className='rounded-full bg-white text-amber-500' size={20} />
        ) : type === 'tether' ? (
          <SiTether className='rounded-full bg-transparent text-[#009393]' size={20} />
        ) : null}

        {/* name */}
        {type === 'bitcoin' ? <span>Bitcoin token</span> : type === 'tether' ? <span>Tether token</span> : null}
      </div>

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
