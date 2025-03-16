import clsx from 'clsx';
import { IconChevronLeft, IconChevronRight, IconDots } from '@tabler/icons-react';
import * as React from 'react';
import style from './style.module.scss';

export const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    className={clsx(className, style.pagination)}
    aria-label='pagination'
    role='navigation'
    {...props}
  />
);

export const PaginationContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={clsx(className, style.pagination__content)} {...props} />
);

export const PaginationItem = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={clsx(className, style.pagination__item)} {...props} />
);

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<'button'>;

export const PaginationLink = ({ isActive, className, ...props }: PaginationLinkProps) => (
  <button
    className={clsx(className, style.pagination__link, {
      [style['pagination__link--active']]: isActive,
    })}
    aria-current={isActive ? 'page' : undefined}
    {...props}
  />
);

export const PaginationPrev = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to previous page'
    className={clsx(className, style.pagination__prev)}
    {...props}
  >
    <IconChevronLeft />
  </PaginationLink>
);

export const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    className={clsx(className, style.pagination__next)}
    {...props}
  >
    <IconChevronRight stroke={2} />
  </PaginationLink>
);

export const PaginationDots = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to page'
    className={clsx(className, style.pagination__dots)}
    {...props}
  >
    <IconDots />
  </PaginationLink>
);
