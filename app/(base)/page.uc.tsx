'use client';

import { redirect } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

import { useGetMeQuery } from '@/app/redux/api/me';

import { LogOutButton } from '@/app/components/ui/button';

import scss from '@/app/components/scss/page.module.scss';

export default function HomeClient() {
  const { data: me, isLoading } = useGetMeQuery();

  if (!me && !isLoading) {
    deleteCookie('session-middleware');
    redirect('/login');
  }

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <h1>Hey {isLoading || !me ? 'bro' : me.firstName} 😎</h1>

          <LogOutButton />
        </div>
      </section>
    </>
  );
}
