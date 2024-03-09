import type { Metadata } from 'next';

import RegisterClient from './page.uc';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default async function Register() {
  return <RegisterClient />;
}
