import { MainGrid } from '@/components/main-grid';
import Navbar from '@/components/navbar/navbar';

export default function Home() {
  return (
    <div className='m-4 flex w-full flex-col'>
      <Navbar walletAddress={''} walletType={'nautilus'} />
      <MainGrid />
    </div>
  );
}
