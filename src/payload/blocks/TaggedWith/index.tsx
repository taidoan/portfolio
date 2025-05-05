import type { TaggedWithBlockProps } from '@/payload-types';

export type Props = {
  className?: string;
} & TaggedWithBlockProps;

export const TaggedWithBlock = ({ className, showTitle, title, numberOfTags }: Props) => {
  return <>Tagged with blocks test</>;
};
