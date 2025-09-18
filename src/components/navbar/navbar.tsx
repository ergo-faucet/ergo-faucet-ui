'use client';

import { FiLogOut } from 'react-icons/fi';

import { useAuthStore } from '@/lib/api/auth-store';
import { useConnectSidebarStore } from '@/store/connect-sidebar-store';
import { useWalletStore } from '@/store/wallet-store';
import { WalletType } from '@/types';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
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
  const disconnect = useWalletStore((s) => s.disconnect);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const isConnectSidebarOpen = useConnectSidebarStore((s) => s.isOpen);
  const setConnectSidebarOpen = useConnectSidebarStore((s) => s.setOpen);

  const handleLogout = async () => {
    try {
      // TODO: use logout endpoint to clear http only cookie
    } catch {
    } finally {
      setAccessToken(null);
      disconnect();
    }
  };
  return (
    // container
    <div className='relative flex w-full flex-col items-end justify-between'>
      {/* toggle theme button & wallet address */}
      <div className='flex w-full items-center justify-end gap-x-4 pt-7.5 pr-11'>
        <ToggleThemeButton />

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
          <Sheet open={isConnectSidebarOpen} onOpenChange={setConnectSidebarOpen}>
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
      <div className='flex w-full gap-x-6.5 self-center p-11'>
        <div className='flex-1'>
          <Searchbar />
        </div>
        <SortBy />
      </div>
    </div>
  );
};

export default Navbar;
