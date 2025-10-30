import { ScrollArea } from '@/components/ui/scroll-area';
import { inter } from '@/fonts';
import { cn } from '@/lib';

interface PackageDescriptionProps {
  info: string;
  className?: string;
}

const PackageDescription = ({ info, className }: PackageDescriptionProps) => {
  const isScrollable = info.length > 250;

  return (
    <div className={cn('flex min-h-[70px] w-full flex-col items-start justify-start gap-2', className)}>
      <span className='text-[15px] font-extrabold text-gray-700 dark:text-gray-200'>Description</span>

      <div className='min-h-[45px] w-full rounded-[5px] bg-gray-200 text-black dark:bg-gray-900 dark:text-white'>
        {isScrollable ? (
          <ScrollArea
            className={cn(
              'h-24 w-full rounded-[5px]',
              // custom scrollbar colors
              '[&_[data-orientation=vertical]_>div]:bg-gray-700',
              'dark:[&_[data-orientation=vertical]_>div]:bg-gray-300',
            )}
          >
            <div className={`${inter.className} mx-2 my-1.5 pr-2 text-[10px]`}>{info}</div>
          </ScrollArea>
        ) : (
          <div className={`${inter.className} mx-2 my-1.5 text-[10px]`}>{info}</div>
        )}
      </div>
    </div>
  );
};

export default PackageDescription;
