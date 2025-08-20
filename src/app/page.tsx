import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import AuthTask from '@/components/package-details/auth-task';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flexitems-center dark:bg-gray-1000 h-screen justify-center space-x-5 bg-gray-100'>
      <ToggleThemeButton />
      <AuthTask title='Github' authType='discord' isCompleted={false} />
      <AuthTask title='Google' authType='google' isCompleted={true} />
    </div>
  );
}
