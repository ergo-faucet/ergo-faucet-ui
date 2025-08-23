import { volkhov } from '@/fonts';
import { cn } from '@/lib';
import { Asset } from '@/types';

import PackageAssets from './package-assets';
import { PackageAuth } from './package-auth';
import PackageDescription from './package-description';
import { Timeline } from './timeline';
import { AuthTaskType } from './types';

interface PackageDetailsProps {
  title: string;
  authTasks: AuthTaskType[];
  assets: Asset[];
  description: string;
}

export const PackageDetails = ({ title, authTasks, assets, description }: PackageDetailsProps) => {
  return (
    // container
    <div className=''>
      {/* header */}
      <span className={cn('mt-8', volkhov.className)}>{title}</span>

      {/* timeline */}
      <Timeline />

      {/* auth tasks */}
      <PackageAuth title='Authentication Methods/Tasks' authTasks={authTasks} />

      {/* assets */}
      <PackageAssets assets={assets} />

      {/* description */}
      <PackageDescription info={description} />
    </div>
  );
};
