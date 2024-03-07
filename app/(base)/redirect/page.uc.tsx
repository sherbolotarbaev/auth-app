"use client";

import React from "react";
import { LoadSvg } from "@/app/lib/svg";
import scss from "@/app/components/scss/redirect.module.scss";

export default function RedirectClient() {
  React.useEffect(() => {
    window?.location?.assign(
      decodeURIComponent(window?.location?.href?.split("to=")?.[1] || "/")
    );
  }, []);

  return (
    <>
      <div className={scss.wrapper}>
        <div className={scss.box}>
          <LoadSvg className={scss.load} />

          <h2 className={scss.title}>Redirecting...</h2>
        </div>
      </div>
    </>
  );
}
