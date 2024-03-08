'use client';

import { Button } from '@/app/components/ui/button/button';

import { GitHubSvg } from '@/public/svg';

export function GitHubButton() {
  return (
    <Button
      size="small"
      style="dark"
      open="https://github.com/sherbolotarbaev/auth-app"
      icon={{
        svg: <GitHubSvg />,
        position: 'left',
      }}
    >
      Star on GitHub
    </Button>
  );
}
