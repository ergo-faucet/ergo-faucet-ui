import { MainGrid } from '@/components/main-grid';
import Navbar from '@/components/navbar/navbar';

export default function Home() {
  return (
    <div className='flex w-full flex-col gap-y-6.5'>
      <Navbar className='px-12' walletType={'nautilus'} />
      <MainGrid className='px-8' />
    </div>
  );
}
