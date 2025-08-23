import { WalletType } from '@/types';

import Searchbar from './searchbar/searchbar';
import SortBy from './sort-by';
import ToggleThemeButton from './toggle-theme-button';
import WalletAddress from './wallet-address';

interface NavbarProps {
  walletAddress: string;
  walletType: WalletType;
}

const Navbar = ({ walletAddress, walletType }: NavbarProps) => {
  return (
    // container
    <div className='relative flex h-50 w-full flex-col items-end justify-between'>
      {/* toggle theme button & wallet address */}
      <div className='flex w-full items-center justify-end gap-x-4 pt-7.5 pr-11'>
        <ToggleThemeButton />
        <WalletAddress walletAddress={walletAddress} walletType={walletType} />
      </div>

      {/* searchbar & sortby */}
      <div className='flex w-full gap-x-6.5 self-start px-11'>
        <Searchbar />
        <SortBy />
      </div>
    </div>
  );
};

export default Navbar;
