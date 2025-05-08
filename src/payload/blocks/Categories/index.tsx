import type { CategoryLinksProps, Category } from '@/payload-types';

import clsx from 'clsx';
import style from '@components/ui/CategoryLink/style.module.scss';
import { fetchCategories } from '@/lib/utilities/fetchCategories';

import { Carousel } from '@/components/ui/Carousel';
import { CategoryLink } from '@/components/ui/CategoryLink';

function isValidCategory(cat: unknown): cat is Category {
  if (typeof cat !== 'object' || cat === null) return false;

  const c = cat as Record<string, unknown>;
  return typeof c.id === 'string' && typeof c.title === 'string';
}

const getSizeForCategory = (count: number, index: number): 'small' | 'medium' | 'large' => {
  if (count === 4 && index >= 3) return 'large';
  if (count === 5 && index >= 3) return 'large';
  if (count === 7 && index >= 5) return 'large';
  if (count === 8 && index >= 6) return 'large';
  if (count === 10 && index === 10) return 'large';
  if (count === 11 && index >= 10) return 'large';

  return 'medium';
};

const getCategoryGridClass = (categoriesCount: number): string | undefined => {
  switch (categoriesCount) {
    case 4:
      return style['category__links__grid-four-items'];
    case 5:
      return style['category__links__grid-five-items'];
    case 7:
      return style['category__links__grid-seven-items'];
    case 8:
      return style['category__links__grid-eight-items'];
    case 10:
      return style['category__links__grid-ten-items'];
    case 11:
      return style['category__links__grid-eleven-items'];
    default:
      return undefined;
  }
};

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

  const categoryItems = categoriesToDisplay.map((cat, index) => (
    <CategoryLink
      key={cat.id}
      category={cat}
      type={cat.parentCategory ? 'sub-category' : 'category'}
      size={getSizeForCategory(categoriesCount, index)}
      className={clsx({ [style['category__links__grid-item']]: mobileView === 'grid' })}
    />
  ));

  const gridClass = clsx(style.category__links__grid, getCategoryGridClass(categoriesCount));

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
        >
          {categoryItems}
        </Carousel>
      ) : (
        <div className={gridClass}>{categoryItems}</div>
      )}
    </section>
  );
};
