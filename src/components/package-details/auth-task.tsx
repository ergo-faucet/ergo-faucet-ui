'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { ClickToCompleteButton } from '@/components/package-details/buttons';
import { GenerateAuthTypeIcon } from '@/lib';
import { authFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/api/auth-store';
import { useConnectSidebarStore } from '@/stores/connect-wallet';
import { AuthLoginResponse } from '@/types';

import { CheckIcon } from './check-icon';
import { AuthTaskType } from './types';

interface AuthTaskProps {
  authTask: AuthTaskType;
}

const AuthTaskInner = ({ authTask }: AuthTaskProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openSidebar = useConnectSidebarStore((s) => s.open);
  const accessToken = useAuthStore((s) => s.accessToken);

  const handleComplete = async () => {
    // If user is not logged in, open wallet connect sidebar
    if (!accessToken) {
      openSidebar();
      return;
    }
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

    const response: AuthLoginResponse = await authFetch(`${endpoint}?state=${encodeURIComponent(frontState)}`);

    // Redirect browser directly to backend OAuth endpoint with state
    window.location.href = response.redirectURL;
  };

  return (
    <div
      className='flex h-11 w-72 items-center justify-between rounded-[5px] border border-gray-300 bg-gray-50 px-2
        transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700'
    >
      <div className='h-8.5 w-30'>
        <GenerateAuthTypeIcon authType={authTask.authType} />
      </div>

      {authTask.isCompleted ? <CheckIcon /> : <ClickToCompleteButton handleOnClick={handleComplete} />}
    </div>
  );
};

const AuthTask = (props: AuthTaskProps) => (
  <Suspense fallback={null}>
    <AuthTaskInner {...props} />
  </Suspense>
);

export default AuthTask;
