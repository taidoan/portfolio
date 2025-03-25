import type { Project, Service } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import clsx from 'clsx';

import { ImageMedia } from '@components/ui/Media/Image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import style from './style.module.scss';

export const SlugPageHero = ({
  heroData,
  breadcrumbsData,
}: {
  heroData: Omit<
    Project & Service,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'description'
    | 'items'
    | 'ctaLink'
    | 'galleryOptions'
    | 'layout'
  > & {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  breadcrumbsData: BreadcrumbsType;
}) => {
  const { title, details, hero } = heroData;
  const image = hero.backgroundImage;

  const heroClasses = clsx('section', style.hero, {
    [style['hero--blurred']]: hero.blurredBackground === 'true',
  });

  return (
    <section className={heroClasses}>
      {typeof image === 'object' && (
        <ImageMedia src={image?.filename || null} alt={image?.alt || ''} fill />
      )}
      <div className='hero__text'>
        <span className={style.hero__subtitle}>
          {hero.typeOverride ? hero.typeOverride : details?.type}
        </span>
        <h1>{hero.titleOverride ? hero.titleOverride : title}</h1>
      </div>
      {hero.breadcrumbs?.showBreadcrumb === 'true' && (
        <Breadcrumbs
          breadcrumbs={breadcrumbsData}
          container={hero.breadcrumbs.breadcrumbContainer || 'boxed'}
          background={hero.breadcrumbs.breadcrumbBackground || 'translucent'}
        />
      )}
    </section>
  );
};
