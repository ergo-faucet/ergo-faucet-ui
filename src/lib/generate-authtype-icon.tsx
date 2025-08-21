import DiscordIcon from '@/components/icons/discord';
import GoogleIcon from '@/components/icons/google';
import { inter } from '@/fonts';
import { AuthType } from '@/types';

// helper component for icon text
const IconText = ({ text }: { text: string }) => {
  return (
    <span className={`${inter.className} pl-2.5 text-sm font-semibold tracking-wider text-gray-700 dark:text-gray-50`}>
      {text}
    </span>
  );
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
        <div className='flex items-center'>
          <GoogleIcon />
          <IconText text='Google' />
        </div>
      );
    case 'discord':
      return (
        <div className='flex items-center'>
          <DiscordIcon />
          <IconText text='Discord' />
        </div>
      );
    default:
      return null;
  }
};

export { GenerateAuthTypeIcon };
