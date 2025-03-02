import type { HeroBlockProps } from '@/payload-types';
import { LargeHero } from './Large';
import { MediumHero } from './Medium';
import { SmallHero } from './Small';

const heroes: Record<HeroBlockProps['type'], React.FC<HeroBlockProps>> = {
  small: SmallHero,
  medium: MediumHero,
  large: LargeHero,
};

export const RenderHero: React.FC<{ heroData: HeroBlockProps }> = ({ heroData }) => {
  const { type } = heroData;

  if (!type) return null;

  const Heroes = heroes[type];
  if (!Heroes) return null;

  return <Heroes {...heroData} />;
};
