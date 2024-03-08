'use client';

import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useGetMeQuery } from '@/app/redux/api/me';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Readonly<Props>) {
  const { data: me } = useGetMeQuery();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const next = decodeURIComponent(searchParams.get('next') ?? '/');
  const token = decodeURIComponent(searchParams.get('token') ?? '/');

  switch (true) {
    case !!me && !me.isVerified && pathname !== '/email-verification':
      redirect('/email-verification');

    case !!me && me.isVerified && pathname === '/email-verification':
      redirect('/');

    case !me && pathname === '/email-verification':
      redirect('/login');

    case !!me &&
      (pathname === '/login' ||
        pathname === '/password/forgot' ||
        pathname === '/password/reset'):
      redirect(`/redirect?to=${encodeURIComponent(next)}`);

    case !!me && pathname === '/oauth':
      redirect(`/redirect?to=https://sherbolotarbaev.pro/redirect?token=${token}`);

    case !me &&
      pathname !== '/login' &&
      pathname !== '/password/forgot' &&
      pathname !== '/password/reset':
      const redirectUrl =
        pathname !== '/' ? `/login?next=${decodeURIComponent(pathname)}` : '/login';
      redirect(redirectUrl);

    default:
      if (me) {
        setCookie('email', me.email);
      }
      return children;
  }
}
