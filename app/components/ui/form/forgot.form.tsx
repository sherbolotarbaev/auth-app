"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";

import { SubmitHandler, useForm } from "react-hook-form";
import { successNotification, errorNotification } from "@/app/lib/notification";
import { useForgotPasswordMutation } from "@/app/redux/api/auth";

import Link from "next/link";
import { Button } from "@/app/components/ui/button";

import { CloseSvg, ErrorSvg } from "@/public/svg";
import scss from "@/app/components/scss/form.module.scss";

type FormData = {
  email: string;
};

export function ForgotForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = decodeURIComponent(searchParams.get("next") ?? "/");

  const nextUrl = next === "/" ? "/" : `?next=${next}`;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const email = watch("email");

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    try {
      const data = await forgotPassword(formData).unwrap();
      successNotification(data.message);
      router.push(next === "/" ? "/login" : `/login?next=${next}`);
    } catch (e: any) {
      errorNotification(e.data?.message || "Something went wrong");
      console.error(e);
    }
  };

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie("email");

      if (cookieEmail) {
        setValue("email", cookieEmail);
      }
    };

    return () => {
      getCookieEmail();
    };
  }, [setValue]);

  return (
    <>
      <div className={scss.form_wrapper}>
        <form className={scss.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={scss.text}>
            <h2 className={scss.title}>Reset Your Password</h2>

            <span className={scss.info}>
              Enter the email address you used when you joined and we will send
              you a link to reset your password.
            </span>
          </div>

          <div className={scss.inputs_container}>
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
                  className={
                    isLoading ? `${scss.input} ${scss.load}` : scss.input
                  }
                  placeholder="Enter your email address..."
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid Email",
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput("email")}
                  style={
                    !isLoading && email && email.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>
            </div>

            <Button type="submit" load={isLoading}>
              Send Reset Email
            </Button>

            <Link className={scss.link} href={`/login${nextUrl}`}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
