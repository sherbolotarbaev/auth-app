"use client";

import ResetForm from "@/components/ui/form/reset.form";
import styles from "@/components/scss/page.module.scss";

export default function ResetClient() {
  return (
    <>
      <div className={styles.wrapper}>
        <ResetForm />
      </div>
    </>
  );
}
