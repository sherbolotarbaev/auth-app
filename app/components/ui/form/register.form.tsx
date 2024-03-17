'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { checkPasswordStrength } from '@/app/lib/password';
import { errorNotification } from '@/app/lib/notification';
import { useSignupMutation } from '@/app/redux/api/auth';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { GoogleOAuthButton } from '@/app/components/ui/button';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/app/components/scss/form.module.scss';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function RegisterForm() {
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

  const [signup, { isLoading }] = useSignupMutation();

  const [passwordStrength, setPasswordStrength] = React.useState<string | null>(null);

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const password = watch('password');

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, '');
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    try {
      const data = await signup(formData).unwrap();
      router.push(data.redirectUrl);
    } catch (e: any) {
      errorNotification(e.data?.message || 'Something went wrong');
      console.error(e);
    }
  };

  return (
    <>
      <div className={scss.form_wrapper} onSubmit={handleSubmit(handleSubmitForm)}>
        <form className={scss.form}>
          <div className={scss.text}>
            <h2 className={scss.title}>Get started</h2>

            <span className={scss.info}>Create a new account</span>
          </div>

          <GoogleOAuthButton />

          <div className={scss.devider}>
            <hr />
            <span>or</span>
            <hr />
          </div>

          <div className={scss.inputs_container}>
            <div className={scss.input_container}>
              {errors.firstName ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.firstName.message}
                </span>
              ) : (
                <span className={scss.label}>First name</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Enter your first name..."
                  {...register('firstName', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
                      message: 'Invalid first name',
                    },
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters',
                    },
                    maxLength: {
                      value: 64,
                      message: 'First name cannot exceed 50 characters',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('firstName')}
                  style={
                    !isLoading && firstName && firstName.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <div className={scss.input_container}>
              {errors.lastName ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.lastName.message}
                </span>
              ) : (
                <span className={scss.label}>Last name</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Enter your last name..."
                  {...register('lastName', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
                      message: 'Invalid last name',
                    },
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters',
                    },
                    maxLength: {
                      value: 62,
                      message: 'Last name cannot exceed 50 characters',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('lastName')}
                  style={
                    !isLoading && lastName && lastName.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <div className={scss.input_container}>
              {errors.email ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.email.message}
                </span>
              ) : (
                <span className={scss.label}>Email address</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Enter your email address..."
                  {...register('email', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid Email',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('email')}
                  style={
                    !isLoading && email && email.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
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
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <Button load={isLoading} type="submit" disabled={!isValid}>
              Sign up
            </Button>

            <Link className={scss.link} href={`/login${nextUrl}`}>
              Have an account? Log in Now
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
