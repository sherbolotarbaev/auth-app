'use client';

import { RegisterForm } from '@/app/components/ui/form';

import scss from '@/app/components/scss/page.module.scss';

export default function RegisterClient() {
  return (
    <>
      <div className={scss.container}>
        <RegisterForm />
      </div>
    </>
  );
}
