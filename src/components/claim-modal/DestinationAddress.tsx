import { useState, useEffect } from 'react';

import { cn } from '@/lib';

interface DestinationAddressProps {
  className?: string;
  onValidationChange?: (isValid: boolean) => void;
}

export const DestinationAddress = ({ className, onValidationChange }: DestinationAddressProps) => {
  const [destAddress, setDestAddress] = useState('');

  // TODO: actually validate it
  const isValidAddress = destAddress.trim().length > 10;

  useEffect(() => {
    onValidationChange?.(isValidAddress);
  }, [isValidAddress, onValidationChange]);

  const showError = destAddress.trim().length > 0 && !isValidAddress;

  return (
    // container
    <div className={cn('relative h-[51px] w-full max-w-lg bg-inherit', className)}>
      {/* label */}
      <span
        className={cn(
          'absolute -top-2 left-8 z-1 bg-inherit px-4 text-[10px]',
          showError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
        )}
      >
        Destination Address
      </span>

      {/* borders */}
      <div
        className={cn(
          'relative rounded-md border bg-transparent pt-6 pb-3 pl-3',
          showError ? 'border-red-500 dark:border-red-400' : 'border-gray-700 dark:border-gray-300',
        )}
      >
        {/* input */}
        <input
          className={cn(
            'w-full resize-none border-none bg-transparent outline-none',
            showError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
          )}
          value={destAddress}
          onChange={(e) => setDestAddress(e.target.value)}
          placeholder='Enter destination address'
        />
      </div>
    </div>
  );
};
