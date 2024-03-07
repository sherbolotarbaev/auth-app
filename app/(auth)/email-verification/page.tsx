import type { Metadata } from "next";

import EmailVerificationClient from "./page.uc";

export const metadata: Metadata = {
  title: "Email Verification",
};

export default async function EmailVerification() {
  return <EmailVerificationClient />;
}
