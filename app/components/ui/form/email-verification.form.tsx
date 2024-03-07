"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { useForm } from "react-hook-form";
import { useEmailVerificationMutation } from "@/app/redux/api/auth";

import { CloseSvg, ErrorSvg } from "@/app/lib/svg";
import scss from "@/app/components/scss/form.module.scss";

type FormData = {
  code: string;
};

export function EmailVerificationForm() {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const [emailVerification, { isLoading }] = useEmailVerificationMutation();

  const [error, setError] = React.useState<string | null>(null);

  const code = watch("code");

  const handleLogout = () => {
    const LogOutUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/logout`);
    window.open(LogOutUrl.toString(), "_self");
  };

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, "");
  };

  React.useEffect(() => {
    const handleEmailVerification = async () => {
      setError(null);

      try {
        await emailVerification({ code }).unwrap();
        router.push("/redirect");
      } catch (e: any) {
        setError(e.data?.message || "Something went wrong");
        console.error(e);
      }
    };

    if (isValid && code && code.length === 6 && !errors.code) {
      handleEmailVerification();
    }
  }, [isValid, code, errors.code, router]);

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie("email");

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
              {email} <br /> We just sent you a verification code. <br /> Please
              check your inbox.
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
              {errors.code ? (
                <span className={scss.error}>{errors.code.message}</span>
              ) : (
                <span className={scss.label}>Code</span>
              )}

              <div className={scss.input_wrapper}>
                {errors.code && <ErrorSvg className={scss.error_icon} />}

                <input
                  type="text"
                  disabled={isLoading}
                  className={
                    isLoading ? `${scss.input} ${scss.load}` : scss.input
                  }
                  placeholder="Paste a code"
                  {...register("code", {
                    required: "Code required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Invalid six-digit code",
                    },
                    minLength: {
                      value: 6,
                      message: "Code must be exactly six digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "Code must be exactly six digits",
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput("code")}
                  style={
                    !isLoading && code && code.length > 0
                      ? { fontSize: "1.1rem", fill: "#fff" }
                      : { display: "none" }
                  }
                />
              </div>
            </div>

            <span className={scss.link} onClick={handleLogout}>
              Back to Log in
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
