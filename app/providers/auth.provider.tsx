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

  if (me) {
    setCookie('email', me.email);
  }

  if (me && !me.isVerified && pathname !== '/email-verification') {
    return redirect('/email-verification');
  }

  if (me && me.isVerified && pathname === '/email-verification') {
    return redirect('/');
  }

  if (!me && pathname === '/email-verification') {
    return redirect('/login');
  }

  if (
    me &&
    (pathname === '/login' ||
      pathname === '/password/forgot' ||
      pathname === '/password/reset')
  ) {
    return redirect(`/redirect?to=${encodeURIComponent(next)}`);
  }

  if (me && pathname === '/oauth') {
    return redirect(`/redirect?to=https://sherbolotarbaev.pro/redirect?token=${token}`);
  }

  return children;
}
