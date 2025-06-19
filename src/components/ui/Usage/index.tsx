'use client';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import style from './style.module.scss';

type Usage = {
  usedStorageSizeNoFormat: number;
  totalStorageBytesNoFormat: number;
  storageUsagePercentage: string;
  totalStorage: string;
  storageCapacity: string;
};

/**
 * Displays the usage of R2 storage.
 * @param {Usage} usage - The usage data.
 * @returns {React.ReactNode} - The usage gauge.
 */
export function R2StorageGauge({ usage }: { usage: Usage }) {
  return (
    <CircularProgressbarWithChildren
      value={usage.usedStorageSizeNoFormat}
      maxValue={usage.totalStorageBytesNoFormat}
      styles={buildStyles({
        trailColor: 'var(--theme-elevation-100)',
        pathColor: 'var(--theme-elevation-650)',
      })}
    >
      <div className={style['progress-gauge__text']}>
        <p className={style['progress-guage__lg-text']}>{usage.storageUsagePercentage}</p>
        <p>
          {usage.totalStorage} of {usage.storageCapacity}
        </p>
      </div>
    </CircularProgressbarWithChildren>
  );
}
