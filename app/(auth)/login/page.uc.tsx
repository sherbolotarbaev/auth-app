"use client";

import { LoginForm } from "@/components/ui/form/login.form";
import scss from "@/components/scss/page.module.scss";

export default function LoginClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <LoginForm />
      </section>
    </>
  );
}
