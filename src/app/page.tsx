import LeftNavbar from '@/components/navbar/left-navbar';
import ToggleThemeButton from '@/components/navbar/toggle-theme-button';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center gap-x-10 bg-amber-400'>
      <ToggleThemeButton />
      <LeftNavbar />
    </div>
  );
}
