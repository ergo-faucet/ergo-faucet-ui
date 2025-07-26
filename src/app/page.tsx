import SortBy from '@/components/navbar/sort-by';
import ToggleThemeButton from '@/components/navbar/toggle-theme-button';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center space-x-5 bg-white dark:bg-black'>
      <ToggleThemeButton />
      <SortBy />
    </div>
  );
}
