'use client';

import { EmailVerificationForm } from '@/app/components/ui/form';

import scss from '@/app/components/scss/page.module.scss';

export default function EmailVerificationClient() {
  return (
    <>
      <div className={scss.container}>
        <EmailVerificationForm />
      </div>
    </>
  );
}
