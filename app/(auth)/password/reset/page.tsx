import type { Metadata } from "next";

import ResetClient from "./page.uc";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function Reset() {
  return <ResetClient />;
}
