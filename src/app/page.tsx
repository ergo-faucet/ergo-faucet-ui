import { MainGrid } from '@/components/main-grid';
import Navbar from '@/components/navbar/navbar';

export default function Home() {
  return (
    <div className='flex min-h-screen w-screen flex-col gap-y-6.5'>
      <Navbar walletType={'nautilus'} />
      <MainGrid className='flex-1 px-8 pb-4' />
    </div>
  );
}
