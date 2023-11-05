import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '../components/Header.tsx';

export default function Layout() {
  return (
    <main className='h-full w-full overflow-auto bg-card-4'>
      <Header />
      <Suspense fallback={<p>loading</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
