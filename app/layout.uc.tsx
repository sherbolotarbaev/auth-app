'use client';

import ReduxProvider from '@/app/redux/provider';
import AuthProvider from '@/app/providers/auth.provider';

import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Readonly<Props>) {
  return (
    <>
      <ReduxProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReduxProvider>

      <Toaster richColors />
    </>
  );
}
