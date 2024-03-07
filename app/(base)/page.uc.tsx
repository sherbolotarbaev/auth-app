"use client";

import { useGetMeQuery } from "@/redux/api/me";

import { LogOutButton } from "@/components/ui/button";

import scss from "@/components/scss/page.module.scss";

export default function HomeClient() {
  const { data: me, isLoading } = useGetMeQuery();

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <h1>Hey {isLoading || !me ? "bro" : me.firstName} 😎</h1>

          <LogOutButton />
        </div>
      </section>
    </>
  );
}
