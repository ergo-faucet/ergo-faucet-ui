import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import Package from '@/components/package/package';

export default function Home() {
  return (
    <div className='flex h-screen items-center justify-center gap-20'>
      <ToggleThemeButton />

      <Package
        title='Nice Package Name up to 60 characters'
        assets={[
          { amount: 30013n, decimal: 3, name: 'Ergo token', tokenId: 'faifijuajfuahifhiwabf' },
          { amount: 30013n, decimal: 3, name: 'Ergo token2', tokenId: 'faifijuajfuahifhiwabf' },
          { amount: 30013n, decimal: 3, name: 'Ergo token2', tokenId: 'faifijuajfuahifhiwabf' },
          { amount: 30013n, decimal: 3, name: 'Ergo token2', tokenId: 'faifijuajfuahifhiwabf' },
          { amount: 30013n, decimal: 3, name: 'Ergo token2', tokenId: 'faifijuajfuahifhiwabf' },
          { amount: 30013n, decimal: 3, name: 'Ergo token2', tokenId: 'faifijuajfuahifhiwabf' },
          { amount: 30013n, decimal: 3, name: 'Ergo token2', tokenId: 'faifijuajfuahifhiwabf' },
          { amount: 30013n, decimal: 3, name: 'Ergo token', tokenId: 'faifijuajfuahifhiwabf' },
          { amount: 30013n, decimal: 3, name: 'Ergo token', tokenId: 'faifijuajfuahifhiwabf' },
        ]}
        authTypes={['discord', 'google']}
        startDate={new Date('2020-12-01')}
        endDate={new Date('2020-12-01')}
      />
    </div>
  );
}
