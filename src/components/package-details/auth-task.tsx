import { ClickToCompleteButton } from '@/components/package-details/buttons';
import { GenerateAuthTypeIcon } from '@/lib';

import { CheckIcon } from './check-icon';
import { AuthTaskType } from './types';

interface AuthTaskProps {
  authTask: AuthTaskType;
}

const AuthTask = ({ authTask }: AuthTaskProps) => {
  return (
    // container
    <div
      className='flex h-11 w-72 items-center justify-between rounded-[5px] border border-gray-300 bg-gray-50 px-2
        transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700'
    >
      {/* icon and title */}
      <div className='h-8.5 w-30'>{<GenerateAuthTypeIcon authType={authTask.authType} />}</div>

      {/* status */}
      {authTask.isCompleted ? <CheckIcon /> : <ClickToCompleteButton />}
    </div>
  );
};

export default AuthTask;
