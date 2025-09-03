'use client';

import { Volkhov } from 'next/font/google';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoWalletSharp } from 'react-icons/io5';

import { SheetClose } from '../ui/sheet';
import { WalletSelection } from './wallet-selection';

const volkhov = Volkhov({
  subsets: ['latin'],
  weight: ['400'],
});

const ConnectWalletSidebar = () => {
  const [state] = useState<'selection' | 'login'>('selection');

  return (
    // container
    <div
      className={`${volkhov.className} dark:bg-gray-1200 relative flex h-full w-[452px] flex-col items-center
        justify-center space-y-21 bg-[#F8F8F8]`}
    >
      {/* close button */}
      <SheetClose>
        <button className='absolute top-2 left-2 cursor-pointer'>
          <IoMdClose className='h-full w-full text-gray-400' size={30} />
        </button>
      </SheetClose>

      {/* wallet icon and connect text */}
      <div className='top-36 flex flex-col items-center justify-start gap-5'>
        <IoWalletSharp className='text-black dark:text-white' size={80} />
        <span className='text-[22px]'>Connect your wallet</span>
      </div>

      {state === 'selection' && <WalletSelection />}
    </div>
  );
};

export default ConnectWalletSidebar;
