"use client";

import { Button } from "@/app/components/ui/button/button";

import { GoogleSvg } from "@/app/lib/svg";

export function GoogleOAuthButton() {
  const OAuthUrl = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/google/callback`
  );

  return (
    <Button
      redirect={OAuthUrl}
      style="dark"
      icon={{
        svg: <GoogleSvg style={{ fontSize: "1.15rem" }} />,
        position: "left",
      }}>
      Continue with Google
    </Button>
  );
}
