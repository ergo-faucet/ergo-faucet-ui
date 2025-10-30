'use client';

import { FiLogOut } from 'react-icons/fi';

import { authFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/api/auth-store';
import { useWalletStore } from '@/store/wallet-store';
import { WalletType } from '@/types';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import ConnectWalletSidebar from '../wallet-sidebar/connect-wallet-sidebar';
import ToggleThemeButton from './toggle-theme-button';
import WalletAddress from './wallet-address';

interface NavbarProps {
  walletType: WalletType;
}

const Navbar = ({ walletType }: NavbarProps) => {
  const address = useWalletStore((s) => s.address);
  const disconnect = useWalletStore((s) => s.disconnect);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const handleLogout = async () => {
    try {
      await authFetch('/auth/ergo/logout', { method: 'GET', credentials: 'include' });
    } catch {
    } finally {
      setAccessToken(null);
      disconnect();
    }
  };

  return (
    // container
    <div className='relative flex h-24 w-full flex-col items-end justify-between'>
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
          <Sheet modal={false}>
            <SheetTrigger asChild>
              <WalletAddress walletAddress={'Connect Wallet'} walletType={walletType} />
            </SheetTrigger>
            <SheetContent
              // safety net: prevent dismiss when interacting with iframe (recaptcha)
              onPointerDownOutside={(e) => {
                const originalEvent = e.detail?.originalEvent as Event | undefined;
                const target = (originalEvent?.target ?? e.target) as HTMLElement | null;
                if (target && target.closest('iframe')) e.preventDefault();
              }}
              onInteractOutside={(e) => {
                const originalEvent = e.detail?.originalEvent as Event | undefined;
                const target = (originalEvent?.target ?? e.target) as HTMLElement | null;
                if (target && target.closest('iframe')) e.preventDefault();
              }}
            >
              <ConnectWalletSidebar />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
};

export default Navbar;
