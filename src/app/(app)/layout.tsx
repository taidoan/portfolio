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
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} ${barlow.variable} ${barlow_condensed.variable}`}>
        <Header data={headerData} social={socialData} />
        <main>
          <h1>Tets</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam eum, nobis ipsam non
            maiores quia, sunt quos beatae porro perferendis eos velit libero repellendus?
            Repudiandae sit non rerum voluptate obcaecati. Unde, culpa? Ex maiores iure voluptate
            itaque quibusdam facilis libero suscipit repellendus, vero fugit cupiditate voluptatem
            saepe alias! Odit ut eveniet error ipsam blanditiis neque itaque. Possimus mollitia
            repudiandae ipsum.
          </p>
        </main>
        <Footer data={footerData} social={socialData} />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
};
