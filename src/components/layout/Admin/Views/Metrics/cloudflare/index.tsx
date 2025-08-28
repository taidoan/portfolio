import type { AdminViewServerProps } from 'payload';

import { DefaultTemplate } from '@payloadcms/next/templates';
import { getMetrics } from '@/lib/utilities/getAnalytics';
import { CloudflareMetricsClient } from './index.client';

export const CloudflareMetricsView = async (props: AdminViewServerProps) => {
  const { initPageResult, params, searchParams } = props;
  const {
    req: { user },
  } = initPageResult;

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (user.role !== 'admin') {
    return <div>Admin access required to view this page.</div>;
  }
  const r2Analytics = await getMetrics('cloudflare', initPageResult.req.headers);
  const usage = r2Analytics.currentUsage;
  const date = r2Analytics.dateRange;

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <CloudflareMetricsClient r2Analytics={r2Analytics} usage={usage} date={date} />
    </DefaultTemplate>
  );
};

export default CloudflareMetricsView;
