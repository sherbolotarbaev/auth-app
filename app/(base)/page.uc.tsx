'use client';

import { useGetMeQuery } from '@/app/redux/api/me';
import { deleteCookie } from 'cookies-next';

import { LogOutButton } from '@/app/components/ui/button';

import scss from '@/app/components/scss/page.module.scss';

export default function HomeClient() {
  const { data: me, isLoading } = useGetMeQuery();

  if (!me && !isLoading) {
    deleteCookie('session-middleware');
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
