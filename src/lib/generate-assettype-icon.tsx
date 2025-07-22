import { SiTether } from 'react-icons/si';

import BitcoinSmall from '@/components/icons/bitcoin-small';
import Ethereum from '@/components/icons/ethereum';
import { AssetType } from '@/types';

const GenerateAssetTypeIcon = ({ assetType }: { assetType: AssetType }) => {
  switch (assetType) {
    case 'bitcoin':
      return (
        <div className='flex items-start justify-center'>
          <BitcoinSmall />
          <span className='pl-2.5 text-[10px] tracking-wider text-black dark:text-white'>Bitcoin token</span>
        </div>
      );
      break;
    case 'ethereum':
      return (
        <div className='flex items-start justify-center'>
          <Ethereum />
          <span className='pl-2.5 text-[10px] tracking-wider text-black dark:text-white'>Ethereum token</span>
        </div>
      );
      break;
    case 'tether':
      return (
        <div className='flex items-start justify-center'>
          <SiTether className='rounded-full bg-transparent text-[#009393]' size={20} />
          <span className='pl-2.5 text-[10px] tracking-wider text-black dark:text-white'>Ethereum token</span>
        </div>
      );
    default:
      return null;
  }
};

export { GenerateAssetTypeIcon };
