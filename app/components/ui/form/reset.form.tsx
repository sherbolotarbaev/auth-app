"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { successNotification } from "@/app/lib/notification";
import { useResetPasswordMutation } from "@/app/redux/api/auth";

import Link from "next/link";
import { Button } from "@/app/components/ui/button";

import { CloseSvg, ErrorSvg } from "@/public/svg";
import scss from "@/app/components/scss/form.module.scss";

type FormData = {
  password: string;
  confirmPassword: string;
};

export function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const identificationToken = decodeURIComponent(
    searchParams.get("identification_token") ?? "/"
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [error, setError] = React.useState<string | null>(null);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setError(null);

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return setError(`Passwords don't match`);
    }

    try {
      const data = await resetPassword({
        identificationToken,
        password,
      }).unwrap();
      successNotification(data.message);
      router.push("/login");
    } catch (e: any) {
      setError(e.data?.message || "Something went wrong");
      console.error(e);
    }
  };

  React.useEffect(() => {
    if (!identificationToken && identificationToken.length === 0) {
      router.push("/password/forgot");
    }
  }, [identificationToken, router]);

  return (
    <>
      <div className={scss.form_wrapper}>
        <form className={scss.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={scss.text}>
            <h2 className={scss.title}>Reset Your Password</h2>

            <span className={scss.info}>
              Enter a new secure password and press save to update your password
            </span>
          </div>

          <span
            className={
              !error
                ? scss.error_message
                : `${scss.error_message} ${scss.active}`
            }>
            {error}
          </span>

          <div className={scss.inputs_container}>
            <div className={scss.input_container}>
              {errors.password ? (
                <span className={scss.error}>{errors.password.message}</span>
              ) : (
                <span className={scss.label}>Password</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  className={
                    isLoading ? `${scss.input} ${scss.load}` : scss.input
                  }
                  placeholder="Enter your new password..."
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

                {errors.password && <ErrorSvg className={scss.error_icon} />}
              </div>
            </div>

            <div className={scss.input_container}>
              {errors.confirmPassword ? (
                <span className={scss.error}>
                  {errors.confirmPassword.message}
                </span>
              ) : (
                <span className={scss.label}>Confirm Password</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  className={
                    isLoading ? `${scss.input} ${scss.load}` : scss.input
                  }
                  placeholder="Confirm your new password..."
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
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
                  onClick={() => handleClearInput("confirmPassword")}
                  style={
                    !isLoading && confirmPassword && confirmPassword.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />

                {errors.confirmPassword && (
                  <ErrorSvg className={scss.error_icon} />
                )}
              </div>
            </div>

            <Button type="submit" load={isLoading} disabled={!isValid}>
              Save New Password
            </Button>

            <Link className={scss.link} href="/login">
              Back to Log in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
