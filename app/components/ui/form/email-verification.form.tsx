'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

import { useForm } from 'react-hook-form';
import { errorNotification } from '@/app/lib/notification';
import { useEmailVerificationMutation } from '@/app/redux/api/auth';

import Link from 'next/link';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/app/components/scss/form.module.scss';

type FormData = {
  code: string;
};

export function EmailVerificationForm() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>('');

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' });

  const [emailVerification, { isLoading }] = useEmailVerificationMutation();

  const code = watch('code');

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, '');
  };

  React.useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        await emailVerification({ code }).unwrap();
        router.push('/redirect');
      } catch (e: any) {
        errorNotification(e.data?.message || 'Something went wrong');
        console.error(e);
      }
    };

    if (isValid && code && code.length === 6 && !errors.code) {
      handleEmailVerification();
    }
  }, [isValid, code, errors.code, router]);

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie('email');

      if (cookieEmail) {
        setEmail(cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  return (
    <>
      <div className={scss.form_wrapper}>
        <form className={scss.form}>
          <div className={scss.text}>
            <h2 className={scss.title}>Email Verification</h2>

            <span className={scss.info}>
              {email} <br /> We just sent you a verification code. <br /> Please check
              your inbox.
            </span>
          </div>

          <div className={scss.inputs_container}>
            <div className={scss.input_container}>
              {errors.code ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.code.message}
                </span>
              ) : (
                <span className={scss.label}>Code</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Paste a code"
                  {...register('code', {
                    required: 'Code required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Invalid six-digit code',
                    },
                    minLength: {
                      value: 6,
                      message: 'Code must be exactly six digits',
                    },
                    maxLength: {
                      value: 6,
                      message: 'Code must be exactly six digits',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('code')}
                  style={
                    !isLoading && code && code.length > 0
                      ? { fontSize: '1.1rem', fill: '#fff' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <Link className={scss.link} href="/logout">
              Back to Log in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
