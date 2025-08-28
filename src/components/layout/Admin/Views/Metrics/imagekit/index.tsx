import type { AdminViewServerProps } from 'payload';

import { DefaultTemplate } from '@payloadcms/next/templates';
import { getMetrics } from '@/lib/utilities/getAnalytics';
import { ImagekitMetricsClient } from './index.client';

export const ImagekitMetricsView = async (props: AdminViewServerProps) => {
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

  const startDate = searchParams?.startDate as string | undefined;
  const endDate = searchParams?.endDate as string | undefined;

  const ikAnalytics = await getMetrics('imagekit', initPageResult.req.headers, startDate, endDate);

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
      <ImagekitMetricsClient
        data={ikAnalytics}
        startDate={ikAnalytics.startDate}
        endDate={ikAnalytics.endDate}
      />
    </DefaultTemplate>
  );
};
