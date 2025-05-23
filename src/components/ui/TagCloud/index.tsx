'use client';
import type { Tag as TagType } from '@/payload-types';

import { useState, useMemo } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';

import { Switcher, SwitcherButton } from '@/components/ui/Switcher';
import { TagsContainer, Tag } from '@/components/ui/Tags';

export type TagCloudProps = {
  tags: TagType[];
  showCount: boolean;
  className?: string;
};

export const TagCloud = ({ tags, showCount = true, className, ...props }: TagCloudProps) => {
  const [sort, setSort] = useState<'alphabetically' | 'size'>('alphabetically');

  const handleSortChange = (value: string) => {
    if (value === 'alphabetically' || value === 'size') {
      setSort(value);
    }
  };

  const sortedTags = useMemo(() => {
    const tagsCopy = [...tags];

    if (sort === 'alphabetically') {
      return tagsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return tagsCopy.sort((a, b) => {
        const aTotal = (a.relatedProjects?.docs || []).length + (a.relatedPosts?.docs || []).length;
        const bTotal = (b.relatedProjects?.docs || []).length + (b.relatedPosts?.docs || []).length;
        return bTotal - aTotal;
      });
    }
  }, [tags, sort]);

  return (
    <div className={clsx(style['tag-cloud__container'], className)} {...props}>
      <Switcher value={sort} onChange={handleSortChange}>
        <SwitcherButton value='alphabetically'>Alphabetically</SwitcherButton>
        <SwitcherButton value='size'>Size</SwitcherButton>
      </Switcher>
      <TagsContainer showCount={showCount}>
        {sortedTags.map((tag) => {
          const relatedProjects = tag.relatedProjects?.docs || [];
          const relatedPosts = tag.relatedPosts?.docs || [];
          const totalRelated = relatedProjects.length + relatedPosts.length;

          return (
            <Tag
              key={tag.id}
              color='default'
              href={`/search?query=${encodeURI(tag.name)}&collection=tags`}
              variant='border'
              size='large'
              count={totalRelated > 1 ? totalRelated : undefined}
            >
              {tag.name}
            </Tag>
          );
        })}
      </TagsContainer>
    </div>
  );
};
