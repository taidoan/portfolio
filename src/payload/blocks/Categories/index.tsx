import type { CategoryLinksProps, Category } from '@/payload-types';

import clsx from 'clsx';
import style from '@components/ui/CategoryLink/style.module.scss';
import { fetchCategories } from '@/lib/utilities/fetchCategories';

import { Carousel } from '@/components/ui/Carousel';
import { CategoryLink } from '@/components/ui/CategoryLink';

function isValidCategory(cat: unknown): cat is Category {
  if (!cat || typeof cat !== 'object') return false;

  const c = cat as Partial<Category>;
  return (
    typeof c.id === 'string' &&
    typeof c.title === 'string' &&
    c.id.trim() !== '' &&
    c.title.trim() !== ''
  );
}

function getCategorySize(count: number, index: number): 'small' | 'medium' | 'large' {
  if (count === 4 && index >= 3) return 'large';
  if (count === 5 && index >= 3) return 'large';
  if (count === 7 && (index === 4 || index === 6)) return 'large';
  if (count === 8 && index >= 6) return 'large';
  if (count === 10 && index === 9) return 'large';
  if (count === 11 && index >= 9) return 'large';
  if (count === 12) return index < 3 ? 'large' : 'small';

  return 'medium';
}

export const CategoryLinksBlock = async ({
  category,
  categorySelect,
  mobileView,
  customClassName,
}: CategoryLinksProps) => {
  const categories = category === 'all' ? await fetchCategories() : null;

  const rawCategories = category === 'all' ? categories?.docs : categorySelect;
  const categoriesToDisplay = rawCategories?.filter(isValidCategory) ?? [];
  const categoriesCount = categoriesToDisplay.length;

  const gridClass = style.category__links__grid;

  const categoryItems = categoriesToDisplay.map((cat, index) => (
    <CategoryLink
      key={cat.id}
      category={cat}
      type={cat.parentCategory ? 'sub-category' : 'category'}
      size={getCategorySize(categoriesCount, index)}
      className={clsx({ [style['category__links__grid-item']]: mobileView === 'grid' })}
      data-item-index={index}
    />
  ));

  return (
    <section className={clsx('section', customClassName)}>
      {mobileView === 'carousel' ? (
        <Carousel
          autoHeight
          pagination
          paginationType='bullets'
          showPaginationCounter={false}
          disableAt='(min-width: 64em)'
          wrapperClassName={gridClass}
          slideClassName={style['category__links__grid-item']}
          data-category-count={categoriesCount.toString()}
        >
          {categoryItems}
        </Carousel>
      ) : (
        <div className={gridClass} data-category-count={categoriesCount.toString()}>
          {categoryItems}
        </div>
      )}
    </section>
  );
};
