'use client';

import React from 'react';

import { useGetMeQuery } from '@/app/redux/api/me';

import { Button, LogOutButton } from '@/app/components/ui/button';

import scss from '@/app/components/scss/page.module.scss';

export default function HomeClient() {
  const { data: me, isLoading } = useGetMeQuery();

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          {!isLoading && me && <h1>Hey {me.firstName} 😎</h1>}

          {!isLoading && me ? (
            <LogOutButton />
          ) : (
            <>
              <Button redirect="/login" width={220}>
                Log in
              </Button>

              <Button redirect="/register" width={220} style="dark">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
