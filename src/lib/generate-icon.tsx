import BitcoinSmall from '@/icons/bitcoin-small';
import Ethereum from '@/icons/ethereum';
import { AssetType } from '@/types/assets';

const GenerateIcon = ({ assetType }: { assetType: AssetType }) => {
  switch (assetType) {
    case 'bitcoin':
      return (
        <div className='flex items-start justify-center'>
          <BitcoinSmall />
          <span className='pl-2.5 text-[10px] tracking-wider text-black dark:text-white'>Bitcoin token</span>
        </div>
      );
      break;
    case 'tether':
      return (
        <div className='flex items-start justify-center'>
          <Ethereum />
          <span className='pl-2.5 text-[10px] tracking-wider text-black dark:text-white'>Ethereum token</span>
        </div>
      );
      break;
    default:
      return null;
  }
};

export default GenerateIcon;
