import { FaDiscord } from 'react-icons/fa';

const DiscordIcon = () => {
  return (
    <div className='size-[34px] bg-white rounded-full flex items-center justify-center'>
      <div
        className={`size-8 bg-[#5865F2] flex items-center justify-center rounded-full`}
      >
        <FaDiscord size={27} color='white'></FaDiscord>
      </div>
    </div>
  );
};

export default DiscordIcon;
