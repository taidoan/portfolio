import type { Tag as TagType } from '@/payload-types';
import style from './style.module.scss';
import clsx from 'clsx';

import { Tag, TagsContainer } from '@/components/ui/Tags';

export type TaggedWithProps = {
  className?: string;
  showTitle: boolean;
  title?: string;
  numberOfTags: number;
  tags: TagType[];
};

export const TaggedWith = ({
  className,
  showTitle = true,
  title = 'Tagged With:',
  numberOfTags = 8,
  tags,
}: TaggedWithProps) => {
  return (
    <section className={clsx(style.container, className)}>
      {showTitle && <h2 className={clsx('section-heading', style.title)}>{title}</h2>}
      <TagsContainer>
        {tags.slice(0, numberOfTags).map((tag) => (
          <Tag
            key={tag.id}
            href={`/search?query=${encodeURI(tag.name)}&collection=tags`}
            variant='border'
            color='light-grey'
          >
            {tag.name}
          </Tag>
        ))}
      </TagsContainer>
    </section>
  );
};
