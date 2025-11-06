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
  const hasTitle = Boolean(title && title.trim() !== '');
  const hasAuth = Array.isArray(authTasks) && authTasks.length > 0;
  const hasAssets = Array.isArray(assets) && assets.length > 0;
  const hasDescription = Boolean(description && description.trim() !== '');

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
        {hasTitle ? title : 'Select a package to view details'}
      </span>

      {/* timeline */}
      <Timeline cooldownTime={cooldownTime} lastRequestDate={lastRequestDate} lastRequestStatus={lastRequestStatus} />

      {/* authentication section (always visible) */}
      <div className='w-full'>
        <PackageAuth title='Authentication Methods/Tasks' authTasks={hasAuth ? authTasks : []} />
        {!hasAuth && (
          <div className='mt-1 text-center text-sm text-gray-500 italic dark:text-gray-400'>
            No authentication tasks to show or select a package.
          </div>
        )}
      </div>

      {/* assets section (always visible) */}
      <div className='w-full'>
        <PackageAssets assets={hasAssets ? assets : []} />
        {!hasAssets && (
          <div className='mt-0.5 text-center text-sm text-gray-500 italic dark:text-gray-400'>
            No assets to show or select a package.
          </div>
        )}
      </div>

      {/* description section (always visible, placeholder inside) */}
      <div className='w-full'>
        <PackageDescription
          info={hasDescription ? description : 'No description provided or select a package to view details.'}
        />
      </div>

      {/* claim button */}
      {packageId ? (
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
      ) : (
        <div className='mt-4 self-center text-sm text-gray-500 italic dark:text-gray-400'>
          Select a package to claim rewards.
        </div>
      )}
    </div>
  );
};
