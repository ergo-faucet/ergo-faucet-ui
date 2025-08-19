import DiscordIcon from '@/components/icons/discord';
import GoogleIcon from '@/components/icons/google';
import { AuthType } from '@/types';

/**
 * Renders the appropriate authentication provider icon and label based on the given auth type.
 * @param props.authType - The authentication provider type.
 * @returns A JSX element containing the provider's icon and label, or null if the auth type is unsupported.
 */
const GenerateAuthTypeIcon = ({ authType }: { authType: AuthType }) => {
  switch (authType) {
    case 'google':
      return (
        <>
          <GoogleIcon />
          <span className='pl-2.5 text-sm font-semibold tracking-wider text-black'>Google</span>
        </>
      );
    case 'discord':
      return (
        <>
          <DiscordIcon />
          <span className='pl-2.5 text-sm font-semibold tracking-wider text-black'>Discord</span>
        </>
      );
    default:
      return null;
  }
};

export { GenerateAuthTypeIcon };
