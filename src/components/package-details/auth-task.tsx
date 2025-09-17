'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { ClickToCompleteButton } from '@/components/package-details/buttons';
import { GenerateAuthTypeIcon } from '@/lib';

import { CheckIcon } from './check-icon';
import { AuthTaskType } from './types';

interface AuthTaskProps {
  authTask: AuthTaskType;
}

const AuthTaskInner = ({ authTask }: AuthTaskProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLogin = () => {
    let endpoint = '';

    // Choose endpoint based on auth type
    if (authTask.authType === 'discord') {
      endpoint = '/auth/discord/login';
    } else if (authTask.authType === 'google') {
      endpoint = '/auth/google/login';
    } else if (authTask.authType === 'x-platform') {
      endpoint = '/auth/x-platform/login';
    } else {
      return;
    }

    // Build state as current route (path + query if present)
    const currentQuery = searchParams.toString();
    const frontState = currentQuery ? `${pathname}?${currentQuery}` : pathname;

    // Redirect browser directly to backend OAuth endpoint with state
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}?state=${encodeURIComponent(frontState)}`;
    window.location.href = url;
  };

  return (
    <div
      className='flex h-11 w-72 items-center justify-between rounded-[5px] border border-gray-300 bg-gray-50 px-2
        transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700'
    >
      <div className='h-8.5 w-30'>
        <GenerateAuthTypeIcon authType={authTask.authType} />
      </div>

      {authTask.isCompleted ? <CheckIcon /> : <ClickToCompleteButton handleOnClick={handleLogin} />}
    </div>
  );
};

const AuthTask = (props: AuthTaskProps) => (
  <Suspense fallback={null}>
    <AuthTaskInner {...props} />
  </Suspense>
);

export default AuthTask;
