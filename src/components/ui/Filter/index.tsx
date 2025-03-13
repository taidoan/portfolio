'use client';
import type { FilterCategory, FilterProps } from './types';
import { useState } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';

/**
 * This is a component that allows users to filter a list of categories.
 * @param {FilterProps} props - The props for the Filter component.
 * @returns {React.ReactElement} The Filter component.
 * @example
 * <Filter
 *   categories={categories}
 *   selectedCategory={selectedCategory}
 *   onSelectCategoryAction={onSelectCategoryAction}
 *   showAllButton={showAllButton}
 *   allButtonLabel={allButtonLabel}
 *   iconMap={iconMap}
 *   className={className}
 * />
 */
export const Filter = ({
  categories,
  selectedCategory,
  onSelectCategoryAction,
  showAllButton,
  allButtonLabel,
  iconMap,
  className,
  containerClassName,
  buttonClassName,
  buttonActiveClassName,
  ...rest
}: FilterProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory || null);

  const handleCategoryClick = (category: FilterCategory | null) => {
    const categoryId = category?.id || null;
    onSelectCategoryAction(categoryId);
    setActiveCategory(categoryId);
  };

  const containerClass = clsx(containerClassName || style.filter__container, className);

  const allButtonClass = clsx(buttonClassName || style.filter__button, {
    [style['filter__button--active']]: activeCategory === null,
  });

  return (
    <ul className={containerClass} {...rest}>
      {showAllButton && (
        <li>
          <button
            className={allButtonClass}
            onClick={() => handleCategoryClick(null)}
            aria-label={'Show all'}
          >
            {iconMap && iconMap['all']}
            {allButtonLabel}
          </button>
        </li>
      )}
      {categories.map((category, index) => {
        const isActive = activeCategory === category.id;
        const buttonClass = clsx(
          buttonClassName || style.filter__button,
          isActive && (buttonActiveClassName || style['filter__button--active']),
        );
        const matchedKey = iconMap
          ? Object.keys(iconMap).find((key) => category?.slug?.includes(key))
          : undefined;

        const icon = matchedKey ? iconMap && iconMap[matchedKey] : null;

        return (
          <li key={category.id}>
            <button className={buttonClass} onClick={() => handleCategoryClick(category)}>
              {icon} {category.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
