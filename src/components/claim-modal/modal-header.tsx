import { inter } from '@/fonts';

interface ModalHeaderProps {
  packageName: string;
}

const ModalHeader = ({ packageName }: ModalHeaderProps) => {
  return (
    // container
    <div
      className={`${inter.className} mt-6 flex h-15 w-full flex-col items-center justify-start gap-y-2 text-[16px]
        text-black dark:text-white`}
    >
      {/* title */}
      <div className='flex w-full items-baseline gap-1 px-6'>
        <span className='shrink-0 text-start text-[18px] font-extrabold text-gray-800 dark:text-[#AAA]'>Claiming </span>
        <span className='min-w-0 flex-1 truncate text-start text-[20px] font-extrabold'>{packageName}</span>
        <span className='shrink-0 text-start text-[20px] font-extrabold'> Package</span>
      </div>

      {/* description */}
      <div>
        <span className='h-auto w-[310px] text-start text-[13px] font-light'>This package includes:</span>
      </div>
    </div>
  );
};

export default ModalHeader;
