import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import TokenDetails from '@/components/package-details/token-details';
import { Asset } from '@/types';

const asset: Asset = {
  name: 'ergo token',
  amount: 27,
  decimal: 2,
  tokenId: '415i91fjiejf00jijfainfhhfafhoh',
};

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center gap-5 bg-white dark:bg-black'>
      <ToggleThemeButton />
      <TokenDetails asset={asset} />
    </div>
  );
}
