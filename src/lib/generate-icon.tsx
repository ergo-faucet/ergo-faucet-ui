import DiscordIcon from '@/components/icons/discord';
import GoogleIcon from '@/components/icons/google';
import { authType } from '@/types';

const GenerateIcon = ({ authType }: { authType: authType }) => {
  switch (authType) {
    case 'google':
      return <GoogleIcon />;
      break;
    case 'discord':
      return <DiscordIcon />;
      break;
    default:
      return null;
  }
};

export default GenerateIcon;
