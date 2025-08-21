export const ClaimModalButtons = () => {
  return (
    <div className='flex h-full w-full items-center justify-end gap-4 p-[31px]'>
      <button className='cursor-pointer text-[16px] font-semibold'>Cancel</button>
      <button
        className='h-[37px] w-[87px] cursor-pointer rounded-[10px] bg-green-700 text-[16px] font-semibold
          hover:bg-green-800'
      >
        Confirm
      </button>
    </div>
  );
};
