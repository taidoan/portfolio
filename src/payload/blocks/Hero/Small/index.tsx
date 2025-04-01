import type { HeroBlockProps } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export type SmallHeroProps = HeroBlockProps & {
  breadcrumbsData?: BreadcrumbsType;
};

export const SmallHero = ({
  image,
  richText,
  showBreadcrumb,
  breadcrumbsData,
  breadcrumbContainer,
  breadcrumbBackground,
}: SmallHeroProps) => {
  return (
    <div>
      Small Hero{' '}
      {showBreadcrumb && breadcrumbsData && breadcrumbsData.length > 0 && (
        <Breadcrumbs
          breadcrumbs={breadcrumbsData}
          container={breadcrumbContainer || 'none'}
          background={breadcrumbBackground || 'none'}
        />
      )}
    </div>
  );
};
