import type { Metadata } from 'next';
import { inter, barlow, barlow_condensed } from '@/lib/fonts';
import '@styles/index.scss';
import { draftMode } from 'next/headers';
import { getServerSideURL } from '@/utilities/getURLs';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import Header from '@components/layout/Header';
import type {
  Header as HeaderType,
  Social as SocialType,
  Footer as FooterType,
} from '@/payload-types';
import { getCachedGlobal } from '@/utilities/getGlobal';
import Footer from '@components/layout/Footer';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  const [headerData, socialData, footerData] = (await Promise.all([
    getCachedGlobal('header', 3)(),
    getCachedGlobal('social', 1)(),
    getCachedGlobal('footer', 3)(),
  ])) as [HeaderType, SocialType, FooterType];

  return (
    <html
      className={`${inter.variable} ${barlow.variable} ${barlow_condensed.variable}`}
      lang='en'
      suppressHydrationWarning
    >
      <body>
        <Header data={headerData} social={socialData} />
        <main>{children}</main>
        <Footer data={footerData} social={socialData} />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
};
