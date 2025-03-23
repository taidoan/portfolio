import type { CTABlockProps } from '@/payload-types';
import { CTA } from '@components/layout/CTA';

export type Props = {
  className?: string;
} & CTABlockProps;

export const CTABlock = ({
  className,
  content,
  link,
  blockVariant,
  backgroundColour,
  borderRadius,
}: Props) => {
  return (
    <CTA
      content={content}
      link={link}
      className={className}
      color={backgroundColour || 'secondary'}
      variant={blockVariant || 'fill'}
      borderRadius={borderRadius || 'medium'}
    />
  );
};
