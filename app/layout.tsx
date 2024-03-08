import { siteConfig } from '@/config/site';

import type { Metadata } from 'next';

import RootLayoutClient from './layout.uc';

import { jetBrainsMono } from '@/app/lib/fonts';
import '@/app/components/scss/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>

      <body style={jetBrainsMono.style}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
