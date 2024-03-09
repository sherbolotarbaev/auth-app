'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';

import { SubmitHandler, useForm } from 'react-hook-form';
import { errorNotification } from '@/app/lib/notification';
import { checkPasswordStrength } from '@/app/lib/password';
import { useLogInMutation } from '@/app/redux/api/auth';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { GoogleOAuthButton } from '@/app/components/ui/button';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/app/components/scss/form.module.scss';

type FormData = {
  emailOrUsername: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = decodeURIComponent(searchParams.get('next') ?? '/');

  const nextUrl = next === '/' ? '/' : `?next=${next}`;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [logIn, { isLoading }] = useLogInMutation();

  const [passwordStrength, setPasswordStrength] = React.useState<string | null>(null);

  const emailOrUsername = watch('emailOrUsername');
  const password = watch('password');

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, '');
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    try {
      const data = await logIn(formData).unwrap();
      router.push(data.redirectUrl);
    } catch (e: any) {
      errorNotification(e.data?.message || 'Something went wrong');
      console.error(e);
    }
  };

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie('email');

      if (cookieEmail) {
        setValue('emailOrUsername', cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  return (
    <>
      <div className={scss.form_wrapper} onSubmit={handleSubmit(handleSubmitForm)}>
        <form className={scss.form}>
          <div className={scss.text}>
            <h2 className={scss.title}>Welcome back</h2>

            <span className={scss.info}>Log in to your account</span>
          </div>

          <GoogleOAuthButton />

          <div className={scss.devider}>
            <hr />
            <span>or</span>
            <hr />
          </div>

          <div className={scss.inputs_container}>
            <div className={scss.input_container}>
              {errors.emailOrUsername ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.emailOrUsername.message}
                </span>
              ) : (
                <span className={scss.label}>Username or Email address</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Enter your username or email address..."
                  {...register('emailOrUsername', {
                    required: 'This field is required',
                    pattern: {
                      value:
                        /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[a-zA-Z0-9_-]+)$/,
                      message: 'Invalid username or email address',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('emailOrUsername')}
                  style={
                    !isLoading && emailOrUsername && emailOrUsername.length > 0
                      ? { fontSize: '1.1rem', fill: '#fff' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <div className={scss.input_container}>
              {errors.password ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} /> {errors.password.message}
                </span>
              ) : (
                <span className={scss.label}>
                  {passwordStrength ? `Password: ${passwordStrength}` : 'Password'}
                </span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  autoComplete="off"
                  className={
                    isLoading
                      ? `${scss.input} ${scss.load} ${scss.password}`
                      : `${scss.input} ${scss.password}`
                  }
                  placeholder="Enter your password..."
                  {...register('password', {
                    required: 'This field is required',
                    minLength: {
                      value: 8,
                      message: 'Password must contain at least 8 characters',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Password cannot contain more than 16 characters',
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setPasswordStrength(checkPasswordStrength(e.target.value));
                    },
                    onBlur: () => {
                      setPasswordStrength(null);
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('password')}
                  style={
                    !isLoading && password && password.length > 0
                      ? { fontSize: '1.1rem', fill: '#fff' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <Button load={isLoading} type="submit" disabled={!isValid}>
              Log in
            </Button>

            <Link className={scss.link} href={`/password/forgot${nextUrl}`}>
              Forgot Password?
            </Link>

            <div className={scss.text}>
              <span className={scss.info}>
                By logging in, you agree to our Privacy Policy and Terms of Service.
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
