import type { HeroBlockProps } from '@/payload-types';
import type { Breadcrumbs as BreadcrumbsType } from '@/components/ui/Breadcrumbs';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export type SmallHeroProps = HeroBlockProps & {
  breadcrumbsData?: BreadcrumbsType;
};

export const SmallHero = ({
  showBreadcrumb,
  breadcrumbsData,
  breadcrumbContainer,
  breadcrumbBackground,
}: SmallHeroProps) => {
  return (
    <div>
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
