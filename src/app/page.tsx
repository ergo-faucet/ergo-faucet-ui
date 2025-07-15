import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import AuthTask from '@/components/package-details/auth-task';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-screen items-center justify-center space-x-5 bg-gray-500 dark:bg-dark-green-ergo-navbar'>
      <ToggleThemeButton />
      <AuthTask title='Github' authType='discord' isCompleted={false} />
      <AuthTask title='Google' authType='google' isCompleted={true} />
    </div>
  );
}
