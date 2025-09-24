import type { HeroBlockProps } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import clsx from 'clsx';

import { RichText } from '@/components/ui/RichText';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ImageMedia } from '@components/ui/Media/Image';
import style from './style.module.scss';

export type LargeHeroProps = HeroBlockProps & {
  breadcrumbsData?: BreadcrumbsType;
};

export const LargeHero = ({
  image,
  richText,
  showBreadcrumb,
  breadcrumbsData,
  breadcrumbContainer,
  breadcrumbBackground,
  blurredBackground,
}: LargeHeroProps) => {
  const heroClasses = clsx('section', style.hero, {
    [style['hero--blurred']]: blurredBackground === 'true',
  });

  return (
    <section className={heroClasses}>
      {typeof image === 'object' && (
        <ImageMedia
          src={image?.filename || null}
          alt={image?.alt || ''}
          fill
          loading='lazy'
          priority={true}
        />
      )}
      {richText && <RichText data={richText} />}
      {showBreadcrumb && breadcrumbsData && breadcrumbsData.length > 0 && (
        <Breadcrumbs
          breadcrumbs={breadcrumbsData}
          container={breadcrumbContainer || 'none'}
          background={breadcrumbBackground || 'none'}
        />
      )}
    </section>
  );
};
