'use client';

import { useWalletStore } from '@/store/wallet-store';
import { WalletType } from '@/types';

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import ConnectWalletSidebar from '../wallet-sidebar/connect-wallet-sidebar';
import Searchbar from './searchbar/searchbar';
import SortBy from './sort-by';
import ToggleThemeButton from './toggle-theme-button';
import WalletAddress from './wallet-address';

interface NavbarProps {
  walletType: WalletType;
}

const Navbar = ({ walletType }: NavbarProps) => {
  const address = useWalletStore((s) => s.address);
  return (
    // container
    <div className='relative flex h-50 w-full flex-col items-end justify-between'>
      {/* toggle theme button & wallet address */}
      <div className='flex w-full items-center justify-end gap-x-4 pt-7.5 pr-11'>
        <ToggleThemeButton />

        {/* wallet address & its sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <WalletAddress walletAddress={address || 'Connect Wallet'} walletType={walletType} />
          </SheetTrigger>
          <SheetContent>
            <ConnectWalletSidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* searchbar & sortby */}
      <div className='flex w-full gap-x-6.5 self-center'>
        <Searchbar />
        <SortBy />
      </div>
    </div>
  );
};

export default Navbar;
