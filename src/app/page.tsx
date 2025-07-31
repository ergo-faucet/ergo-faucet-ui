import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import PackagePagination from '@/components/pagination/package-pagination';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center gap-x-10 bg-gray-300 dark:bg-gray-900'>
      <ToggleThemeButton />
      <PackagePagination />
    </div>
  );
}
