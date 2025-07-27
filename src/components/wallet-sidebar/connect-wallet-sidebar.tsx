import { Volkhov } from 'next/font/google';
import { IoMdClose } from 'react-icons/io';
import { IoWalletSharp } from 'react-icons/io5';

import Wallet from './wallet';

const volkhov = Volkhov({
  subsets: ['latin'],
  weight: ['400'],
});

const ConnectWalletSidebar = () => {
  return (
    // container
    <div
      className={`${volkhov.className} dark:bg-gray-1200 relative flex h-full w-[452px] flex-col items-center
        justify-center space-y-21 bg-[#F8F8F8]`}
    >
      {/* close button */}
      <button className='absolute top-2 left-2 cursor-pointer'>
        <IoMdClose className='h-full w-full text-gray-400' size={30} />
      </button>

      {/* wallet icon and connect text */}
      <div className='absolute top-36 flex flex-col items-center justify-start gap-5'>
        <IoWalletSharp className='text-black dark:text-white' size={80} />
        <span className='text-[22px]'>Connect your wallet</span>
      </div>

      {/* wallets */}
      <div className='flex flex-col space-y-2'>
        {/* Natilus */}
        <Wallet src='/icons/natilus-40x40.png' alt='Natilus icon' size={40} name='Natilus' selected={true} />
        {/* Ergo Pay */}
        <Wallet alt='Ergo Pay icon' size={40} name='Ergo Pay' selected={false} />
      </div>

      {/* connect button */}
      <button
        className='h-11 w-25 cursor-pointer rounded-xl border border-green-400 bg-green-700 text-[17px] tracking-wider
          text-white shadow-[-2px_2px_6px_0_rgba(0,0,0)]/20 shadow-black hover:bg-green-900 dark:shadow-white'
      >
        Connect
      </button>
    </div>
  );
};

export default ConnectWalletSidebar;
