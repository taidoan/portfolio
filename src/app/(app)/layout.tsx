import type { Metadata } from 'next';
import type { Header as HeaderType, Footer as FooterType, SiteSetting } from '@/payload-types';

import clsx from 'clsx';
import { inter, barlow, barlow_condensed } from '@/lib/fonts';
import '@styles/index.scss';
import { getServerSideURL } from '@/lib/utilities/getURLs';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';
import { getMaintenanceStatus } from '@/lib/utilities/getMaintenanceStatus';
import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph';
import { getUserSignedIn } from '@/lib/utilities/getUserSignedIn';

import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { MaintenanceBlock } from '@/components/layout/Maintenance';
import { Favicons } from '@/components/layout/Favicon';
import { ScrollUpButton } from '@/components/ui/ScrollUp';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [maintenanceCheck, userSignedIn] = await Promise.allSettled([
    getMaintenanceStatus(),
    getUserSignedIn(),
  ]);

  const maintenance = maintenanceCheck.status === 'fulfilled' ? maintenanceCheck.value : null;
  const user = userSignedIn.status === 'fulfilled' ? userSignedIn.value : null;
  return (
    <html
      className={clsx(inter.variable, barlow.variable, barlow_condensed.variable)}
      lang='en'
      suppressHydrationWarning
    >
      <head>
        <Favicons />
        <script
          defer
          data-domain='taidoan.com'
          src='https://analytics.taidoan.com/js/script.file-downloads.hash.outbound-links.js'
        ></script>
        <script>
          window.plausible = window.plausible || function(){}; window.plausible?.q =
          window.plausible?.q || []; window.plausible?.q.push(arguments);
        </script>
      </head>
      <body>
        {maintenance?.maintenanceMode === true && !user ? (
          <MaintenanceBlock message={maintenance?.maintenanceMessage ?? undefined} />
        ) : (
          <MainApp>{children}</MainApp>
        )}
        <ScrollUpButton />
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
