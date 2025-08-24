import { inter } from '@/fonts';

interface PackageDescriptionProps {
  info: string;
}

const PackageDescription = ({ info }: PackageDescriptionProps) => {
  return (
    <div className='flex min-h-[70px] w-full flex-col items-start justify-start gap-2'>
      <span className='text-[15px] font-extrabold text-gray-700 dark:text-gray-200'>Description</span>
      <div className='min-h-[45px] w-[263px] rounded-[5px] bg-gray-200 text-black dark:bg-gray-900 dark:text-white'>
        <div className={`${inter.className} mx-2 my-1.5 text-[10px]`}>{info}</div>
      </div>
    </div>
  );
};

export default PackageDescription;
