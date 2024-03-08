'use client';

import { ResetForm } from '@/app/components/ui/form';

import scss from '@/app/components/scss/page.module.scss';

export default function ResetClient() {
  return (
    <>
      <div className={scss.container}>
        <ResetForm />
      </div>
    </>
  );
}
