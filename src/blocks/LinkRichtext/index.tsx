import type { LinksBlockRichtextProps } from '@/payload-types';
import { Button } from '@/components/ui/Button';
import { getHref } from '@/lib/utilities/getHref';
import clsx from 'clsx';
import style from './style.module.scss';

export type Props = {
  className?: string;
} & LinksBlockRichtextProps;

export const LinksRichtextBlock = ({ className, link }: Props) => {
  const href = getHref(link);
  if (!href) return null;

  const linkClasses = clsx(className, style.link, {
    [`${link.className}`]: link.className,
  });

  const newTabProps = link.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};

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
