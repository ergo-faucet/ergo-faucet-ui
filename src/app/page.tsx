import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import TokenDetails from '@/components/package-details/token-details';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center gap-5 bg-white dark:bg-black'>
      <ToggleThemeButton />
      <TokenDetails
        type='bitcoin'
        amount={20}
        href='http://test.com'
        contractAddress='9812daaaaafiajfiajffaofafase1'
        key={12}
      />
      <TokenDetails type='tether' amount={20} href='http://test.com' contractAddress='9812dse1' key={12} />
    </div>
  );
}
