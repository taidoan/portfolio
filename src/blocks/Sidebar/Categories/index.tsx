import { SidebarCategoriesBlockProps } from '@/payload-types';
import { fetchCategories } from '@/lib/utilities/fetchCategories';
import clsx from 'clsx';
import style from '@/components/layout/Sidebar/style.module.scss';

export type Props = {
  className?: string;
} & SidebarCategoriesBlockProps;

export const SidebarCategoriesBlock = async ({ className }: Props) => {
  const categories = await fetchCategories();

  return (
    <section className={clsx(className, style.sidebar__block)}>
      <h2 className={style['sidebar__block-title']}>Categories</h2>
      <ul className={style['sidebar__block-list']}>
        {categories.docs.map((category) => (
          <li key={category.slug}>
            <a href={`/categories/${category.slug}`}>{category.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};
