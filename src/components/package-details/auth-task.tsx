'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { ClickToCompleteButton } from '@/components/package-details/buttons';
import { authFetch, GenerateAuthTypeIcon } from '@/lib';
import { useAuthStore } from '@/lib/api/auth-store';
import { useConnectSidebarStore } from '@/store/connect-sidebar-store';
import { AuthLoginResponse } from '@/types';

import { CheckIcon } from './check-icon';
import { AuthTaskType } from './types';

interface AuthTaskProps {
  authTask: AuthTaskType;
}

const AuthTask = ({ authTask }: AuthTaskProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const accessToken = useAuthStore((s) => s.accessToken);
  const openSidebar = useConnectSidebarStore((s) => s.open);

  const handleLogin = async () => {
    // If user is not logged in, open wallet connect sidebar
    if (!accessToken) {
      openSidebar();
      return;
    }

    // Choose endpoint based on auth type
    const endpoint = `/auth/${authTask.authType}/login`;

    // Build state as current route (path + query if present)
    const currentQuery = searchParams.toString();
    const frontState = currentQuery ? `${pathname}?${currentQuery}` : pathname;

    const res: AuthLoginResponse = await authFetch(`${endpoint}?state=${encodeURIComponent(frontState)}`, {
      method: 'GET',
    });

    window.location.href = res.redirectURL;
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

export default AuthTask;
