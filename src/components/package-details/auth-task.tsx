import { FcGoogle } from 'react-icons/fc';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import DiscordIcon from '@/components/icons/discord';

const ClickToCompleteButton = () => {
  return (
    <button className='w-19 h-4 rounded-[5px] mr-1 bg-gold-ergo hover:bg-amber-800 text-white text-[8px] font-semibold shadow-md/50 shadow-black'>
      Click to complete
    </button>
  );
};

interface AuthTaskProps {
  authType: 'google' | 'discord';
  title: string;
  isCompleted: boolean;
}

const AuthTask = ({ authType, title, isCompleted }: AuthTaskProps) => {
  return (
    // container
    <div className='bg-white dark:bg-light-green-ergo w-72 h-11 border border-[#27548A]/35 flex px-2 items-center justify-between rounded-[5px] transition-colors duration-300'>
      {/* icon and title */}
      <div className='flex flex-row items-center w-25 h-9'>
        {/* TODO: add other icons based on new types later */}
        {authType === 'google' ? (
          <FcGoogle className='size-9 bg-white rounded-full' />
        ) : authType === 'discord' ? (
          <DiscordIcon />
        ) : null}
        <span className='font-semibold text-sm tracking-wider pl-2.5 text-black'>
          {title}
        </span>
      </div>
      {/* status */}
      {isCompleted ? (
        <IoCheckmarkCircleSharp
          className='text-[#183B4E] dark:text-[#0E2B33]'
          size={18}
        />
      ) : (
        <ClickToCompleteButton />
      )}
    </div>
  );
};

export default AuthTask;
