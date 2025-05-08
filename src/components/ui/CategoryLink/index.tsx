import Link from 'next/link';
import clsx from 'clsx';
import style from './style.module.scss';

import { IconDeviceDesktopFilled, IconPaintFilled, IconPaletteFilled } from '@tabler/icons-react';

export type CategoryLinkProps = {
  type: 'category' | 'sub-category';
  size?: 'small' | 'medium' | 'large';
};

export const CategoryLink = ({ type, size }: CategoryLinkProps) => {
  const isSubCategory = type === 'sub-category';
  const isSmall = size === 'small';
  const isMedium = size === 'medium';
  const isLarge = size === 'large';

  const classes = clsx(style.category__link, {
    [style[`category__link--${size}`]]: isSubCategory && size,
    [style[`category__link--${type}`]]: isSubCategory,
  });

  return (
    <Link href='/categories' className={classes}>
      <IconDeviceDesktopFilled className={clsx(style.category__icon)} />
      <div className={clsx(style.category__text)}>
        <h2 className={clsx(style.category__title)}>Digital</h2>
        {!isSmall && <p>Pixel-perfect projects made for screens big and small.</p>}
      </div>
    </Link>
  );
};
