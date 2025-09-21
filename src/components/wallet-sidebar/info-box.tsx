import { jetBrainsMono } from '@/fonts';
import { cn } from '@/lib';

interface InfoBoxProps {
  title: string;
  info: string;
}

export const InfoBox = ({ title, info }: InfoBoxProps) => {
  return (
    <div
      className={cn(
        'flex min-h-22 w-full flex-col gap-2 text-[11px] text-gray-700 dark:text-gray-300',
        jetBrainsMono.className,
      )}
    >
      {/* title */}
      <p className='h-4.5 w-auto pl-3 text-[15px]'>{title}</p>

      {/* info container */}
      <div className='dark:bg-gray-1000 h-full w-full rounded-[10px] bg-gray-100 p-3 break-words'>{info}</div>
    </div>
  );
};
