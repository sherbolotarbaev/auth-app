"use client";

import { ForgotForm } from "@/app/components/ui/form";

import scss from "@/app/components/scss/page.module.scss";

export default function ForgotClient() {
  return (
    <>
      <div className={scss.container}>
        <ForgotForm />
      </div>
    </>
  );
}
