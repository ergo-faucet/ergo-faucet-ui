import { inter } from '@/fonts';

export const ClickToCompleteButton = () => {
  return (
    <button
      className={`${inter.className} mr-0.5 h-4.5 w-20 rounded-[5px] bg-green-600 text-[8px] font-semibold
        tracking-wider text-[#EBEBE5] shadow-[-1px_1px_4px_rgba(0,0,0,0.2)]/40 shadow-black hover:bg-green-700
        dark:bg-green-800 dark:hover:bg-green-900`}
    >
      Click to complete
    </button>
  );
};
