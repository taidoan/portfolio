import type { MediaBlockProps } from '@/payload-types';
import { BaseMediaBlock } from './base';

export type Props = {
  className?: string;
} & MediaBlockProps;

export const MediaBlock = (props: Props) => {
  return <BaseMediaBlock {...props} />;
};
