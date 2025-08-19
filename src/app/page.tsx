import AssetTable from '@/components/claim-modal/asset-details';
import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import { Asset } from '@/types';

const assets: Asset[] = [
  { amount: 12n, decimal: 1, name: 'Ergo token', tokenId: 'fioairijfafajnfs' },
  { amount: 50n, decimal: 3, name: 'Ergo token2', tokenId: 'foijafj9jf9afuafsmfiofajfj0jf0ja0idadomadjsuf09a0' },
];
export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center space-x-5 bg-white dark:bg-black'>
      <ToggleThemeButton />
      <AssetTable assets={assets} />
    </div>
  );
}
