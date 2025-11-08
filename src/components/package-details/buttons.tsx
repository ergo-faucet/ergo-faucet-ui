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
}

export const ClaimButton = ({ className }: ClaimButtonProps) => {
  return (
    <button
      className={cn(
        `flex h-10.5 w-42.5 cursor-pointer items-center justify-center rounded-[12px] border border-green-400
        bg-green-700 text-[18px] leading-none font-extrabold tracking-wider text-white
        shadow-[-2px_2px_6px_0_rgba(0,0,0)]/20 shadow-black select-none hover:bg-green-900`,
        inter.className,
        className,
      )}
    >
      Claim Package
    </button>
  );
};
