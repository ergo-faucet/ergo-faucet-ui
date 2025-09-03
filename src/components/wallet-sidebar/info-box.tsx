interface InfoBoxProps {
  title: string;
  info: string;
}

export const InfoBox = ({ title, info }: InfoBoxProps) => {
  return (
    <div className='flex min-h-22 w-[273px] flex-col gap-2'>
      {/* title */}
      <p className='h-4.5 w-auto pl-3 text-[15px]'>{title}</p>

      {/* info container */}
      <div
        className='dark:bg-gray-1000 h-full w-full rounded-[10px] bg-gray-100 p-3 break-words text-black
          dark:text-white'
      >
        {info}
      </div>
    </div>
  );
};
