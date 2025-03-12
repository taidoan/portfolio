'use client';
import { useState, JSX } from 'react';
import clsx from 'clsx';
import * as m from 'motion/react-m';
import { LazyMotion, domAnimation } from 'motion/react';

import type { Category } from '@/payload-types';
import type { CardData } from '../Card';

import { Filter } from '@components/ui/Filter';
import { Alert, AlertTitle } from '@components/ui/Alert';
import { Card, CardBody, CardTitle, CardImage, CardContent } from '@/components/ui/Card';
import { Carousel } from '../Carousel';
import {
  IconFiltersFilled,
  IconDeviceDesktopFilled,
  IconAdCircleFilled,
  IconPaintFilled,
  IconPaletteFilled,
} from '@tabler/icons-react';
import style from './style.module.scss';

export type Props = {
  data: CardData[];
  categories?: Category[];
  className?: string;
  filterShowAll?: boolean;
  view?: 'grid' | 'list';
  relation: 'posts' | 'projects';
};

const isCategory = (category: string | Category | Pick<Category, 'title' | 'slug' | 'id'>) => {
  return typeof category !== 'string' && 'id' in category;
};

export const Archive = ({
  data,
  categories,
  className,
  filterShowAll,
  view = 'grid',
  relation = 'posts',
  ...rest
}: Props) => {
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isList = view === 'list';
  const isGrid = view === 'grid';

  const handleFilterChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const filteredData = selectedCategory
    ? data?.filter((item) => {
        if (!('categories' in item)) return false;

        const categories = item.categories || [];
        return categories.some((category) => {
          if (isCategory(category)) {
            return category.id === selectedCategory;
          }
          return false;
        });
      })
    : data;

  const renderItems = (item: CardData) => {
    const content =
      relation === 'posts' && item && 'excerpt' in item ? (
        <p>{item.excerpt}</p>
      ) : relation === 'projects' && item && 'details' in item && item.details?.type ? (
        <p>{item.details.type}</p>
      ) : null;
    return (
      <m.div
        key={item.id}
        initial={{ opacity: 0, x: 150, y: 30, scale: 0 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -150, y: -30, scale: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={clsx({ [style['archive__item--list']]: isList })}
        layout
      >
        <Card data={item} relation={relation} href={`${relation}/${item.slug}`}>
          <CardBody>
            <CardImage
              align={view === 'list' ? 'left' : 'top'}
              borderRadius={isList || relation === 'posts' ? 'all' : 'top'}
            />
            <CardContent>
              <CardTitle />
              {content}
            </CardContent>
          </CardBody>
        </Card>
      </m.div>
    );
  };

  const renderContent = () => {
    if (!filteredData || filteredData.length === 0) {
      return (
        <Alert severity='warning'>
          <AlertTitle>No Projects</AlertTitle>
          No projects were found under this category.
        </Alert>
      );
    }

    if (isGrid) {
      return (
        <Carousel
          direction='horizontal'
          pagination={true}
          disableAt='(min-width: 64em)'
          className={style['archive__gallery-container']}
          wrapperClassName={style['archive__gallery-wrapper']}
          buttonNavigation={true}
          slideSpacing={32}
        >
          {filteredData.map(renderItems)}
        </Carousel>
      );
    } else if (isList) {
      return filteredData.map(renderItems);
    }

    return (
      <Alert severity='error'>
        <AlertTitle>Invalid View</AlertTitle>
        Invalid view for the archive was set, please review and set either &apos;grid&apos; or
        &apos;list&apos;.
      </Alert>
    );
  };

  const iconMap: Record<string, JSX.Element> = {
    all: <IconFiltersFilled />,
    branding: <IconPaletteFilled />,
    digital: <IconDeviceDesktopFilled />,
    marketing: <IconAdCircleFilled />,
    print: <IconPaintFilled />,
    'graphic-design': <IconPaintFilled />,
  };

  return (
    <section className={clsx(className, 'archive__container')} {...rest}>
      {hasCategories ? (
        <Filter
          categories={categories}
          iconMap={iconMap}
          selectedCategory={selectedCategory}
          allButtonLabel='All'
          showAllButton={filterShowAll}
          onSelectCategoryAction={handleFilterChange}
        />
      ) : (
        <Alert severity='warning'>
          <AlertTitle>No categories found</AlertTitle>
          No categories were found
        </Alert>
      )}

      <div>
        <LazyMotion features={domAnimation}>{renderContent()}</LazyMotion>
      </div>
    </section>
  );
};
