import type { AdminViewServerProps } from 'payload';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { DefaultTemplate } from '@payloadcms/next/templates';
import { Gutter } from '@payloadcms/ui';
import { getR2Analytics } from '@/lib/utilities/getAnalytics';
import { formatDate } from '@/lib/utilities/formatDate';
import { R2StorageGauge } from '@/components/ui/Usage';
import { IconCalendar } from '@tabler/icons-react';

export const R2AnalyticsView = async (props: AdminViewServerProps) => {
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
  const r2Analytics = await getR2Analytics(initPageResult.req.headers);
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
      user={user}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <div className={clsx('view__header')}>
          <h1>Cloudflare Analytics</h1>
        </div>
        <div className={clsx('view__container', 'view__container--space-between')}>
          <div>
            <h2>R2 Object Storage</h2>
            <p>Here you can view some basic information about your R2 storage.</p>
          </div>
          <Link href='https://developers.cloudflare.com/r2/' target='_blank'>
            Documentation
          </Link>
        </div>

        <div className={clsx('text-with-icon')}>
          <IconCalendar className={clsx('icon')} />
          <span>{`${formatDate(date.startDate)} - ${formatDate(date.endDate)}`}</span>
        </div>
        <div className='analytics__container'>
          <div className={clsx('card', 'analytics__card')}>
            <ul className='analytics__list'>
              <li>
                <strong>Bucket Name:</strong> {r2Analytics.bucketName}
              </li>
              <li>
                <strong>Object Count:</strong> {usage.objectCount}
              </li>
              <li>
                <strong>Total Used:</strong> {usage.totalStorage} ({usage.storageUsagePercentage})
              </li>
              <li>
                <strong>Total Capacity:</strong> {usage.storageCapacity}
              </li>
              <li>
                <strong>Operations:</strong> {usage.operations.classA} Class A,{' '}
                {usage.operations.classB} Class B
              </li>
            </ul>
            <div className={clsx('analytics__storage-guage')}>
              <R2StorageGauge usage={usage} />
            </div>
          </div>
        </div>
      </Gutter>
    </DefaultTemplate>
  );
};
