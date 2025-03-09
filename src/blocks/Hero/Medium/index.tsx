import type { HeroBlockProps } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RichText } from '@/components/ui/RichText';
import clsx from 'clsx';
import style from './style.module.scss';
import { getCDNURL } from '@/lib/utilities/getURLs';

export type MediumHeroProps = HeroBlockProps & {
  breadcrumbsData?: BreadcrumbsType;
};

export const MediumHero = ({
  image,
  richText,
  showBreadcrumb,
  breadcrumbsData,
  breadcrumbContainer,
  breadcrumbBackground,
}: MediumHeroProps) => {
  const sectionClasses = clsx('section', style.hero);

  return (
    <section
      className={sectionClasses}
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.18) 44.47%, rgba(255, 255, 255, 0) 100%),
        url('${getCDNURL()}/hero.svg') 50% / cover no-repeat`,
      }}
    >
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
