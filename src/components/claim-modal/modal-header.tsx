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
      <div className='flex w-full max-w-[310px] items-center justify-center overflow-hidden px-4'>
        <span className='flex-shrink-0 text-[18px] font-extrabold text-gray-800 dark:text-[#AAA]'>Claiming&nbsp;</span>
        <span className='min-w-0 truncate text-[20px] font-extrabold text-ellipsis' title={packageName}>
          {packageName} Package
        </span>
      </div>

      {/* description */}
      <div className='w-full max-w-[310px] px-4'>
        <span className='block h-auto truncate text-start text-[13px] font-light'>This package includes:</span>
      </div>
    </div>
  );
};

export default ModalHeader;
