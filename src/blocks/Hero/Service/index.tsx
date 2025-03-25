import type { Service } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import clsx from 'clsx';

import { Media } from '@components/ui/Media';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import style from './style.module.scss';

export const ServiceHero = ({
  heroData,
  breadcrumbsData,
}: {
  heroData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  breadcrumbsData: BreadcrumbsType;
}) => {
  const { title, hero } = heroData;
  const image = hero.backgroundImage;

  const heroClasses = clsx('section', style.hero, {
    [style['hero--blurred']]: hero.blurredBackground === 'true',
  });

  return (
    <section className={heroClasses}>
      {typeof image === 'object' && <Media src={image?.filename} alt={image?.alt || ''} fill />}
      <div className='hero__text'>
        <span className={style.hero__subtitle}>{hero.subtitle}</span>
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
