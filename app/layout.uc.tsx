'use client';

import ReduxProvider from '@/app/redux/provider';

import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Readonly<Props>) {
  return (
    <>
      <ReduxProvider>{children}</ReduxProvider>

      <Toaster richColors />
    </>
  );
}
