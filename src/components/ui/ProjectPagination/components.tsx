import clsx from 'clsx';
import * as React from 'react';
import Link from 'next/link';
import {
  IconArchiveFilled,
  IconCircleArrowRightFilled,
  IconCircleArrowLeftFilled,
} from '@tabler/icons-react';
import style from './style.module.scss';
import { getServerSideURL } from '@/lib/utilities/getURLs';
const SERVER_SIDE_URL = getServerSideURL();

export const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    className={clsx(className, style.project__pagination)}
    aria-label='Pagination'
    role='navigation'
    {...props}
  />
);

export const PaginationContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={clsx(className, style.project__pagination__content)} {...props} />
);

export const PaginationItem = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={clsx(className, style.project__pagination__item)} {...props} />
);

export const PaginationArchiveItem = ({ ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <PaginationItem {...props} className={clsx(style['project__pagination__item--archive'])}>
    <Link
      href={`${SERVER_SIDE_URL}/projects/`}
      className={style['project__pagination__archive-link']}
      aria-label='Project Archive'
    >
      <IconArchiveFilled data-testid='archive-icon' aria-label='Project Archive Icon' />
    </Link>
  </PaginationItem>
);

export type PaginationLinkProps = React.ComponentProps<typeof Link> & {
  type: 'previous' | 'next';
};

export const PaginationLink = ({ className, children, type, ...props }: PaginationLinkProps) => (
  <Link className={clsx(className, style.project__pagination__link)} {...props}>
    {type === 'previous' && <IconCircleArrowLeftFilled />}
    {children}
    {type === 'next' && <IconCircleArrowRightFilled />}
  </Link>
);

export const PaginationPreviousLabel = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={clsx(className, style['project__pagination__label'])} {...props}>
    Previous Project
  </span>
);

export const PaginationNextLabel = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={clsx(className, style['project__pagination__label'])} {...props}>
    Next Project
  </span>
);
