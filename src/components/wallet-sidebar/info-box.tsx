interface InfoBoxProps {
  title: string;
  info: string;
}

export const InfoBox = ({ title, info }: InfoBoxProps) => {
  return (
    <>
      {/* container */}
      <div className='h-22 w-[273px]'>
        {/* title */}
        <span className='h-4.5 w-30 text-center text-[15px]'>{title}</span>

        <div className='h-full w-full p-3'>{info}</div>
      </div>
    </>
  );
};
