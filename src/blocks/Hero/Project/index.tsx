import type { Project } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import clsx from 'clsx';

import { ImageMedia } from '@components/ui/Media/Image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import style from './style.module.scss';

export const ProjectHero = ({
  heroData,
  breadcrumbsData,
}: {
  heroData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  breadcrumbsData: BreadcrumbsType;
}) => {
  const { title, details, hero } = heroData;
  const image = hero.backgroundImage;

  const heroClasses = clsx('project__section', style.hero, {
    [style['hero--blurred']]: hero.blurredBackground === 'true',
  });

  return (
    <section className={heroClasses}>
      {typeof image === 'object' && (
        <ImageMedia src={image?.filename || null} alt={image?.alt || ''} fill />
      )}
      <div className='hero__text'>
        <span className={style.hero__type}>
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
