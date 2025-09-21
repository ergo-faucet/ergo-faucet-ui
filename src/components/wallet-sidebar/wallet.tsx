import Image from 'next/image';

import { cn } from '@/lib/utils';

interface WalletProps {
  name: string;
  src?: string;
  alt: string;
  size: number;
  selected: boolean;
  onClick?: () => void;
}

const Wallet = ({ name, src, alt, size, selected, onClick }: WalletProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex h-14 w-70 cursor-pointer items-center justify-between rounded-[19px] border bg-transparent p-2 pr-3',
        selected ? 'border-green-400' : 'border-gray-600',
      )}
    >
      <div className='flex items-center justify-center space-x-2'>
        {src ? (
          <Image src={src} alt={alt} width={size} height={size} />
        ) : (
          <div
            className={cn('rounded-full', selected ? 'bg-gray-500' : 'bg-[#6D6D6D]')}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        )}
        <span className='text-[17px] tracking-wider text-black dark:text-white'>{name}</span>
      </div>

      <div
        className={cn(
          'h-5 w-5 rounded-full border',
          selected ? 'bg-green-1000 border-green-400' : 'border-gray-500 bg-gray-500',
        )}
      />
    </div>
  );
};

export default Wallet;
