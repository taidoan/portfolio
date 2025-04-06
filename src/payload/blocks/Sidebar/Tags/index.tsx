'use client';
import type { SidebarTagsBlockProps, Tag as TagType } from '@/payload-types';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import style from '@/components/layout/Sidebar/style.module.scss';
import { queryTags } from '@utilities/queries/queryTags';

import { Divider } from '@components/ui/Divider';
import { TagsContainer, Tag } from '@components/ui/Tags';
import { Spinner } from '@components/ui/Spinner';
import { IconSquareRoundedPlusFilled, IconSquareRoundedMinusFilled } from '@tabler/icons-react';

export type Props = {
  className?: string;
} & SidebarTagsBlockProps;

export const SidebarTagsBlock = ({
  className,
  title,
  tagsToShow: initialTagsToShow = 8,
}: Props) => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [tagsToShow, setTagsToShow] = useState(initialTagsToShow);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const response = await queryTags();
        if (response && response.docs) {
          setTags(response.docs);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleExpand = () => {
    setTagsToShow(tagsToShow + 8);
  };

  const handleCollapse = () => {
    setTagsToShow(Math.max(initialTagsToShow, tagsToShow - 8));
  };

  const showExpandButton = tags.length > tagsToShow;
  const showCollapseButton = tagsToShow > initialTagsToShow;

  return (
    <section className={clsx(className, style.sidebar__block)}>
      <div className={style['sidebar__block-header']}>
        <h2 className={style['sidebar__block-title']}>{title || 'Tags'}</h2>
        {showExpandButton && (
          <button
            className={style['sidebar__block-button']}
            onClick={handleExpand}
            aria-label='Expand'
          >
            <IconSquareRoundedPlusFilled className={style['sidebar__block-icon']} />
          </button>
        )}
        {showCollapseButton && (
          <button
            className={style['sidebar__block-button']}
            onClick={handleCollapse}
            aria-label='Collapse'
          >
            <IconSquareRoundedMinusFilled
              className={style['sidebar__block-icon']}
              onClick={handleCollapse}
            />
          </button>
        )}
      </div>
      <Divider
        type='content'
        color='light-grey'
        className={style['sidebar__block-divider']}
        width='full'
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <TagsContainer>
          {tags.slice(0, tagsToShow).map((tag) => (
            <Tag key={tag.id} href={`/search?query=${encodeURI(tag.name)}&collection=tags`}>
              {tag.name}
            </Tag>
          ))}
        </TagsContainer>
      )}
    </section>
  );
};
