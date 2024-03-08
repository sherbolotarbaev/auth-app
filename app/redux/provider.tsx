'use client';

import { store } from './store';
import { Provider } from 'react-redux';

interface Props {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: Readonly<Props>) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
