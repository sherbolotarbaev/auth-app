'use client';

import React from 'react';

import { useGetMeQuery } from '@/app/redux/api/me';

import Image from 'next/image';
import { Button } from '@/app/components/ui/button';

import scss from '@/app/components/scss/page.module.scss';

export default function HomeClient() {
  const { data: me, isLoading } = useGetMeQuery();

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          {me && me.photo && (
            <Image
              src={me.photo}
              alt={`${me.firstName} ${me.lastName}`}
              width={90}
              height={90}
              style={{
                background: 'var(--accent-1)',
                border: '0.8px solid var(--accent-2)',
                borderRadius: '50%',
              }}
            />
          )}

          {!isLoading && me && <h1>Hey {me.firstName} 😎</h1>}

          {!isLoading && !me && (
            <>
              <Button redirect="/login" width={260}>
                Log in
              </Button>

              <Button redirect="/register" width={260} style="dark">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
