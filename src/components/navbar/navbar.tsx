'use client';

import { useTheme } from 'next-themes';
import { FiLogOut } from 'react-icons/fi';

import { cn } from '@/lib';
import { useAuthStore } from '@/lib/api/auth-store';
import { useWalletStore } from '@/store/wallet-store';
import { WalletType } from '@/types';

import { ErgoFaucetDark } from '../icons/ergo-faucet-dark';
import { ErgoFaucetLight } from '../icons/ergo-faucet-light';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import ConnectWalletSidebar from '../wallet-sidebar/connect-wallet-sidebar';
import Searchbar from './searchbar/searchbar';
import SortBy from './sort-by';
import WalletAddress from './wallet-address';

interface NavbarProps {
  walletType: WalletType;
  className?: string;
}

const Navbar = ({ walletType, className }: NavbarProps) => {
  const { theme } = useTheme();
  const address = useWalletStore((s) => s.address);
  const disconnect = useWalletStore((s) => s.disconnect);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const handleLogout = async () => {
    try {
      // intentionally left empty per instruction
    } catch {
    } finally {
      setAccessToken(null);
      disconnect();
    }
  };

  return (
    // container
    <div className={cn('relative flex w-full flex-col items-end justify-between gap-4 gap-y-16', className)}>
      {/* toggle theme button & wallet address */}
      <div className='relative flex w-full items-center justify-between self-end pt-7'>
        {theme === 'light' ? (
          <ErgoFaucetLight className='absolute mt-12 -ml-6 h-full' />
        ) : (
          <ErgoFaucetDark className='absolute mt-12 -ml-6 h-full' />
        )}
        <div className='flex items-center gap-x-4'></div>

        {/* wallet address → connect sheet when not logged in; dropdown with Logout when logged in */}
        {address ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <WalletAddress walletAddress={address} walletType={walletType} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='dark:bg-gray-1100 w-[183px] rounded-[15px] border border-gray-800 bg-gray-100'
              align='end'
            >
              <DropdownMenuItem
                onSelect={async (e) => {
                  e.preventDefault();
                  await handleLogout();
                }}
                className='flex h-[39px] cursor-pointer items-center gap-2 rounded-[10px] text-[15px] font-bold'
              >
                <FiLogOut className='text-black dark:text-white' size={15} />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <WalletAddress walletAddress={'Connect Wallet'} walletType={walletType} />
            </SheetTrigger>
            <SheetContent>
              <ConnectWalletSidebar />
            </SheetContent>
          </Sheet>
        )}
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
