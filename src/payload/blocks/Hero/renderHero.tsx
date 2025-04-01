import type { HeroBlockProps } from '@/payload-types';
import { LargeHero } from './Large';
import { MediumHero } from './Medium';
import { LowImpactHero } from './LowImpact';
import type { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const defaultHeroes: Record<
  'medium' | 'large',
  React.FC<HeroBlockProps & { breadcrumbsData?: Breadcrumbs }>
> = {
  medium: MediumHero,
  large: LargeHero,
};

type RenderHeroProps = {
  heroData: HeroBlockProps;
  breadcrumbsData?: Breadcrumbs;
};

export const RenderHero: React.FC<RenderHeroProps> = ({ heroData, breadcrumbsData }) => {
  const { type, heroStyle } = heroData;

  if (!type || !heroStyle) return null;

  const Heroes =
    heroStyle === 'lowImpact' ? LowImpactHero : type in defaultHeroes ? defaultHeroes[type] : null;

  if (!Heroes) return null;

  return <Heroes {...heroData} breadcrumbsData={breadcrumbsData} />;
};
