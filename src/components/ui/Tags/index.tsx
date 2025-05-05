import Link from 'next/link';
import type { LinkProps } from 'next/link';
import clsx from 'clsx';
import style from './style.module.scss';
import * as React from 'react';

export const TagsContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(className, style.tags__container)} {...props} />
);

const TagSpan = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={clsx(className, style.tag)} {...props} />
);

const TagLink = ({ className, ...props }: { className?: string } & LinkProps) => (
  <Link {...props} className={clsx(className, style.tag)} />
);

export type TagProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement | HTMLAnchorElement>;
  variant: 'default' | 'border';
  color: 'default' | 'light-grey' | 'slate' | 'dark-grey';
} & (
  | { href?: never; children: React.ReactNode | string }
  | ({ href: string; children: React.ReactNode | string } & LinkProps)
);

export const Tag = ({
  className,
  href,
  onClick,
  variant = 'default',
  color = 'default',
  ...props
}: TagProps) => {
  const classes = clsx(className, {
    [style['tag-variant--bordered']]: variant === 'border',
    [style[`tag-clr--${color}`]]: color !== 'default',
  });

  if (href) {
    return <TagLink href={href} onClick={onClick} className={classes} {...props} />;
  }

  return <TagSpan onClick={onClick} className={classes} {...props} />;
};
