import type { AdminViewServerProps } from 'payload';

import { DefaultTemplate } from '@payloadcms/next/templates';
import { Gutter } from '@payloadcms/ui';
import { getR2Analytics } from '@/lib/utilities/getAnalytics';
import { formatDate } from '@/lib/utilities/formatDate';
import { R2StorageGauge } from '@/components/ui/Usage';

import React from 'react';
import clsx from 'clsx';

export const R2AnalyticsView = async (props: AdminViewServerProps) => {
  const { initPageResult, params, searchParams } = props;
  const {
    req: { payload, user },
  } = initPageResult;

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (user.role !== 'admin') {
    return <div>Admin access required to view this page.</div>;
  }
  const r2Analytics = await getR2Analytics(initPageResult.req.headers);
  const usage = r2Analytics.currentUsage;
  const date = r2Analytics.dateRange;

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={user}
      visibleEntities={initPageResult.visibleEntities}
      viewType='dashboard'
    >
      <Gutter>
        <h1>Cloudflare Analytics</h1>
        <div className='divider'></div>
        <h2>R2 Storage</h2>
        <p>Here you can view some basic information about your R2 storage.</p>
        <p>{`${formatDate(date.startDate)} - ${formatDate(date.endDate)}`}</p>
        <div className='analytics__container'>
          <div className={clsx('card', 'analytics__card')}>
            <h2>Bucket</h2>
            <p>
              <strong>Name:</strong> {r2Analytics.bucketName}
            </p>
            <p>
              <strong>Object Count:</strong> {usage.objectCount}
            </p>
          </div>
          <div className={clsx('card', 'analytics__card')}>
            <h2>Storage</h2>
            <R2StorageGauge usage={usage} />
            <p>
              <strong>Total Used:</strong> {usage.totalStorage} ({usage.storageUsagePercentage})
            </p>
            <p>
              <strong>Total Capacity:</strong> {usage.storageCapacity}
            </p>
          </div>
          <div className={clsx('card', 'analytics__card')}>
            <h2>Operations</h2>
            <p>
              <strong>Class A:</strong> {usage.operations.classA}
            </p>
            <p>
              <strong>Class B:</strong> {usage.operations.classB}
            </p>
          </div>
        </div>
      </Gutter>
    </DefaultTemplate>
  );
};
