interface DestinationAddressProps {
  destAddress: string;
}

export const DestinationAddress = ({ destAddress }: DestinationAddressProps) => {
  return (
    <div className='relative w-full max-w-lg gap-9.5 bg-inherit'>
      <span className='absolute -top-3 left-0 z-1 bg-inherit px-2 text-gray-700'>Destination Address</span>

      <div className='relative rounded-md border border-gray-500 bg-transparent pt-6 pb-3 pl-3'>
        {/* destination address */}
        <div className='w-full resize-none border-none bg-transparent outline-none'>{destAddress}</div>

        <span className='absolute top-0 left-0 h-3 w-px bg-gray-200'></span>
      </div>
    </div>
  );
};
