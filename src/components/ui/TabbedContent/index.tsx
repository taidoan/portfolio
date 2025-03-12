'use client';
import { JSX, useState } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';

import type { TabbedContentProps } from './types';
import { isMedia } from '@/lib/utilities/isMedia';

import { Filter } from '../Filter';
import { RichText } from '../RichText';
import { Alert, AlertTitle } from '../Alert';
import { Card, CardBody } from '../Card';
import { Carousel } from '../Carousel';
import { ImageMedia } from '../Media/Image';
import {
  IconAppWindow,
  IconPalette,
  IconPencil,
  IconCode,
  IconAdCircle,
} from '@tabler/icons-react';

export const TabbedContent = ({ className, categories = [], ...rest }: TabbedContentProps) => {
  const [activeCategory, setActiveCategory] = useState(
    categories.length > 0 ? categories[0].id : null,
  );

  const handleSelectCategory = (category: string | null) => {
    setActiveCategory(category);
  };

  if (!categories || categories.length === 0) {
    return (
      <Alert severity='error'>
        <AlertTitle>No Categories Available</AlertTitle>
        <p>There are no categories to display at the moment.</p>
      </Alert>
    );
  }

  const filteredContent = categories.filter((category) => category.id === activeCategory);

  const hasItems = filteredContent.some((item) => item.items && item.items.length > 0);

  const iconMap: Record<string, JSX.Element> = {
    '/services/branding': <IconPalette stroke={2} />,
    '/services/ui-ux': <IconAppWindow stroke={2} />,
    '/services/graphic-design': <IconPencil stroke={2} />,
    '/services/development': <IconCode stroke={2} />,
    marketing: <IconAdCircle stroke={2} />,
  };

  const isFirstCategory = activeCategory === categories[0].id;

  const contentClasses = clsx(style.filter__content, {
    [style['filter__content--first-cat-active']]: isFirstCategory,
  });

  return (
    <section {...rest} className={clsx(className, 'tabbed-content')}>
      <Card>
        <CardBody className={style.filter__block}>
          <Filter
            categories={categories}
            selectedCategory={activeCategory}
            onSelectCategoryAction={handleSelectCategory}
            containerClassName={style.filter__container}
            buttonClassName={style.filter__button}
            buttonActiveClassName={style['filter__button--active']}
            iconMap={iconMap}
          />

          <div className={contentClasses}>
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <div key={item.id} className={style['filter__content-text']}>
                  <h3 className='sub-heading'>
                    {item.title}
                    <span className='accent-dot'>.</span>
                  </h3>
                  {item.description && typeof item.description !== 'string' ? (
                    <RichText data={item.description} />
                  ) : (
                    <p>{item.description}</p>
                  )}
                </div>
              ))
            ) : (
              <Alert severity='error'>
                <AlertTitle>No Content</AlertTitle>
                <p>Unable to find any content for this category.</p>
              </Alert>
            )}
          </div>

          {hasItems && (
            <Carousel
              direction='horizontal'
              pagination={true}
              disableAt='(min-width: 64em)'
              slideSpacing={32}
              autoHeight={true}
              buttonNavigation={true}
              wrapperClassName={style.filter__items__wrapper}
            >
              {filteredContent.flatMap(
                (filteredItem) =>
                  filteredItem.items?.map((item) => (
                    <div key={item.id} className={style.filter__item}>
                      {item.image && (
                        <ImageMedia
                          src={
                            isMedia(item.image) && item.image.filename
                              ? item.image.filename.trim()
                              : null
                          }
                          alt={item.image.alt}
                          width={item.image.width}
                          height={item.image.height}
                          className={style['filter__item-image']}
                        />
                      )}
                      <div className={style['filter__item-content']}>
                        <h4 className={style['filter__item-title']}>{item.title}</h4>
                        {item.description && typeof item.description !== 'string' ? (
                          <RichText data={item.description} />
                        ) : (
                          <p>{item.description}</p>
                        )}
                      </div>
                    </div>
                  )) || [],
              )}
            </Carousel>
          )}
        </CardBody>
      </Card>
    </section>
  );
};
