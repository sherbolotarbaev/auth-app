'use client';

import { Button } from '@/app/components/ui/button';

export function LogOutButton() {
  return (
    <Button width={120} redirect="/logout" style="dark">
      Log out
    </Button>
  );
}
