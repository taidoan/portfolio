'use client';
import type { FilterCategory, FilterProps, ServiceWithDescription } from './types';
import { useState } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';

export const Filter = ({
  categories,
  selectedCategory,
  onSelectCategoryAction,
  showAllButton,
  allButtonLabel,
  iconMap,
  className,
  ...rest
}: FilterProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory || null);

  const handleCategoryClick = (category: FilterCategory | ServiceWithDescription | null) => {
    const categoryId = category?.id || null;
    onSelectCategoryAction(categoryId);
    setActiveCategory(categoryId);
  };

  const containerClass = clsx(style.filter__container, className);

  const allButtonClass = clsx(style.filter__button, {
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
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const buttonClass = clsx(style.filter__button, {
          [style['filter__button--active']]: isActive,
        });
        const icon = (iconMap && iconMap[category.slug]) || null;

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
