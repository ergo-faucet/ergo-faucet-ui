'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import { toast } from 'sonner';

import { ClickToCompleteButton } from '@/components/package-details/buttons';
import { GenerateAuthTypeIcon } from '@/lib';
import { authFetch } from '@/lib/api';
import { AuthLoginResponse } from '@/types';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import ConnectWalletSidebar from '../wallet-sidebar/connect-wallet-sidebar';
import { CheckIcon } from './check-icon';
import { AuthTaskType } from './types';

interface AuthTaskProps {
  authTask: AuthTaskType;
}

const AuthTaskInner = ({ authTask }: AuthTaskProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const hasAccessToken = Boolean(session?.accessToken && !session.error);
  const [showConnectSheet, setShowConnectSheet] = useState(false);

  const handleComplete = async () => {
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
    if (!response.redirectURL) {
      toast.error('Please login to complete this task !');
      setShowConnectSheet(true);
      return;
    }

    // Redirect browser directly to backend OAuth endpoint with state
    window.location.href = response.redirectURL;
  };

  return (
    <div
      className='flex h-11 w-72 items-center justify-between rounded-[5px] border border-gray-300 bg-gray-50 px-2
        transition-colors duration-300 dark:border-gray-600 dark:bg-gray-700'
    >
      <div className='h-8.5 w-32'>
        <GenerateAuthTypeIcon authType={authTask.authType} />
      </div>

      {/* not logged in */}
      {!hasAccessToken && (
        <Sheet>
          <SheetTrigger>
            <ClickToCompleteButton handleOnClick={() => {}} />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className='sr-only'>Connect your wallet</SheetTitle>
            <ConnectWalletSidebar />
          </SheetContent>
        </Sheet>
      )}

      {/* logged in */}
      {hasAccessToken &&
        (authTask.isCompleted ? <CheckIcon /> : <ClickToCompleteButton handleOnClick={handleComplete} />)}

      <Sheet open={showConnectSheet} onOpenChange={setShowConnectSheet}>
        <SheetContent>
          <SheetTitle className='sr-only'>Connect your wallet</SheetTitle>
          <ConnectWalletSidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

const AuthTask = (props: AuthTaskProps) => (
  <Suspense fallback={null}>
    <AuthTaskInner {...props} />
  </Suspense>
);

export default AuthTask;
