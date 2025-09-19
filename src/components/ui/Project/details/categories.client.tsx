'use client';
import type { Category } from '@/payload-types';
import Link from 'next/link';
import { useState } from 'react';
import { DetailsItem } from './components';
import { Button } from '../../Button';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { getServerSideURL } from '@/lib/utilities/getURLs';
import style from './style.module.scss';

type DetailsCategoriesProps = {
  categories: Category[];
};

export const DetailsCategories = ({ categories }: DetailsCategoriesProps) => {
  const [showAll, setShowAll] = useState(false);

  const filteredCategories = categories
    .filter(
      (category) =>
        category &&
        typeof category.id === 'string' &&
        typeof category.title === 'string' &&
        typeof category.slug === 'string',
    )
    .sort((a, b) => {
      const aHasParent = !!a.parentCategory;
      const bHasParent = !!b.parentCategory;
      if (aHasParent === bHasParent) return 0;
      return aHasParent ? 1 : -1;
    });

  const visibleCategories = showAll ? filteredCategories : filteredCategories.slice(0, 2);

  return (
    <DetailsItem key='categories' type='categories' className={style['details__categories']}>
      <div className={style['details__categories-list']}>
        {visibleCategories.map((category, idx) => {
          const isLast = idx === visibleCategories.length - 1;
          const isShowMoreActive = !showAll && filteredCategories.length > 2;
          return (
            <span key={category.id}>
              <Link
                href={`${getServerSideURL()}/categories/${category.slug}`}
                rel='noopener noreferrer'
              >
                {category.title}
              </Link>
              {isLast ? (isShowMoreActive ? '...' : '') : ', '}
            </span>
          );
        })}
      </div>
      {filteredCategories.length > 2 && (
        <Button
          type='button'
          action={() => setShowAll((prev) => !prev)}
          shape='circle'
          color='light-grey'
          hoverColor='accent'
          title='Show more categories'
          className={style['details__show-more-btn']}
        >
          {showAll ? <IconMinus /> : <IconPlus />}
        </Button>
      )}
    </DetailsItem>
  );
};
