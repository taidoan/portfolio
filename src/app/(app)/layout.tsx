import type { Metadata } from 'next';
import { inter, barlow, barlow_condensed } from '@/lib/fonts';
import '@styles/index.scss';
import { draftMode } from 'next/headers';
import { getServerSideURL } from '@/lib/utilities/getURLs';
import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph';
import Header from '@components/layout/Header';
import type { Header as HeaderType, Footer as FooterType, SiteSetting } from '@/payload-types';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';
import Footer from '@components/layout/Footer';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  const [headerData, footerData, siteSettings] = (await Promise.all([
    getCachedGlobal('header', 3)(),
    getCachedGlobal('footer', 3)(),
    getCachedGlobal('site-settings')(),
  ])) as [HeaderType, FooterType, SiteSetting];

  console.log('site Settings', siteSettings);

  return (
    <html
      className={`${inter.variable} ${barlow.variable} ${barlow_condensed.variable}`}
      lang='en'
      suppressHydrationWarning
    >
      <body>
        <Header data={headerData} social={siteSettings?.socialAccounts?.socialNetwork ?? []} />
        <main>{children}</main>
        <Footer data={footerData} social={siteSettings?.socialAccounts?.socialNetwork ?? []} />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
};
