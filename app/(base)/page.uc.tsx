'use client';

import { redirect, usePathname } from 'next/navigation';
import { useGetMeQuery } from '@/app/redux/api/me';

import { LogOutButton } from '@/app/components/ui/button';

import scss from '@/app/components/scss/page.module.scss';

export default function HomeClient() {
  const { data: me, isLoading } = useGetMeQuery();

  const pathname = usePathname();

  const redirectUrl =
    pathname !== '/' ? `/login?next=${decodeURIComponent(pathname)}` : '/login';

  if (!me) {
    return redirect(redirectUrl);
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
