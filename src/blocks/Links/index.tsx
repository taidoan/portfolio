import type { LinksBlockProps } from '@/payload-types';
import { Button } from '@/components/ui/Button';
import { getHref } from '@/utilities/getHref';
import clsx from 'clsx';

export type Props = {
  className?: string;
} & LinksBlockProps;

export const LinksBlock = ({ className, link }: Props) => {
  const href = getHref(link);
  if (!href) return null;

  const newTabProps = link.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};
  const linkClasses = clsx(className, {
    [`${link.className}`]: link.className,
  });

  return (
    <Button
      href={href}
      {...newTabProps}
      color={link.color || undefined}
      className={linkClasses}
      shadow={link.buttonShadow || undefined}
    >
      {link.label}
    </Button>
  );
};
