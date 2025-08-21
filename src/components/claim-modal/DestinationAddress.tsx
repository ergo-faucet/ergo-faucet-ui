import { useState } from 'react';

import { cn } from '@/lib';

interface DestinationAddressProps {
  className?: string;
}

export const DestinationAddress = ({ className }: DestinationAddressProps) => {
  const [destAddress, setDestAddress] = useState('');

  return (
    <div className={cn('relative h-[51px] w-full max-w-lg bg-inherit', className)}>
      <span className='absolute -top-2 left-8 z-1 bg-inherit px-4 text-[10px] text-black dark:text-white'>
        Destination Address
      </span>

      {/* borders (underneath) */}
      <div className='relative rounded-md border border-black bg-transparent pt-6 pb-3 pl-3 dark:border-white'>
        {/* destination address */}
        <input
          className='w-full resize-none border-none bg-transparent outline-none'
          value={destAddress}
          onChange={(e) => setDestAddress(e.target.value)}
        />
      </div>
    </div>
  );
};
