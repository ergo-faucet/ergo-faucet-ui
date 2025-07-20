import Searchbar from '@/components/navbar/searchbar';
import ToggleThemeButton from '@/components/navbar/toggle-theme-button';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center bg-white'>
      <ToggleThemeButton />
      <Searchbar />
    </div>
  );
}
