'use client';

import type { AnalyticsResponse, CurrentUsage } from '@/app/(app)/api/metrics/cloudflare/types';

import Link from 'next/link';
import clsx from 'clsx';
import style from './../../style.module.scss';
import { useEffect } from 'react';
import { Gutter } from '@payloadcms/ui';
import { formatDate } from '@/lib/utilities/formatDate';
import { R2StorageGauge } from '@/components/ui/Usage';
import { IconCalendar, IconBucket } from '@tabler/icons-react';
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
        label: 'Cloudflare',
      },
    ]);
  }, [setStepNav]);

  return (
    <Gutter>
      <h1>Cloudflare Metrics</h1>
      <div className={clsx(style.divider)} />
      <div className={clsx(style.view__intro)}>
        <div>
          <h2>R2 Object Storage</h2>
          <p>Here you can view some basic information about your R2 storage.</p>
        </div>
        <Link
          href='https://developers.cloudflare.com/r2/'
          target='_blank'
          className={clsx('btn', 'btn--size-large', 'btn--style-primary', style.link)}
        >
          Documentation
        </Link>
      </div>

      <div className={clsx(style['date-range'])}>
        <div className={clsx(style['info-item'])}>
          <IconBucket className={clsx(style.icon)} />
          <strong>Bucket Name:</strong>
          <span>{r2Analytics.bucketName}</span>
        </div>

        <div className={clsx(style['info-item'])}>
          <IconCalendar className={clsx(style.icon)} />
          <strong>Date Range:</strong>
          <span>{`${formatDate(date.startDate)} - ${formatDate(date.endDate)}`}</span>
        </div>
      </div>

      <div className={clsx(style.container, style['container--grid'])}>
        <div className={clsx('card', style['metric-card'])} data-metric='object-count'>
          <h3 className={clsx(style['metric-card__title'])}>Object Count</h3>
          <p className={clsx(style['metric-card__value'])}>{usage.objectCount}</p>
        </div>

        <div className={clsx('card', style['metric-card'])} data-metric='operations-a'>
          <h3 className={clsx(style['metric-card__title'])}>Operations A</h3>
          <p className={clsx(style['metric-card__value'])}>{usage.operations.classA}</p>
        </div>

        <div className={clsx('card', style['metric-card'])} data-metric='operations-b'>
          <h3 className={clsx(style['metric-card__title'])}>Operations B</h3>
          <p className={clsx(style['metric-card__value'])}>{usage.operations.classB}</p>
        </div>

        <div className={clsx('card', style['metric-card'])} data-metric='total-used'>
          <h3 className={clsx(style['metric-card__title'])}>Total Used</h3>
          <p className={clsx(style['metric-card__value'])}>
            {usage.totalStorage}
            <span className={clsx(style['metric-card__value--suffix'])}>
              {' '}
              ({usage.storageUsagePercentage})
            </span>
          </p>
        </div>

        <div className={clsx('card', style['metric-card'])} data-metric='storage-capacity'>
          <h3 className={clsx(style['metric-card__title'])}>Total Capacity</h3>
          <p className={clsx(style['metric-card__value'])}>{usage.storageCapacity}</p>
        </div>

        <div className={clsx('card', style['metric-card'])} data-metric='gauge'>
          <R2StorageGauge usage={usage} />
        </div>
      </div>
    </Gutter>
  );
};
