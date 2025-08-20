import { ClickToCompleteButton } from '@/components/package-details/buttons';
import { GenerateAuthTypeIcon } from '@/lib';
import { AuthType } from '@/types';

import { CheckIcon } from './check-icon';

interface AuthTaskProps {
  authType: AuthType;
  title: string;
  isCompleted: boolean;
}

const AuthTask = ({ authType, isCompleted }: AuthTaskProps) => {
  return (
    // container
    <div
      className='flex h-11 w-72 items-center justify-between rounded-[5px] border border-gray-300 bg-gray-50 px-2
        transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700'
    >
      {/* icon and title */}
      <div className='flex h-9 w-25 flex-row items-center'>{<GenerateAuthTypeIcon authType={authType} />}</div>

      {/* status */}
      {isCompleted ? <CheckIcon /> : <ClickToCompleteButton />}
    </div>
  );
};

export default AuthTask;
