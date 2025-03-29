import { JSX } from 'react';
import { SidebarCategoriesBlockProps } from '@/payload-types';
import { fetchCategories } from '@/lib/utilities/fetchCategories';
import Link from 'next/link';
import clsx from 'clsx';
import style from '@/components/layout/Sidebar/style.module.scss';
import { Divider } from '@/components/ui/Divider';
import {
  IconArrowNarrowRight,
  IconPaletteFilled,
  IconCode,
  IconDeviceDesktopFilled,
  IconPaintFilled,
} from '@tabler/icons-react';

export type Props = {
  className?: string;
} & SidebarCategoriesBlockProps;

const iconMap: Record<string, JSX.Element> = {
  branding: <IconPaletteFilled className={style['sidebar__block-icon']} />,
  digital: <IconDeviceDesktopFilled className={style['sidebar__block-icon']} />,
  'graphic-design': <IconPaintFilled className={style['sidebar__block-icon']} />,
  development: <IconCode className={style['sidebar__block-icon']} />,
};

const getIcon = (label: string | undefined | null) => {
  return iconMap[label as keyof typeof iconMap] || null;
};

export const SidebarCategoriesBlock = async ({ className, showSubCategories, title }: Props) => {
  const categories = await fetchCategories();

  return (
    <section className={clsx(className, style.sidebar__block)}>
      <h2 className={style['sidebar__block-title']}>{title || 'Categories'}</h2>
      <Divider
        type='content'
        color='light-grey'
        className={style['sidebar__block-divider']}
        width='full'
      />
      <ul className={style['sidebar__block-list']}>
        {categories.docs
          .filter((category) => !category.parentCategory)
          .map((topLevelCategory) => (
            <li key={topLevelCategory.slug}>
              <Link href={`/categories/${topLevelCategory.slug}`}>
                {topLevelCategory.title}
                {getIcon(topLevelCategory.slug)}
              </Link>

              {showSubCategories === true &&
                categories.docs.some(
                  (childCategory) =>
                    childCategory.parentCategory &&
                    childCategory.parentCategory.id === topLevelCategory.id,
                ) && (
                  <ul className={style['sidebar__block-subcat-list']}>
                    {categories.docs
                      .filter(
                        (childCategory) =>
                          childCategory.parentCategory &&
                          childCategory.parentCategory.id === topLevelCategory.id,
                      )
                      .map((childCategory) => (
                        <li key={childCategory.slug}>
                          <Link href={`/categories/${childCategory.slug}`}>
                            {
                              <IconArrowNarrowRight
                                stroke={3}
                                className={style['sidebar__block-icon']}
                              />
                            }
                            {childCategory.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
            </li>
          ))}
      </ul>
    </section>
  );
};
