import type { Media } from '@/payload-types';

export const isMedia = (value: string | Media | undefined): value is Media => {
  return typeof value === 'object' && value !== null && 'filename' in value;
};
