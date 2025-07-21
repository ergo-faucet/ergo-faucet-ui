import { inter } from '@/fonts';

interface ModalHeaderProps {
  packageName: string;
}

const ModalHeader = ({ packageName }: ModalHeaderProps) => {
  return (
    // container
    <div
      className={`${inter.className} mt-7 flex h-full w-full flex-col items-center justify-center gap-y-4 text-center
        text-[16px] text-black dark:text-white`}
    >
      {/* title */}
      <span className='h-auto w-71 font-extrabold'>Claiming {packageName} Package</span>

      {/* description */}
      <div>
        <span className='h-auto w-[310px] text-[12px] font-light'>
          you are about to claim the package &quot;{packageName}&quot;
        </span>
        <br />
        <span className='h-auto w-[310px] text-[12px] font-light'>this package includes following packages:</span>
      </div>
    </div>
  );
};

export default ModalHeader;
