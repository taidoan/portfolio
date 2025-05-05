import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import clsx from 'clsx';

import style from './style.module.scss';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export type PostHeroProps = {
  data: {
    category: string;
    title: string;
    author: string | null | undefined;
    publishedDate: string;
    excerpt?: string | null | undefined;
    breadcrumbsData?: BreadcrumbsType;
  };
};

export const PostHero = ({ data }: PostHeroProps) => {
  return (
    <section className={clsx(style.hero, 'section')}>
      <div className='hero__text'>
        <h2 className='section-heading'>{data.category}</h2>
        <h1>{data.title}</h1>
      </div>
      <div className={style.meta}>
        <span>{data.publishedDate}</span>
        <span className={style.meta__seperator}>&#9679;</span>
        <span>Written by {data.author}</span>
      </div>
      <p className={style.excerpt}>{data.excerpt}</p>
      <Breadcrumbs
        breadcrumbs={data.breadcrumbsData}
        container='outlined'
        outlineColor='urban-steel'
        className={style.breadcrumbs}
      />
    </section>
  );
};
