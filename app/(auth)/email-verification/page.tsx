import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import { getMe } from '@/app/redux/api/me/server';

import EmailVerificationClient from './page.uc';

export const metadata: Metadata = {
  title: 'Email Verification',
};

export default async function EmailVerification() {
  const meData = getMe();
  const me = await meData;
  if (me === 401) redirect('/login');

  return <EmailVerificationClient />;
}
