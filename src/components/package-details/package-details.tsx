import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { volkhov } from '@/fonts';
import { cn } from '@/lib';
import { Asset } from '@/types';

import { ClaimModal } from '../claim-modal/claim-modal';
import { ClaimButton } from './buttons';
import PackageAssets from './package-assets';
import { PackageAuth } from './package-auth';
import PackageDescription from './package-description';
import { Timeline, TimelineProps } from './timeline';
import { AuthTaskType } from './types';

interface PackageDetailsProps extends TimelineProps {
  packageId: number;
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
}

export const PackageDetails = ({
  packageId,
  title,
  authTasks,
  assets,
  description,
  cooldownTime,
  lastRequestDate,
  lastRequestStatus,
}: PackageDetailsProps) => {
  const hasPackageSelected = Boolean(packageId && title && title.trim() !== '');
  const hasAuth = Array.isArray(authTasks) && authTasks.length > 0;
  const hasAssets = Array.isArray(assets) && assets.length > 0;
  const hasDescription = Boolean(description && description.trim() !== '');

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

      {/* timeline - only show if cooldownTime is not 0 */}
      {cooldownTime !== '0' && (
        <Timeline cooldownTime={cooldownTime} lastRequestDate={lastRequestDate} lastRequestStatus={lastRequestStatus} />
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
      <Dialog>
        <DialogTrigger className='self-center'>
          <ClaimButton className='mt-6 self-center' />
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className='flex items-center justify-center overflow-visible border-none bg-transparent p-0 shadow-none'
        >
          <ClaimModal packageId={packageId} packageName={title} assets={assets} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
