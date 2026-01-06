import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string | undefined;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (!status) return;
  switch (status) {
    case 'paid':
    case 'submitted':
      return (
        <Badge className='text-green-1000 bg-green-300 dark:border dark:border-green-900 dark:bg-green-100'>
          {status === 'paid' ? 'Paid' : 'Submitted'}
        </Badge>
      );
    case 'pending':
      return <Badge className='bg-[#7A7A7A] text-black dark:bg-[#D9D9D9] dark:text-[#7A7A7A]'>Pending</Badge>;
    case 'failed':
      return <Badge className='bg-[#FF9D9D] text-[#770707] dark:border dark:border-[#770707]'>Failed</Badge>;
    default:
      return <Badge className='bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300'>{status}</Badge>;
  }
};
