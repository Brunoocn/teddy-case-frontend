// import NavPath from '@/components/navPath';
// import PageHeader from '@/components/header';
// import PageNavbar from '@/components/navbar';
import PageHeader from '@/components/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teddy - Manager',
  description: 'Teddy paiper',
};

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader />
      {/* <PageNavbar />
      <NavPath /> */}
      <main className='mx-[100px] mt-[24px]'>{children}</main>
    </>
  );
}
