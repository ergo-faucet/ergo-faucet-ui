import { FaDiscord } from 'react-icons/fa';

const DiscordIcon = () => {
  return (
    <div className='flex size-[34px] items-center justify-center rounded-full bg-white'>
      <div className={'flex size-8 items-center justify-center rounded-full bg-[#5865F2]'}>
        <FaDiscord size={27} color='white'></FaDiscord>
      </div>
    </div>
  );
};

export default DiscordIcon;
