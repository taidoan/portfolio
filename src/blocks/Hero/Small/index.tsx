import type { HeroBlockProps } from '@/payload-types';

export type SmallHeroProps = HeroBlockProps;

export const SmallHero = ({ image, richText }: SmallHeroProps) => {
  return <div>Small Hero</div>;
};
