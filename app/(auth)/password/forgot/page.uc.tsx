"use client";

import ForgotForm from "@/components/ui/form/forgot.form";
import styles from "@/components/scss/page.module.scss";

export default function ForgotClient() {
  return (
    <>
      <div className={styles.wrapper}>
        <ForgotForm />
      </div>
    </>
  );
}
