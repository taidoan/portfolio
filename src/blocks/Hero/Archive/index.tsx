import type { Category } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import { clsx } from 'clsx';

import { RichText } from '@/components/ui/RichText';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import style from './../LowImpact/style.module.scss';

export type ArchiveHeroProps = {
  heroData: Pick<Category, 'title' | 'heroContent' | 'breadcrumb'>;
  breadcrumbsData?: BreadcrumbsType;
};

export const ArchiveHero = ({ heroData, breadcrumbsData }: ArchiveHeroProps) => {
  const { title, heroContent, breadcrumb } = heroData;
  console.log(breadcrumb);

  return (
    <section className={style.hero}>
      <h2 className='section-heading'>Archive</h2>
      <h1>{title}</h1>
      {breadcrumb && (
        <Breadcrumbs breadcrumbs={breadcrumbsData} container={breadcrumb.breadcrumbContainer} />
      )}
      {heroContent && <RichText data={heroContent} />}
    </section>
  );
};
