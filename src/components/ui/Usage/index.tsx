'use client';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // ok here

type Usage = {
  usedStorageSizeNoFormat: number;
  totalStorageBytesNoFormat: number;
  storageUsagePercentage: string;
  totalStorage: string;
  storageCapacity: string;
};

export function R2StorageGauge({ usage }: { usage: Usage }) {
  return (
    <CircularProgressbar
      value={usage.usedStorageSizeNoFormat}
      maxValue={usage.totalStorageBytesNoFormat}
      text={usage.storageUsagePercentage}
    />
  );
}
