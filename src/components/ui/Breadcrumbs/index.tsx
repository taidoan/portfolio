'use client';
import { getServerSideURL } from '@/lib/utilities/getURLs';
import { IconCircleChevronsRightFilled, IconHomeFilled } from '@tabler/icons-react';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import Link from 'next/link';
import clsx from 'clsx';
import style from './style.module.scss';

const serverUrl = getServerSideURL();

export type Breadcrumb = {
  id?: string | null;
  title?: string | null;
  url?: string | null;
  slug?: string | null;
};

export type Breadcrumbs = Breadcrumb[] | null | undefined;

export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[] | undefined | [] | null;
  isMediumScreen?: boolean;
  container?: 'none' | 'boxed';
  background?: 'none' | 'light' | 'dark' | 'translucent';
};

export const Breadcrumbs = ({
  breadcrumbs,
  isMediumScreen: externalIsMediumScreen,
  container = 'none',
  background = 'none',
}: BreadcrumbsProps) => {
  const internalIsMediumScreen = useMediaQuery('(min-width: 48em)');
  if (!breadcrumbs) return null;

  const isMediumScreen = externalIsMediumScreen ?? internalIsMediumScreen;

  const breadcrumbsClasses = clsx(style.breadcrumbs, {
    [style['breadcrumbs__boxed']]: container === 'boxed',
    [style['breadcrumbs__bg--light']]: container === 'boxed' && background === 'light',
    [style['breadcrumbs__bg--dark']]: container === 'boxed' && background === 'dark',
    [style['breadcrumbs__bg--translucent']]: container === 'boxed' && background === 'translucent',
  });

  return (
    <nav aria-label='breadcrumb' data-testid='breadcrumbs'>
      <ol className={breadcrumbsClasses}>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isHome = breadcrumb.title === 'Home';

          return (
            <li key={breadcrumb.id} className={style.breadcrumb}>
              {isLast ? (
                <span aria-current='page'>{breadcrumb.title}</span>
              ) : (
                <Link href={serverUrl + breadcrumb.url} className={style['breadcrumb__link']}>
                  {isHome && !isMediumScreen ? (
                    <IconHomeFilled
                      data-testid='home-icon'
                      className={style['breadcrumb__home-icon']}
                      aria-label='Home'
                    />
                  ) : (
                    <>{breadcrumb.title}</>
                  )}
                </Link>
              )}
              {!isLast && (
                <IconCircleChevronsRightFilled className={style['breadcrumb__seperator']} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
