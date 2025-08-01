import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import Package from '@/components/package/package';
import { Asset, AuthType } from '@/types';

const assets: Asset[] = [
  {
    name: 'ergo token',
    amount: 5101,
    decimal: 2,
    tokenId: '8c81329fafafegag',
  },
  {
    name: 'ergo token1',
    amount: 5101,
    decimal: 2,
    tokenId: 'fajfajfnagnhai',
  },
  {
    name: 'ergo token2',
    amount: 5101,
    decimal: 2,
    tokenId: 'fafafegrvvee',
  },
  {
    name: 'ergo token3',
    amount: 5101,
    decimal: 2,
    tokenId: 'ninnhrhfbbhbhbh',
  },
  {
    name: 'ergo token4',
    amount: 5101,
    decimal: 2,
    tokenId: 'rbhrkibibrbbri',
  },
  {
    name: 'ergo token5',
    amount: 5101,
    decimal: 2,
    tokenId: 'ukrsgtrsuut',
  },
  {
    name: 'ergo token6',
    amount: 5101,
    decimal: 2,
    tokenId: 'kyktdgfsgsgsg',
  },
  {
    name: 'ergo token7',
    amount: 5101,
    decimal: 2,
    tokenId: 'dfcgdrgv',
  },
  {
    name: 'ergo token8',
    amount: 5101,
    decimal: 2,
    tokenId: 'gagrhsgrdg',
  },
];
const authTypes: AuthType[] = ['discord', 'google'];

export default function Home() {
  const date = new Date();
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center gap-5 bg-white dark:bg-black'>
      <ToggleThemeButton />
      <Package
        title='Nice Package Name up to 60 characters'
        authTypes={authTypes}
        assets={assets}
        startDate={date}
        endDate={date}
      />
    </div>
  );
}
