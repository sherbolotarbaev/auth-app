import { GitHubButton } from "../components/ui/button";

import scss from "@/app/components/scss/page.module.scss";

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Readonly<Props>) {
  return (
    <>
      <section className={scss.wrapper}>
        {children}

        <div className={scss.button}>
          <GitHubButton />
        </div>
      </section>
    </>
  );
}
