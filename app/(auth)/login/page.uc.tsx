"use client";

import { LoginForm } from "@/app/components/ui/form/login.form";
import scss from "@/app/components/scss/page.module.scss";

export default function LoginClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <LoginForm />
      </section>
    </>
  );
}
