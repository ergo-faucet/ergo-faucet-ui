import { NautilusIcon } from '@/components/icons/nautilus';
import { WalletType } from '@/types';

/**
 * Renders the appropriate wallet provider icon based on the given wallet type.
 * @param props.walletType - The wallet type.
 * @returns A JSX element containing the provider's icon, or null if the wallet type is unsupported.
 */
const GenerateWalletIcon = ({ walletType }: { walletType: WalletType }) => {
  switch (walletType) {
    case 'nautilus':
      return <NautilusIcon />;
    default:
      return null;
  }
};

export { GenerateWalletIcon };
