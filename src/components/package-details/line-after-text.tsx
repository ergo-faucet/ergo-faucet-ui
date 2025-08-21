interface LineAfterTextProps {
  text: string;
}

export const LineAfterText = ({ text }: LineAfterTextProps) => {
  return (
    <div
      className='relative mb-2 flex h-full w-full flex-nowrap items-start justify-start text-[15px] font-extrabold
        whitespace-nowrap text-gray-900 after:mt-3 after:ml-3 after:block after:h-0.5 after:w-full after:bg-gray-900
        dark:text-gray-200 dark:after:bg-gray-200'
    >
      {text}
    </div>
  );
};
