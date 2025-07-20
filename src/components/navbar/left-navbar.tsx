import { HiUsers } from 'react-icons/hi2';
import { MdOutlineExplore } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';

const LeftNavbar = () => {
  return (
    // container
    <div
      className='dark:bg-gray-1100 flex min-h-screen w-24 flex-col items-center justify-start gap-y-6 bg-gray-50 pt-30
        [&>*]:transition-colors [&>*]:duration-300'
    >
      {/* explore */}
      <div className='flex flex-col items-center justify-center text-green-500 dark:text-green-100'>
        <MdOutlineExplore size={50} />
        <span>Explore</span>
      </div>
      {/* explore */}
      <div className='flex flex-col items-center justify-center text-black dark:text-gray-200'>
        <RiHistoryLine size={35} />
        <span>History</span>
      </div>
      {/* explore */}
      <div className='flex flex-col items-center justify-center text-black dark:text-gray-200'>
        <HiUsers className='scale-x-[-1]' size={40} />
        <span>About Us</span>
      </div>
    </div>
  );
};

export default LeftNavbar;
