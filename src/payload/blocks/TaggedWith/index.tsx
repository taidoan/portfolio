import type { TaggedWithBlockProps, Tag } from '@/payload-types';
import { TaggedWith } from '@/components/ui/TaggedWith';

export type Props = {
  className?: string;
} & TaggedWithBlockProps;

export const TaggedWithBlock = ({
  className,
  showTitle,
  title,
  numberOfTags,
  tags,
}: { tags: Tag[] } & Props) => {
  return (
    <TaggedWith
      className={className}
      showTitle={showTitle}
      title={title || 'Tagged With:'}
      numberOfTags={numberOfTags && numberOfTags > 0 ? numberOfTags : 8}
      tags={tags}
    />
  );
};
