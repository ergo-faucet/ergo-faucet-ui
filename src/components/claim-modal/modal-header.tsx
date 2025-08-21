import { inter } from '@/fonts';

interface ModalHeaderProps {
  packageName: string;
}

const ModalHeader = ({ packageName }: ModalHeaderProps) => {
  return (
    // container
    <div
      className={`${inter.className} mt-6 flex h-[115px] w-full flex-col items-center justify-start gap-y-9 text-[16px]
        text-black dark:text-white`}
    >
      {/* title */}
      <div>
        <span className='text-start text-[18px] font-extrabold text-gray-800 dark:text-[#AAA]'>Claiming </span>
        <span className='text-start text-[20px] font-extrabold'>{packageName} Package</span>
      </div>

      {/* description */}
      <div>
        <p className='h-auto w-[310px] text-start text-[14px] font-light'>
          you are about to claim the package &quot;{packageName}&quot;
        </p>
        <span className='h-auto w-[310px] text-start text-[14px] font-light'>
          this package includes following packages:
        </span>
      </div>
    </div>
  );
};

export default ModalHeader;
