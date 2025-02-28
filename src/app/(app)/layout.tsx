import type { Metadata } from 'next';
import { inter, barlow, barlow_condensed } from '@/lib/fonts';
import '@styles/index.scss';
import { draftMode } from 'next/headers';
import { getServerSideURL } from '@/utilities/getURLs';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} ${barlow.variable} ${barlow_condensed.variable}`}>
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
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
};
