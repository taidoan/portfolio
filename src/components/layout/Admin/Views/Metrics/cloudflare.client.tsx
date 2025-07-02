'use client';

import type { AnalyticsResponse, CurrentUsage } from '@/app/(app)/api/metrics/cloudflare/types';

import { useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Gutter } from '@payloadcms/ui';
import { formatDate } from '@/lib/utilities/formatDate';
import { R2StorageGauge } from '@/components/ui/Usage';
import { IconCalendar } from '@tabler/icons-react';
import { useStepNav } from '@payloadcms/ui';

interface CloudflareMetricsClientProps {
  r2Analytics: AnalyticsResponse;
  usage: CurrentUsage;
  date: AnalyticsResponse['dateRange'];
}

export const CloudflareMetricsClient: React.FC<CloudflareMetricsClientProps> = ({
  r2Analytics,
  usage,
  date,
}) => {
  const { setStepNav } = useStepNav();
  useEffect(() => {
    setStepNav([
      {
        label: 'Cloudflare Metrics',
      },
    ]);
  }, [setStepNav]);

  return (
    <Gutter>
      <div className={clsx('view__header')}>
        <h1>Cloudflare Metrics</h1>
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
  );
};
