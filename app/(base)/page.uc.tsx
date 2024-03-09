'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';

import { useGetMeQuery } from '@/app/redux/api/me';

import { LogOutButton } from '@/app/components/ui/button';

import scss from '@/app/components/scss/page.module.scss';

export default function HomeClient() {
  const router = useRouter();

  const { data: me, isLoading } = useGetMeQuery();

  if (!me && !isLoading) {
    deleteCookie('session-middleware');
    router.push('/login');
  }

  if (me && !isLoading) {
    const session = getCookie('session-middleware');
    if (session) {
      router.push(`https://sherbolotarbaev.pro/redirect?token=${session}`);
    }
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
