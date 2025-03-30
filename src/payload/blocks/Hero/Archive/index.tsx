import type { Category } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import clsx from 'clsx';

import { RichText } from '@/components/ui/RichText';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import style from './style.module.scss';

export type ArchiveHeroProps = {
  heroData: Pick<Category, 'title' | 'heroContent' | 'breadcrumb'>;
  breadcrumbsData?: BreadcrumbsType;
};

export const ArchiveHero = ({ heroData, breadcrumbsData }: ArchiveHeroProps) => {
  const { title, heroContent, breadcrumb } = heroData;

  return (
    <section className={clsx(style.hero, 'section')}>
      <h2 className='section-heading'>Archive</h2>
      <h1>{title}</h1>
      {breadcrumb && (
        <Breadcrumbs
          breadcrumbs={breadcrumbsData}
          container={breadcrumb.breadcrumbContainer}
          outlineColor={breadcrumb.breadcrumbOutlineColor}
          className={style.hero__breadcrumbs}
        />
      )}

      {heroContent && <RichText data={heroContent} />}
    </section>
  );
};
