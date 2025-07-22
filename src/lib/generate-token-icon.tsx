interface GenerateTokenIconProps {
  name: string;
}

const GenerateTokenIcon = ({ name }: GenerateTokenIconProps) => {
  return (
    <div
      className='size-5 rounded-full bg-gradient-to-br from-gray-200 to-gray-500 text-center text-[13px] text-red-600'
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export { GenerateTokenIcon };
