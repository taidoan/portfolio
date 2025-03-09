import type { HeroBlockProps } from '@/payload-types';
import { RichText } from '@/components/ui/RichText';
import style from './style.module.scss';
import clsx from 'clsx';
import { getCDNURL } from '@/lib/utilities/getURLs';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

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
}: LargeHeroProps) => {
  const heroClasses = clsx('section', style.hero);

  return (
    <section
      className={heroClasses}
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.18) 44.47%, rgba(255, 255, 255, 0) 100%),
    url('${getCDNURL()}/hero.svg') 50% / cover no-repeat`,
      }}
    >
      <div className={style.container}>{richText && <RichText data={richText} />}</div>
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
