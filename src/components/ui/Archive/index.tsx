'use client';
import type { CardData } from '../Card';
import type { Category, Project, Service } from '@/payload-types';
import type { ServiceWithDescription, FilterCategory } from '../Filter/types';
import clsx from 'clsx';
import { Card, CardBody, CardTitle, CardImage, CardContent } from '@/components/ui/Card';
import * as m from 'motion/react-m';
import { LazyMotion, domAnimation } from 'motion/react';
import { useState, JSX } from 'react';
import { Filter } from '@components/ui/Filter';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import { Carousel } from '../Carousel';
import style from './style.module.scss';
import { RichText } from '@/components/ui/RichText';
import {
  IconFiltersFilled,
  IconDeviceDesktopFilled,
  IconAdCircleFilled,
  IconPaintFilled,
  IconPaletteFilled,
} from '@tabler/icons-react';

const isProject = (
  data: CardData,
): data is Pick<
  Project,
  'title' | 'slug' | 'thumbnail' | 'id' | 'details' | 'url' | 'categories'
> => {
  return 'thumbnail' in data;
};

const isService = (
  data: CardData,
): data is Pick<Service, 'title' | 'slug' | 'image' | 'id' | 'description'> => {
  return 'image' in data;
};

export type Props = {
  data: CardData[];
  categories?: Category[] | ServiceWithDescription[] | FilterCategory[];
  className?: string;
  filterShowAll?: boolean;
  type?: 'projects' | 'services';
  view?: 'gallery' | 'list';
};

function isCategory(
  category: string | Category | Pick<Category, 'title' | 'slug' | 'id'>,
): category is Category | Pick<Category, 'title' | 'slug' | 'id'> {
  return typeof category !== 'string' && 'id' in category;
}

export const Archive = ({
  data,
  categories,
  className,
  filterShowAll,
  type = 'projects',
  view = 'gallery',
  ...rest
}: Props) => {
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFilterChange = (category: string | null) => {
    setSelectedCategory(category);
    console.log(selectedCategory);
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

  const isList = view === 'list';
  const isGallery = view === 'gallery';

  const renderListItems = (item: CardData) => {
    const content =
      type === 'projects' && isProject(item) && item.details?.type ? (
        <p>{item.details.type.replace(/`s/g, '')}</p>
      ) : type === 'services' && isService(item) && item.description ? (
        <RichText data={item.description} />
      ) : null;

    return (
      <m.div
        key={item.id}
        initial={{ opacity: 0, x: 0, y: 150, scale: 0 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -150, y: 0, scale: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        layout
        className={style['archive__item--list']}
      >
        <Card data={item} href={`${type}/${item.slug}`}>
          <CardBody>
            <CardImage className={style['archive__item-image']} borderRadius='all' align='left' />
            <CardContent>
              <CardTitle />
              <p>{content}</p>
            </CardContent>
          </CardBody>
        </Card>
      </m.div>
    );
  };

  const renderGalleryItems = (item: CardData) => {
    const content =
      type === 'projects' && isProject(item) && item.details?.type ? (
        <p>{item.details.type.replace(/`s/g, '')}</p>
      ) : type === 'services' && isService(item) && item.description ? (
        <RichText data={item.description} />
      ) : null;
    return (
      <m.div
        key={item.id}
        initial={{ opacity: 0, x: 150, y: 30, scale: 0 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -150, y: -30, scale: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        layout
      >
        <Card
          data={item}
          relation={type}
          href={`${type}/${item.slug}`}
          target='_blank'
          title={item.title}
        >
          <CardBody>
            <CardImage borderRadius='top' align='top' />
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

    if (isList) {
      return filteredData.map(renderListItems);
    }

    if (isGallery) {
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
          {filteredData.map(renderGalleryItems)}
        </Carousel>
      );
    }

    return (
      <Alert severity='error'>
        <AlertTitle>Invalid View</AlertTitle>Invalid view was set.
      </Alert>
    );
  };

  const iconMap: Record<string, JSX.Element> = {
    all: <IconFiltersFilled />,
    branding: <IconPaletteFilled />,
    digital: <IconDeviceDesktopFilled />,
    marketing: <IconAdCircleFilled />,
    print: <IconPaintFilled />,
  };

  return (
    <section className={clsx(className, 'archive__container')} {...rest}>
      {hasCategories ? (
        <Filter
          categories={categories || []}
          selectedCategory={selectedCategory}
          onSelectCategoryAction={handleFilterChange}
          allButtonLabel='All'
          showAllButton={filterShowAll}
          iconMap={iconMap}
        />
      ) : (
        <Alert severity='error'>
          <AlertTitle>No categories found</AlertTitle>Filter can not be displayed as no categories
          were found.
        </Alert>
      )}

      <LazyMotion features={domAnimation}>{renderContent()}</LazyMotion>
    </section>
  );
};
