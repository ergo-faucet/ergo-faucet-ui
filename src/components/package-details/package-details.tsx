import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { volkhov } from '@/fonts';
import { cn } from '@/lib';
import { useAuthStore } from '@/lib/api/auth-store';
import { useConnectSidebarStore } from '@/store/connect-sidebar-store';
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
  const accessToken = useAuthStore((s) => s.accessToken);
  const openSidebar = useConnectSidebarStore((s) => s.open);
  return (
    // container
    <div
      className='dark:bg-gray-1000 flex h-full w-83 flex-col items-start justify-between gap-y-6 rounded-[22px] border
        border-gray-400 bg-gray-100 px-5 pb-8 dark:border-gray-700'
    >
      {/* header */}
      <span className={cn('mt-8 block w-full text-center text-[24px]', volkhov.className)}>{title}</span>

      {/* timeline */}
      <Timeline cooldownTime={cooldownTime} lastRequestDate={lastRequestDate} lastRequestStatus={lastRequestStatus} />

      {/* auth tasks */}
      <PackageAuth title='Authentication Methods/Tasks' authTasks={authTasks} />

      {/* assets */}
      <PackageAssets className='mb-6' assets={assets} />

      {/* description */}
      <PackageDescription className='-mt-5' info={description} />

      {/* click to claim button */}
      <Dialog>
        <DialogTrigger
          onClick={(e) => {
            if (!accessToken) {
              e.preventDefault();
              openSidebar();
            }
          }}
          className='self-center'
        >
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
