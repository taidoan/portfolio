import type { DividerBlockProps } from '@/payload-types';
import { Divider } from '@/components/ui/Divider';

export const DividerBlock = ({
  weight,
  width,
  centered,
  color,
  opacity,
  className,
  type,
}: DividerBlockProps) => {
  return (
    <Divider
      weight={(weight as DividerBlockProps['weight']) || 'thin'}
      width={(width as DividerBlockProps['width']) || 'default'}
      centered={centered as boolean}
      color={(color as DividerBlockProps['color']) || 'primary'}
      opacity={opacity as number}
      className={className as string}
      type={(type as DividerBlockProps['type']) || 'content'}
    />
  );
};
