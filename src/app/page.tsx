import { MainGrid } from '@/components/main-grid';
import Navbar from '@/components/navbar/navbar';

export default function Home() {
  return (
    <div className='ml-40 flex w-full flex-col'>
      <Navbar walletType={'nautilus'} />
      <MainGrid />
    </div>
  );
}
