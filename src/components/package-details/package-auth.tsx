import React from 'react';

import AuthTask from './auth-task';
import { AuthTaskType } from './types';

interface PackageAuthProps {
  authTasks: AuthTaskType[];
  title: string;
}

export const PackageAuth = ({ authTasks, title }: PackageAuthProps) => {
  return (
    <div className='flex flex-col items-start justify-center gap-[7px]'>
      <span className='text-[15px] font-extrabold'>{title}</span>
      {authTasks.map((authTask, index) => {
        return (
          <AuthTask
            key={index}
            authTask={{
              authType: authTask.authType,
              isCompleted: authTask.isCompleted,
            }}
          />
        );
      })}
    </div>
  );
};
