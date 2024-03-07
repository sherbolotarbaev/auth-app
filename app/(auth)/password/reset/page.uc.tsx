"use client";

import ResetForm from "@/app/components/ui/form/reset.form";
import styles from "@/app/components/scss/page.module.scss";

export default function ResetClient() {
  return (
    <>
      <div className={styles.wrapper}>
        <ResetForm />
      </div>
    </>
  );
}
