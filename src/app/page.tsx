import { MainGrid } from '@/components/main-grid';
import Navbar from '@/components/navbar/navbar';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col gap-y-6.5'>
      <Navbar className='px-12' walletType={'nautilus'} />
      <MainGrid className='flex-1 px-8 pb-4' />
    </div>
  );
}
