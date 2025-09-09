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
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
}

export const PackageDetails = ({
  title,
  authTasks,
  assets,
  description,
  cooldownTime,
  lastRequestDate,
  lastRequestStatus,
}: PackageDetailsProps) => {
  return (
    // container
    <div
      className='dark:bg-gray-1000 flex w-83 flex-col items-start justify-center gap-y-6 rounded-[22px] border
        border-gray-400 bg-gray-100 px-5 pb-8 dark:border-gray-700'
    >
      {/* header */}
      <span className={cn('mt-8 block w-full text-center text-[24px]', volkhov.className)}>{title}</span>

      {/* timeline */}
      <Timeline cooldownTime={cooldownTime} lastRequestDate={lastRequestDate} lastRequestStatus={lastRequestStatus} />

      {/* auth tasks */}
      <PackageAuth title='Authentication Methods/Tasks' authTasks={authTasks} />

      {/* assets */}
      <PackageAssets assets={assets} />

      {/* description */}
      <PackageDescription className='-mt-5' info={description} />

      {/* click to claim button */}
      <Dialog>
        <DialogTrigger className='self-center'>
          <ClaimButton className='mt-6 self-center' />
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          // remove its dialog looks, so only the claim modal is shown
          className='flex items-center justify-center overflow-visible border-none bg-transparent p-0 shadow-none'
        >
          <ClaimModal packageName={title} assets={assets} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
