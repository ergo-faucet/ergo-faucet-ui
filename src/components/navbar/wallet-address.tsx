import * as React from 'react';

import { volkhov } from '@/fonts';
import { cn, GenerateWalletIcon } from '@/lib';
import { WalletType } from '@/types';

interface WalletAddressProps extends React.ComponentProps<'button'> {
  walletAddress: string;
  walletType: WalletType;
}

const WalletAddress = React.forwardRef<HTMLButtonElement, WalletAddressProps>(
  ({ walletAddress, walletType, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          `${volkhov.className} dark:bg-gray-1000 flex h-12.5 w-45 cursor-pointer items-center justify-between
          rounded-[15px] border border-gray-500 bg-gray-100 pr-1.5 pl-3.5`,
          className,
        )}
        {...props}
      >
        <span className='block max-w-[105px] truncate text-sm text-gray-800 dark:text-gray-500'>{walletAddress}</span>

        <GenerateWalletIcon walletType={walletType} />
      </button>
    );
  },
);

WalletAddress.displayName = 'WalletAddress';

export default WalletAddress;
