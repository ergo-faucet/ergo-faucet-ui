import { Badge } from '@/components/ui/badge';

import { LastRequestStatus } from './types';

interface StatusBadgeProps {
  status: LastRequestStatus | undefined;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (!status) return;
  switch (status) {
    case 'success':
      return (
        <Badge className='text-green-1000 bg-green-300 dark:border dark:border-green-900 dark:bg-green-100'>
          Success
        </Badge>
      );
    case 'pending':
      return <Badge className='bg-[#7A7A7A] text-black dark:bg-[#D9D9D9] dark:text-[#7A7A7A]'>Pending</Badge>;
      return;
    case 'rejected':
      return <Badge className='bg-[#FF9D9D] text-[#770707] dark:border dark:border-[#770707]'>Rejected</Badge>;
  }
};
