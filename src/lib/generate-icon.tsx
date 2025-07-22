import DiscordIcon from '@/components/icons/discord';
import GoogleIcon from '@/components/icons/google';
import { AuthType } from '@/types';

const GenerateIcon = ({ authType }: { authType: AuthType }) => {
  switch (authType) {
    case 'google':
      return (
        <>
          <GoogleIcon />
          <span className='pl-2.5 text-sm font-semibold tracking-wider text-black'>Google</span>
        </>
      );
      break;
    case 'discord':
      return (
        <>
          <DiscordIcon />
          <span className='pl-2.5 text-sm font-semibold tracking-wider text-black'>Discord</span>
        </>
      );
      break;
    default:
      return null;
  }
};

export default GenerateIcon;
