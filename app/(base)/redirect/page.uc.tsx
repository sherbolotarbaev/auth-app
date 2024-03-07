"use client";

import React from "react";

import { LoadSvg } from "@/public/svg";
import scss from "@/app/components/scss/redirect.module.scss";

export default function RedirectClient() {
  React.useEffect(() => {
    const redirectTo = decodeURIComponent(
      window?.location?.href?.split("to=")?.[1] || "/"
    );

    window?.location?.assign(`https://sherbolotarbaev.pro${redirectTo}`);
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
