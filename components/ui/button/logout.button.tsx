"use client";

import { Button } from "@/components/ui/button";

export function LogOutButton() {
  const LogOutUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/logout`);

  return (
    <Button width={120} redirect={LogOutUrl} style="dark">
      Log out
    </Button>
  );
}
