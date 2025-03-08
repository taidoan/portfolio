import type { HeroBlockProps } from '@/payload-types';
import { LargeHero } from './Large';
import { MediumHero } from './Medium';
import { SmallHero } from './Small';
import type { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const heroes: Record<
  HeroBlockProps['type'],
  React.FC<HeroBlockProps & { breadcrumbsData?: Breadcrumbs }>
> = {
  small: SmallHero,
  medium: MediumHero,
  large: LargeHero,
};

type RenderHeroProps = {
  heroData: HeroBlockProps;
  breadcrumbsData?: Breadcrumbs;
};

export const RenderHero: React.FC<RenderHeroProps> = ({ heroData, breadcrumbsData }) => {
  const { type } = heroData;

  if (!type) return null;

  const Heroes = heroes[type];
  if (!Heroes) return null;

  return <Heroes {...heroData} breadcrumbsData={breadcrumbsData} />;
};
