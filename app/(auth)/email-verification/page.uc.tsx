"use client";

import { EmailVerificationForm } from "@/components/ui/form";
import scss from "@/components/scss/page.module.scss";

export default function EmailVerificationClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <EmailVerificationForm />
      </section>
    </>
  );
}
