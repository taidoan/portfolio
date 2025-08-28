import Link from 'next/link';
import type { LinkProps } from 'next/link';
import clsx from 'clsx';
import style from './style.module.scss';
import * as React from 'react';

export const TagsContainer = ({
  className,
  children,
  showCount = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { showCount?: boolean; children: React.ReactNode }) => (
  <div className={clsx(className, style.tags__container)} {...props}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement<TagProps>(child)) {
        return React.cloneElement(child, { showCount });
      }
      return child;
    })}
  </div>
);

const TagSpan = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={clsx(className, style.tag)} {...props} />
);

type TagLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    className?: string;
    children: React.ReactNode;
  };

const TagLink = ({ href, className, children, ...props }: TagLinkProps) => (
  <Link href={href} className={clsx(style.tag, className)} {...props}>
    {children}
  </Link>
);

const TagCount = ({
  count,
  color = 'accent',
}: {
  count: number;
  color?: 'primary' | 'secondary' | 'accent' | 'green' | 'red' | 'orange';
}) => {
  const classes = clsx(style['tag-count'], {
    [style[`tag-count--clr-${color}`]]: color,
  });

  return <span className={classes}>{count}</span>;
};

export type TagProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement | HTMLAnchorElement>;
  variant: 'default' | 'border';
  color: 'default' | 'light-grey' | 'slate' | 'dark-grey';
  size?: 'default' | 'large';
  showCount?: boolean;
  count?: number;
} & (
  | { href?: never; children: React.ReactNode | string }
  | ({ href: string; children: React.ReactNode | string } & LinkProps)
);

export const Tag = ({
  className,
  children,
  href,
  onClick,
  variant = 'default',
  color = 'default',
  size = 'default',
  showCount,
  count,
  ...props
}: TagProps) => {
  const classes = clsx(className, {
    [style['tag-variant--bordered']]: variant === 'border',
    [style[`tag-size--${size}`]]: size !== 'default',
    [style[`tag-clr--${color}`]]: color !== 'default',
    [style['tag-clr--default']]: color === 'default',
  });

  if (href) {
    return (
      <TagLink href={href} onClick={onClick} className={classes} {...props}>
        {children}
        {showCount && count && count > 1 && <TagCount count={count} />}
      </TagLink>
    );
  }

  return (
    <TagSpan onClick={onClick} className={classes} {...props}>
      {children}
      {showCount && count && count > 1 && <TagCount count={count} />}
    </TagSpan>
  );
};
