'use client';

import { IoMdClose } from 'react-icons/io';
import { IoWalletSharp } from 'react-icons/io5';

import { volkhov } from '@/fonts';

import { SheetClose } from '../ui/sheet';
import { Login } from './Login';
import { useViewStore } from './store';
import { WalletSelection } from './wallet-selection';

const ConnectWalletSidebar = () => {
  const state = useViewStore((s) => s.state);
  return (
    // container
    <div
      className={`${volkhov.className} dark:bg-gray-1200 relative flex h-full w-[452px] flex-col items-center
        justify-center space-y-4 bg-[#F8F8F8]`}
    >
      {/* close button */}
      <SheetClose>
        <div className='absolute top-2 left-2 cursor-pointer'>
          <IoMdClose className='h-full w-full text-gray-400' size={30} />
        </div>
      </SheetClose>

      {/* wallet icon and connect text */}
      <div className='top-36 flex flex-col items-center justify-start gap-5 pb-4'>
        <IoWalletSharp className='text-black dark:text-white' size={80} />
        <span className='text-[22px]'>Connect your wallet</span>
      </div>

      {state === 'selection' && <WalletSelection />}
      {state === 'login' && <Login />}
    </div>
  );
};

export default ConnectWalletSidebar;
