'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

import { useGetMeQuery } from '@/app/redux/api/me';

import { LogOutButton } from '@/app/components/ui/button';

import scss from '@/app/components/scss/page.module.scss';

export default function HomeClient() {
  const router = useRouter();

  const { data: me, isLoading } = useGetMeQuery();

  React.useEffect(() => {
    if (!me && !isLoading) {
      deleteCookie('session-middleware');
      router.push('/login');
    }
  }, [me, isLoading, router]);

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
