import type { CTABlockProps } from '@/payload-types';
import { CTA } from '@components/layout/CTA';

export type Props = {
  className?: string;
} & CTABlockProps;

export const CTABlock = ({ className, content, link, variant, color, borderRadius }: Props) => {
  return (
    <CTA
      content={content}
      link={link}
      className={className}
      color={color || 'secondary'}
      variant={variant || 'fill'}
      borderRadius={borderRadius || 'medium'}
    />
  );
};
