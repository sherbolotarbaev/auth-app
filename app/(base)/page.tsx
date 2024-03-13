import { redirect } from 'next/navigation';

import { getMe } from '@/app/redux/api/me/server';

import HomeClient from './page.uc';

export default async function Home() {
  const meData = getMe();
  const me = await meData;
  if (me === 401) redirect('/login');

  return <HomeClient />;
}
