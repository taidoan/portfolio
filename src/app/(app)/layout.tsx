import type { Metadata } from 'next';
import type { Header as HeaderType, Footer as FooterType, SiteSetting } from '@/payload-types';

import { inter, barlow, barlow_condensed } from '@/lib/fonts';
import '@styles/index.scss';
import { getServerSideURL } from '@/lib/utilities/getURLs';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';
import { getMaintenanceStatus } from '@/lib/utilities/getMaintenanceStatus';
import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph';

import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { MaintenanceBlock } from '@/components/layout/Maintenance';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const maintenance = await getMaintenanceStatus();

  return (
    <html
      className={`${inter.variable} ${barlow.variable} ${barlow_condensed.variable}`}
      lang='en'
      suppressHydrationWarning
    >
      <body>
        {maintenance.maintenanceMode ? (
          <MaintenanceBlock message={maintenance?.maintenanceMessage ?? undefined} />
        ) : (
          <MainApp>{children}</MainApp>
        )}
      </body>
    </html>
  );
}

const MainApp = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [headerData, footerData, siteSettings] = await Promise.allSettled([
    getCachedGlobal('header', 3)(),
    getCachedGlobal('footer', 3)(),
    getCachedGlobal('site-settings')(),
  ]);

  const header = headerData.status === 'fulfilled' ? (headerData.value as HeaderType) : null;
  const footer = footerData.status === 'fulfilled' ? (footerData.value as FooterType) : null;
  const settings = siteSettings.status === 'fulfilled' ? (siteSettings.value as SiteSetting) : null;

  const socialNetworks = settings?.socialAccounts?.socialNetwork ?? [];

  return (
    <>
      {header && <Header data={header} social={socialNetworks} />}
      <main id='main-content' role='main'>
        {children}
      </main>
      {footer && <Footer data={footer} social={socialNetworks} />}
    </>
  );
};

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
};
