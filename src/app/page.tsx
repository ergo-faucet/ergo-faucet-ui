import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import PackageAssets from '@/components/package-details/package-assets';
import { TokenDetailsTypes } from '@/types';

const tokens: TokenDetailsTypes[] = [
  {
    type: 'bitcoin',
    amount: 245,
    contractAddress: 'fi9413094i01i0i10rii1oro1ri',
    href: 'https://bitcoin.com',
  },
  {
    type: 'tether',
    amount: 12,
    contractAddress: '0f01i19ie1jfi1j0fj1ifj1i',
    href: 'https://tether.com',
  },
];

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center gap-5 bg-white dark:bg-black'>
      <ToggleThemeButton />
      <PackageAssets title={'Assets'} tokens={tokens} />
    </div>
  );
}
