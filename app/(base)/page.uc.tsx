'use client';

import { useGetMeQuery } from '@/app/redux/api/me';

import Image from 'next/image';

import scss from '@/app/components/scss/page.module.scss';

export default function HomeClient() {
  const { data: me, isLoading } = useGetMeQuery();

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            me && (
              <>
                {me.photo && (
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

                <h1
                  style={{
                    fontSize: '1.585rem',
                    color: 'var(--accent-8)',
                  }}
                >
                  {me.firstName} {me.lastName}
                </h1>

                <span
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--accent-4)',
                  }}
                >
                  {me.email}
                </span>
              </>
            )
          )}
        </div>
      </section>
    </>
  );
}
