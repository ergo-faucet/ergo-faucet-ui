import LoginButton from '@/components/navbar/login-button';
import ToggleThemeButton from '@/components/navbar/toggle-theme-button';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center space-x-5 bg-white'>
      <ToggleThemeButton />
      <LoginButton text='Log In' />
    </div>
  );
}
