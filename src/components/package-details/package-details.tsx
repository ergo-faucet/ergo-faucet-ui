import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { volkhov } from '@/fonts';
import { cn } from '@/lib';
import { Asset } from '@/types';
import type { LastRequestStatusType } from '@/types';

import { ClaimModal } from '../claim-modal/claim-modal';
import { ClaimButton } from './buttons';
import PackageAssets from './package-assets';
import { PackageAuth } from './package-auth';
import PackageDescription from './package-description';
import { Timeline, TimelineProps } from './timeline';
import { AuthTaskType } from './types';

interface PackageDetailsProps extends Omit<TimelineProps, 'cooldownTime' | 'lastRequestDate' | 'lastRequestStatus'> {
  packageId: number;
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
  openAt?: number;
  closeAt?: number;
  delay?: string;
  lastRequestTime?: number;
  lastRequestStatus?: LastRequestStatusType;
  totalRequestCount?: number;
  numberEachUser?: number;
}

export const PackageDetails = ({
  packageId,
  title,
  authTasks,
  assets,
  description,
  delay,
  lastRequestTime,
  lastRequestStatus,
  openAt,
  closeAt,
  totalRequestCount,
  numberEachUser,
}: PackageDetailsProps) => {
  const hasPackageSelected = Boolean(packageId && title && title.trim() !== '');
  const hasAuth = Array.isArray(authTasks) && authTasks.length > 0;
  const hasAssets = Array.isArray(assets) && assets.length > 0;
  const hasDescription = Boolean(description && description.trim() !== '');

  // Calculate if claim button should be disabled:
  // 1. Not in package time window (before openAt or after closeAt)
  // 2. Not all auth methods passed
  // 3. Still in cooldown
  const now = Date.now();
  // backend timestamps in seconds → convert to ms for Date
  const openAtMs = openAt !== undefined ? openAt * 1000 : undefined;
  const closeAtMs = closeAt !== undefined ? closeAt * 1000 : undefined;
  // cooldown duration in seconds
  const delaySeconds = delay ? parseInt(delay, 10) : 0;
  const cooldownEndTime =
    lastRequestTime !== undefined && delay && delaySeconds > 0
      ? new Date((lastRequestTime + delaySeconds) * 1000)
      : undefined;
  // before open or after close
  const notInTimeWindow = (openAtMs !== undefined && now < openAtMs) || (closeAtMs !== undefined && now > closeAtMs);
  // has auth tasks but not all passed
  const notAllAuthPassed = hasAuth && !authTasks.every((t) => t.isCompleted);
  // user requested recently and cooldown not ended
  const inCooldown = cooldownEndTime !== undefined && now < cooldownEndTime.getTime();
  // user has reached their per-user claim limit for this package
  const limitReached =
    totalRequestCount !== undefined && numberEachUser !== undefined && totalRequestCount >= numberEachUser;
  const isDisabled = !hasAssets || notInTimeWindow || notAllAuthPassed || inCooldown || limitReached;

  const lastRequestDate = lastRequestTime !== undefined ? new Date(lastRequestTime * 1000) : undefined;

  if (!hasPackageSelected) {
    return (
      <div
        className='dark:bg-gray-1000 flex min-h-[500px] w-83 flex-col items-center justify-center rounded-[22px] border
          border-gray-400 bg-gray-100 px-8 text-center text-gray-700 dark:border-gray-700 dark:text-gray-300'
      >
        <h2 className={cn('mb-2 text-[22px] font-semibold', volkhov.className)}>No Package Selected</h2>
        <p className='max-w-[260px] text-[13px] leading-relaxed text-gray-600 dark:text-gray-400'>
          Please select a package from the list on the left to view its details, assets, and authentication
          requirements.
        </p>
      </div>
    );
  }

  // Regular details view when a package is selected
  return (
    <div
      className='dark:bg-gray-1000 flex w-83 flex-col items-start justify-center gap-y-6 rounded-[22px] border
        border-gray-400 bg-gray-100 px-5 pb-8 dark:border-gray-700'
    >
      {/* header */}
      <span
        className={cn(
          'mt-8 block w-full text-center text-[24px] leading-snug break-words text-gray-900 dark:text-gray-100',
          volkhov.className,
        )}
      >
        {title}
      </span>

      {/* timeline - show if we have lastRequestTime (to show last request date) or if we have cooldown to show */}
      {(lastRequestTime !== undefined || (delay && delay !== '0' && cooldownEndTime)) && (
        <Timeline
          cooldownTime={cooldownEndTime}
          lastRequestDate={lastRequestDate}
          lastRequestStatus={lastRequestStatus}
        />
      )}

      {/* authentication section */}
      <div className='w-full'>
        <PackageAuth title='Authentication Methods/Tasks' authTasks={hasAuth ? authTasks : []} />
        {!hasAuth && (
          <div className='mt-0.5 text-center text-sm text-gray-500 italic dark:text-gray-400'>
            No authentication tasks required for this package.
          </div>
        )}
      </div>

      {/* assets section */}
      <div className='w-full'>
        <PackageAssets assets={hasAssets ? assets : []} />
        {!hasAssets && (
          <div className='mt-0.5 text-center text-sm text-gray-500 italic dark:text-gray-400'>
            This package doesn&apos;t include any claimable assets.
          </div>
        )}
      </div>

      {/* description section */}
      <div className='w-full'>
        <PackageDescription info={hasDescription ? description : 'No description is provided for this package.'} />
      </div>

      {/* claim button */}
      <Dialog modal={false}>
        <DialogTrigger
          className='self-center'
          disabled={isDisabled}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <ClaimButton className='mt-6 self-center' disabled={isDisabled} />
        </DialogTrigger>
        <DialogContent
          // safety net: prevent dismiss when interacting with iframe (recaptcha)
          onPointerDownOutside={(e) => {
            const originalEvent = e.detail?.originalEvent as Event | undefined;
            const target = (originalEvent?.target ?? e.target) as HTMLElement | null;
            if (target && target.closest('iframe')) e.preventDefault();
          }}
          onInteractOutside={(e) => {
            const originalEvent = e.detail?.originalEvent as Event | undefined;
            const target = (originalEvent?.target ?? e.target) as HTMLElement | null;
            if (target && target.closest('iframe')) e.preventDefault();
          }}
          showCloseButton={false}
          className='flex min-h-screen min-w-screen items-center justify-center overflow-visible border-none bg-black/50
            p-0 shadow-none'
        >
          <DialogTitle className='sr-only'>Claim Modal</DialogTitle>
          <ClaimModal packageId={packageId} packageName={title} assets={assets} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
