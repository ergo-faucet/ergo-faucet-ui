import { MainGrid } from '@/components/main-grid/main-grid';
import Navbar from '@/components/navbar/navbar';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  return (
    <div className='flex min-h-screen w-screen flex-col gap-y-6.5'>
      <Navbar walletType={'nautilus'} />
      <MainGrid />
      <Toaster />
    </div>
  );
}
