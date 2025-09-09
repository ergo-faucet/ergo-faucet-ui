'use client';

import { useTheme } from 'next-themes';

import { cn } from '@/lib';
import { useWalletStore } from '@/store/wallet-store';
import { WalletType } from '@/types';

import { ErgoFaucetDark } from '../icons/ergo-faucet-dark';
import { ErgoFaucetLight } from '../icons/ergo-faucet-light';
import Searchbar from '../main-grid/searchbar/searchbar';
import SortBy from '../main-grid/sort-by';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import ConnectWalletSidebar from '../wallet-sidebar/connect-wallet-sidebar';
import ToggleThemeButton from './toggle-theme-button';
import WalletAddress from './wallet-address';

interface NavbarProps {
  walletType: WalletType;
  className?: string;
}

const Navbar = ({ walletType, className }: NavbarProps) => {
  const { theme } = useTheme();
  const address = useWalletStore((s) => s.address);
  return (
    // container
    <div className={cn('relative flex w-full flex-col items-end justify-between gap-4 gap-y-16', className)}>
      {/* toggle theme button & wallet address */}
      <div className='relative flex w-full items-center justify-between'>
        {theme === 'light' ? (
          <ErgoFaucetLight className='absolute mt-12 -ml-6 h-full' />
        ) : (
          <ErgoFaucetDark className='absolute mt-12 -ml-6 h-full' />
        )}

        <div className='mt-6 mr-4 flex w-full items-center justify-end gap-x-4'>
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
      </div>

      {/* searchbar & sortby */}
      <div className='flex w-full gap-x-6.5 self-center'>
        <div className='flex-1'>
          <Searchbar />
        </div>
        <SortBy />
      </div>
    </div>
  );
};

export default Navbar;
