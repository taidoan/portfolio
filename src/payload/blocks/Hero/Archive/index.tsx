import type { Category } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import clsx from 'clsx';

import { RichText } from '@/components/ui/RichText';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import style from './style.module.scss';
import { Button } from '@/components/ui/Button';

export type ArchiveHeroProps = {
  heroData: Pick<Category, 'title' | 'heroContent' | 'breadcrumb' | 'description'>;
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
          container={breadcrumb.breadcrumbContainer || 'outlined'}
          outlineColor={breadcrumb.breadcrumbOutlineColor || 'urban-steel'}
          className={style.hero__breadcrumbs}
        />
      )}
      {heroContent ? (
        <RichText data={heroContent} />
      ) : (
        <>
          <p>{heroData.description}</p>
          <Button
            color='secondary'
            hoverColor='accent'
            href='/categories'
            styleOverrides={{
              alignSelf: 'flex-start',
            }}
            className='hero__cta'
          >
            All Categories
          </Button>
        </>
      )}
    </section>
  );
};
