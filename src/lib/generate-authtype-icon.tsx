import DiscordIcon from '@/components/icons/discord';
import GoogleIcon from '@/components/icons/google';
import { AuthType } from '@/types';

// helper component for icon text
const IconText = ({ text }: { text: string }) => {
  return <span className='pl-2.5 text-sm font-semibold tracking-wider text-gray-700 dark:text-gray-50'>{text}</span>;
};
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
          <IconText text='Google' />
        </>
      );
    case 'discord':
      return (
        <>
          <DiscordIcon />
          <IconText text='Discord' />
        </>
      );
    default:
      return null;
  }
};

export { GenerateAuthTypeIcon };
