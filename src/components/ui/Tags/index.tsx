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

const TagLink = ({ ...props }: LinkProps) => <Link {...props} className={style.tag} />;

export type TagProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement | HTMLAnchorElement>;
} & (
  | { href?: never; children: React.ReactNode }
  | ({ href: string; children: React.ReactNode } & LinkProps)
);

export const Tag = ({ className, href, onClick, ...props }: TagProps) => {
  if (href) {
    return <TagLink href={href} onClick={onClick} {...props} />;
  }

  return <TagSpan className={className} onClick={onClick} {...props} />;
};
