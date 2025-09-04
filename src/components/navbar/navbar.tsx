import { WalletType } from '@/types';

import ToggleThemeButton from './toggle-theme-button';
import WalletAddress from './wallet-address';

interface NavbarProps {
  walletAddress: string;
  walletType: WalletType;
}

const Navbar = ({ walletAddress, walletType }: NavbarProps) => {
  return (
    // container
    <div className='relative flex h-24 w-full flex-col items-end justify-between'>
      {/* toggle theme button & wallet address */}
      <div className='flex w-full items-center justify-end gap-x-4 pt-7.5 pr-11'>
        <ToggleThemeButton />
        <WalletAddress walletAddress={walletAddress} walletType={walletType} />
      </div>
    </div>
  );
};

export default Navbar;
