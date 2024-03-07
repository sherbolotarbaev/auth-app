"use client";

import ForgotForm from "@/app/components/ui/form/forgot.form";
import styles from "@/app/components/scss/page.module.scss";

export default function ForgotClient() {
  return (
    <>
      <div className={styles.wrapper}>
        <ForgotForm />
      </div>
    </>
  );
}
