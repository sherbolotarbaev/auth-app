"use client";

import { LoginForm } from "@/app/components/ui/form";

import scss from "@/app/components/scss/page.module.scss";

export default function LoginClient() {
  return (
    <>
      <div className={scss.container}>
        <LoginForm />
      </div>
    </>
  );
}
