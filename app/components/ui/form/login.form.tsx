"use client";

import React from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { SubmitHandler, useForm } from "react-hook-form";
import { useLogInMutation } from "@/app/redux/api/auth";

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { GoogleOAuthButton } from "@/app/components/ui/button";

import { CloseSvg, ErrorSvg } from "@/app/lib/svg";
import scss from "@/app/components/scss/form.module.scss";

type FormData = {
  emailOrUsername: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = decodeURIComponent(searchParams.get("next") ?? "/");
  const errorStatus = searchParams.get("error");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [logIn, { isLoading }] = useLogInMutation();

  const [error, setError] = React.useState<string | null>(null);

  const emailOrUsername = watch("emailOrUsername");
  const password = watch("password");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setError(null);

    try {
      await logIn(formData).unwrap();
      router.push("/redirect");
    } catch (e: any) {
      setError(e.data?.message || "Something went wrong");
      console.error(e);
    }
  };

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie("email");

      if (cookieEmail) {
        setValue("emailOrUsername", cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue]);

  React.useEffect(() => {
    if (errorStatus && errorStatus === "400") {
      setError("User doesn't exist.");
    } else if (errorStatus && errorStatus === "403") {
      setError("User has been deactivated.");
    } else if (errorStatus && errorStatus !== "403" && errorStatus !== "400") {
      router.push("/");
    }
  }, [errorStatus]);

  return (
    <>
      <div
        className={scss.form_wrapper}
        onSubmit={handleSubmit(handleSubmitForm)}>
        <form className={scss.form}>
          <div className={scss.text}>
            <h2 className={scss.title}>Welcome back</h2>

            <span className={scss.info}>Log in to your account</span>
          </div>

          <div className={scss.inputs_container}>
            <GoogleOAuthButton />

            <div className={scss.devider}>
              <hr />
              <span>or</span>
              <hr />
            </div>

            <span
              className={
                !error
                  ? scss.error_message
                  : `${scss.error_message} ${scss.active}`
              }>
              {error}
            </span>

            <div className={scss.input_container}>
              {errors.emailOrUsername ? (
                <span className={scss.error}>
                  {errors.emailOrUsername.message}
                </span>
              ) : (
                <span className={scss.label}>Username or email address</span>
              )}

              <div className={scss.input_wrapper}>
                {errors.emailOrUsername && (
                  <ErrorSvg className={scss.error_icon} />
                )}

                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${scss.input} ${scss.load}` : scss.input
                  }
                  placeholder="Enter your username or email address..."
                  {...register("emailOrUsername", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[a-zA-Z0-9_-]+)$/,
                      message: "Invalid username or email address",
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput("emailOrUsername")}
                  style={
                    !isLoading && emailOrUsername && emailOrUsername.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>
            </div>

            <div className={scss.input_container}>
              {errors.password ? (
                <span className={scss.error}>{errors.password.message}</span>
              ) : (
                <span className={scss.label}>Password</span>
              )}

              <div className={scss.input_wrapper}>
                {errors.password && <ErrorSvg className={scss.error_icon} />}

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
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message:
                        "Password cannot contain more than 16 characters",
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput("password")}
                  style={
                    !isLoading && password && password.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>
            </div>

            <Link
              className={scss.link}
              href={
                next === "/"
                  ? "/password/forgot"
                  : `/password/forgot?next=${next}`
              }>
              Reset password
            </Link>

            <Button load={isLoading} type="submit" disabled={!isValid}>
              Log in
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
