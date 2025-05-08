import Link from 'next/link';
import clsx from 'clsx';
import style from './style.module.scss';
import { JSX } from 'react';
import { getServerSideURL } from '@/lib/utilities/getURLs';

import {
  IconDeviceDesktopFilled,
  IconPaintFilled,
  IconPaletteFilled,
  IconUserScreen,
  IconDeviceAnalytics,
  IconPrinter,
  IconDeviceDesktopStar,
  IconDeviceDesktopCode,
} from '@tabler/icons-react';

export type CategoryLinkProps = {
  type: 'category' | 'sub-category';
  size?: 'small' | 'medium' | 'large';
  category: {
    title: string;
    slug: string;
    tagline?: string | null;
  };
  className?: string;
};

const ICON_MAP: Record<string, JSX.Element> = {
  branding: <IconPaletteFilled stroke={2} className={style.category__icon} />,
  digital: <IconDeviceDesktopFilled stroke={2} className={style.category__icon} />,
  'ui-ux': <IconUserScreen stroke={2} className={style.category__icon} />,
  'graphic-design': <IconPaintFilled stroke={2} className={style.category__icon} />,
  development: <IconDeviceDesktopCode stroke={2} className={style.category__icon} />,
  marketing: <IconDeviceAnalytics stroke={2} className={style.category__icon} />,
  print: <IconPrinter stroke={2} className={style.category__icon} />,
  'web-design': <IconDeviceDesktopStar stroke={2} className={style.category__icon} />,
};

export const CategoryLink = ({ type, size, category, className }: CategoryLinkProps) => {
  if (!category) return null;

  const { title, slug, tagline } = category;

  const classes = clsx(style.category__link, className, {
    [style[`category__link--${size}`]]: type === 'sub-category' && size,
    [style[`category__link--${type}`]]: type === 'sub-category',
  });

  const icon =
    ICON_MAP[slug] || Object.keys(ICON_MAP).find((key) => slug?.includes(key))
      ? ICON_MAP[Object.keys(ICON_MAP).find((key) => slug?.includes(key)) as string]
      : null;

  return (
    <Link href={`${getServerSideURL()}/categories/${slug}`} className={classes}>
      {icon}
      <div className={clsx(style.category__text)}>
        <h2 className={clsx(style.category__title)}>{title}</h2>
        {size !== 'small' && tagline && (
          <p>{tagline || 'Category tagline goes here, not too short, not too long.'}</p>
        )}
      </div>
    </Link>
  );
};
