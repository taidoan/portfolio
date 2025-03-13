'use client';
import { JSX, useState, useMemo } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';

import type { TabbedContentProps } from './types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { isMedia } from '@/lib/utilities/isMedia';
import { getHref } from '@/lib/utilities/getHref';

import { Filter } from '../Filter';
import { RichText } from '../RichText';
import { Alert, AlertTitle } from '../Alert';
import { Card, CardBody } from '../Card';
import { Carousel } from '../Carousel';
import { Button } from '../Button';
import { ImageMedia } from '../Media/Image';
import {
  IconAppWindow,
  IconPalette,
  IconPencil,
  IconCode,
  IconAdCircle,
} from '@tabler/icons-react';

const ICON_MAP: Record<string, JSX.Element> = {
  branding: <IconPalette stroke={2} />,
  'ui-ux': <IconAppWindow stroke={2} />,
  'graphic-design': <IconPencil stroke={2} />,
  development: <IconCode stroke={2} />,
  marketing: <IconAdCircle stroke={2} />,
};

export const TabbedContent = ({ className, categories = [] }: TabbedContentProps) => {
  const [activeCategory, setActiveCategory] = useState(
    categories.length > 0 ? categories[0].id : null,
  );

  const activeContent = useMemo(
    () => categories.find((category) => category.id === activeCategory),
    [categories, activeCategory],
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

  const hasItems = activeContent?.items && activeContent.items.length > 0;
  const isFirstCategory = activeCategory === categories[0].id;

  const href = activeContent?.link ? getHref(activeContent.link) : null;
  if (!href) return null;

  const newTabProps =
    activeContent?.link && activeContent.link.newTab
      ? { rel: 'noopener noreferrer', target: '_blank' }
      : {};

  const contentClasses = clsx(style.filter__content, {
    [style['filter__content--first-cat-active']]: isFirstCategory,
  });

  const renderDescription = (description: string | DefaultTypedEditorState | undefined) => {
    if (!description) return null;

    return typeof description !== 'string' ? <RichText data={description} /> : <p>{description}</p>;
  };

  return (
    <section className={clsx(className, 'tabbed-content')} data-testid='tabbed-content'>
      <Card>
        <CardBody className={style.filter__block}>
          <Filter
            categories={categories}
            selectedCategory={activeCategory}
            onSelectCategoryAction={handleSelectCategory}
            containerClassName={style.filter__container}
            buttonClassName={style.filter__button}
            buttonActiveClassName={style['filter__button--active']}
            iconMap={ICON_MAP}
          />

          <div className={contentClasses}>
            {activeContent ? (
              <div className={style['filter__content-wrapper']}>
                <div className={style['filter__content-text']}>
                  <h3 className='sub-heading'>
                    {activeContent.title}
                    <span className='accent-dot'>.</span>
                  </h3>
                  {renderDescription(activeContent.description)}
                </div>
                {activeContent?.link && href && (
                  <Button
                    href={href}
                    color={activeContent.link.color || undefined}
                    shadow={activeContent.link.buttonShadow || undefined}
                    className={activeContent.link.className || undefined}
                    {...newTabProps}
                  >
                    {activeContent.link.label}
                  </Button>
                )}
              </div>
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
              {activeContent?.items?.map((item) => (
                <div key={item.id} className={style.filter__item}>
                  {item.image && (
                    <ImageMedia
                      src={
                        isMedia(item.image) && item.image.filename
                          ? item.image.filename.trim()
                          : null
                      }
                      alt={item.image.alt || ''}
                      width={item.image.width}
                      height={item.image.height}
                      className={style['filter__item-image']}
                    />
                  )}
                  <div className={style['filter__item-content']}>
                    <h4 className={style['filter__item-title']}>{item.title}</h4>

                    {renderDescription(item.description)}
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </CardBody>
      </Card>
    </section>
  );
};
