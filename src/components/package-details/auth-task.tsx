import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import GenerateIcon from '@/lib/generate-icon';
import { authType } from '@/types';

const ClickToCompleteButton = () => {
  return (
    <button
      className='bg-gold-ergo mr-1 h-4 w-19 rounded-[5px] text-[8px] font-semibold text-white shadow-md/50 shadow-black
        hover:bg-amber-800'
    >
      Click to complete
    </button>
  );
};

interface AuthTaskProps {
  authType: authType;
  title: string;
  isCompleted: boolean;
}

const AuthTask = ({ authType, title, isCompleted }: AuthTaskProps) => {
  return (
    // container
    <div
      className='dark:bg-light-green-ergo flex h-11 w-72 items-center justify-between rounded-[5px] border
        border-[#27548A]/35 bg-white px-2 transition-colors duration-300'
    >
      {/* icon and title */}
      <div className='flex h-9 w-25 flex-row items-center'>
        {/* TODO: add other icons based on new types later */}
        {<GenerateIcon authType={authType} />}
        <span className='pl-2.5 text-sm font-semibold tracking-wider text-black'>{title}</span>
      </div>

      {/* status */}
      {isCompleted ? (
        <IoCheckmarkCircleSharp className='text-[#183B4E] dark:text-[#0E2B33]' size={18} />
      ) : (
        <ClickToCompleteButton />
      )}
    </div>
  );
};

export default AuthTask;
