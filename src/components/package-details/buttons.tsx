import { inter } from '@/fonts';
import { cn } from '@/lib';

export const ClickToCompleteButton = ({ handleOnClick }: { handleOnClick: () => void }) => {
  return (
    <span
      role='button'
      tabIndex={0}
      onClick={handleOnClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOnClick();
        }
      }}
      className={`${inter.className} mr-0.5 inline-flex h-4.5 w-20 cursor-pointer items-center justify-center
        rounded-[5px] bg-green-600 text-[8px] font-semibold tracking-wider text-[#EBEBE5]
        shadow-[-1px_1px_4px_rgba(0,0,0,0.2)]/40 shadow-black select-none hover:bg-green-700 dark:bg-green-800
        dark:hover:bg-green-900`}
    >
      Click to complete
    </span>
  );
};

interface ClaimButtonProps {
  className?: string;
  disabled?: boolean;
}

export const ClaimButton = ({ className, disabled }: ClaimButtonProps) => {
  return (
    <span
      role='button'
      tabIndex={disabled ? -1 : 0}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onKeyDown={(e) => {
        if (disabled || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
      className={cn(
        `inline-flex h-10.5 w-42.5 items-center justify-center rounded-[12px] border text-[18px] leading-none
        font-extrabold tracking-wider text-white shadow-[-2px_2px_6px_0_rgba(0,0,0)]/20 shadow-black select-none
        focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2`,
        disabled
          ? 'cursor-not-allowed border-gray-400 bg-gray-500'
          : 'cursor-pointer border-green-400 bg-green-700 hover:bg-green-900',
        inter.className,
        className,
      )}
    >
      Claim Package
    </span>
  );
};
