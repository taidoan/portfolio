import type { HeroBlockProps } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import clsx from 'clsx';

import { RichText } from '@/components/ui/RichText';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { headingConverter } from '@/components/ui/RichText/converters/heading';
import style from './style.module.scss';

export type LowImpactHeroProps = HeroBlockProps & {
  breadcrumbsData?: BreadcrumbsType;
};

export const LowImpactHero = ({
  richText,
  showBreadcrumb,
  breadcrumbsData,
  breadcrumbBackground,
  breadcrumbContainer,
}: LowImpactHeroProps) => {
  const heroClasses = clsx(style.hero, 'section');

  return (
    <section className={heroClasses}>
      {richText && <RichText converters={headingConverter} data={richText} />}
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
