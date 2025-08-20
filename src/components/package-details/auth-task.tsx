import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import { ClickToCompleteButton } from '@/components/package-details/buttons';
import GenerateIcon from '@/lib/generate-icon';
import { AuthType } from '@/types';

interface AuthTaskProps {
  authType: AuthType;
  title: string;
  isCompleted: boolean;
}

const AuthTask = ({ authType, isCompleted }: AuthTaskProps) => {
  return (
    // container
    <div
      className='flex h-11 w-72 items-center justify-between rounded-[5px] border border-[#27548A]/35 bg-gray-50 px-2
        transition-colors duration-300 dark:bg-gray-700'
    >
      {/* icon and title */}
      <div className='flex h-9 w-25 flex-row items-center'>
        {/* TODO: add other icons based on new types later */}
        {<GenerateIcon authType={authType} />}
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
