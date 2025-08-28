'use client';

import type { MetricsResponse } from '@/app/(app)/api/metrics/imagekit/types';

import clsx from 'clsx';
import style from './../../style.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStepNav } from '@payloadcms/ui';
import { formatDate } from '@/lib/utilities/formatDate';
import { formatBytes } from '@/lib/utilities/formatBytes';
import { Gutter } from '@payloadcms/ui';
import { IconCalendar } from '@tabler/icons-react';

type ImagekitMetricsClientProps = {
  data: MetricsResponse;
  startDate: string;
  endDate: string;
};

export const ImagekitMetricsClient = ({ data, startDate, endDate }: ImagekitMetricsClientProps) => {
  const { setStepNav } = useStepNav();
  const router = useRouter();

  const [from, setFrom] = useState(startDate);
  const [to, setTo] = useState(endDate);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStepNav([
      {
        label: 'ImageKit',
      },
    ]);
  }, [setStepNav]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fromDate = new Date(from);
    const toDate = new Date(to);
    const daysDiff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff > 90) {
      setError('Date range cannot exceed 90 days due to ImageKit API limitations.');
      return;
    }

    if (daysDiff < 0) {
      setError('End date must be after start date.');
      return;
    }

    setError(null);

    const params = new URLSearchParams();
    params.set('startDate', from);
    params.set('endDate', to);

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Gutter>
      <h1>Imagekit Metrics</h1>
      <div className={clsx(style.divider)} />
      <div className={clsx(style.view__intro)}>
        <div>
          <p>
            Here you can view some basic information about your Imagekit usage. The data by default
            is for the current month. You can also select a custom date range within the last 90
            days.
          </p>
        </div>
        <Link
          href='https://imagekit.io/docs'
          target='_blank'
          className={clsx('btn', 'btn--size-large', 'btn--style-primary', style.link)}
        >
          Documentation
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={clsx(style.form)}>
        <div className={clsx('field-type', 'text')}>
          <label htmlFor='from' className={clsx('field-label')}>
            From:
          </label>
          <input type='date' name='from' value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className={clsx('field-type', 'text')}>
          <label htmlFor='to' className={clsx('field-label')}>
            To:
          </label>
          <input type='date' name='to' value={to} onChange={(e) => setTo(e.target.value)} />
          {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
        </div>
        <div className={clsx('form-submit', style.test)}>
          <button type='submit' className={clsx('btn', 'btn--size-large', 'btn--style-primary')}>
            Get Usage
          </button>
        </div>
      </form>
      <div className={clsx(style['date-range'])}>
        <div className={clsx(style['info-item'])}>
          <IconCalendar className={clsx(style.icon)} />
          <strong>Date Range:</strong>
          <span>
            {formatDate(from)} - {formatDate(to)}
          </span>
        </div>
      </div>
      <div className={clsx(style.container)}>
        <div className={clsx('card', style['metric-card'])}>
          <h3 className={clsx(style['metric-card__title'])}>Bandwidth Usage</h3>
          <p className={clsx(style['metric-card__value'])}>{formatBytes(data.bandwidthBytes)}</p>
        </div>
        <div className={clsx('card', style['metric-card'])}>
          <h3 className={clsx(style['metric-card__title'])}>Media Library Usage</h3>
          <p className={clsx(style['metric-card__value'])}>
            {formatBytes(data.mediaLibraryStorageBytes)}
          </p>
        </div>
        <div className={clsx('card', style['metric-card'])}>
          <h3 className={clsx(style['metric-card__title'])}>Video Processing Units</h3>
          <p className={clsx(style['metric-card__value'])}>{data.videoProcessingUnitsCount}</p>
        </div>
        <div className={clsx('card', style['metric-card'])}>
          <h3 className={clsx(style['metric-card__title'])}>Original Cache Usage</h3>
          <p className={clsx(style['metric-card__value'])}>
            {formatBytes(data.originalCacheStorageBytes)}
          </p>
        </div>
      </div>
    </Gutter>
  );
};
