import Searchbar from '@/components/navbar/searchbar/searchbar';
import ToggleThemeButton from '@/components/navbar/toggle-theme-button';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center gap-x-10 bg-white dark:bg-black'>
      <ToggleThemeButton />
      <Searchbar />
    </div>
  );
}
