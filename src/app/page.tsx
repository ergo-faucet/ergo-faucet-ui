import ModalHeader from '@/components/claim-modal/modal-header';
import ToggleThemeButton from '@/components/navbar/toggle-theme-button';
import AuthTask from '@/components/package-details/auth-task';

export default function Home() {
  // temp div for testing purposes
  return (
    <div className='flex h-[466px] w-[387px] items-center justify-center space-x-5 bg-white dark:bg-black'>
      <ToggleThemeButton />
      <ModalHeader packageName='Nice Name' />
    </div>
  );
}
