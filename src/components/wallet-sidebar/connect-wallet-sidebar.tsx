import { Volkhov } from 'next/font/google';
import { IoMdClose } from 'react-icons/io';
import { IoWalletSharp } from 'react-icons/io5';

const volkhov = Volkhov({
  subsets: ['latin'],
  weight: ['400'],
});

const ConnectWalletSidebar = () => {
  return (
    // container
    <div
      className={`${volkhov.className} dark:bg-gray-1200 relative flex h-full w-[452px] flex-col items-center
        justify-center bg-[#F8F8F8]`}
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

      {/* connect button */}
      <button
        className='h-11 w-25 rounded-xl border border-green-400 bg-green-700 text-[17px] tracking-wider text-white
          shadow-md/15 shadow-black dark:shadow-white'
      >
        Connect
      </button>
    </div>
  );
};

export default ConnectWalletSidebar;
