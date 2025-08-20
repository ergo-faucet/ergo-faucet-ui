import { volkhov } from '@/fonts';
import { GenerateWalletIcon } from '@/lib';
import { WalletType } from '@/types';

interface WalletAddressProps {
  walletAddress: string;
  walletType: WalletType;
}

const WalletAddress = ({ walletAddress, walletType }: WalletAddressProps) => {
  return (
    <button
      className={`${volkhov.className} flex h-12.5 w-45 cursor-pointer items-center justify-between rounded-[15px]
        border border-gray-500 pr-1.5 pl-3.5`}
    >
      <span className='block max-w-[105px] truncate text-sm text-gray-800 dark:text-gray-500'>{walletAddress}</span>

      <GenerateWalletIcon walletType={walletType} />
    </button>
  );
};

export default WalletAddress;
