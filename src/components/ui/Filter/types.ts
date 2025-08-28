import type { Category } from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { JSX } from 'react';

export type FilterCategory = {
  id?: string | null | undefined;
  title: string;
  slug?: string | null | undefined;
  description?: string | DefaultTypedEditorState | null;
  icon?: JSX.Element;
  items?: {
    title: string;
    description?: string | DefaultTypedEditorState;
  }[];
};

export type FilterProps = {
  categories: (Omit<Category, 'ctaLink'> | FilterCategory)[];
  selectedCategory: string | null | undefined;
  onSelectCategoryAction: (category: string | null) => void;
  showAllButton?: boolean;
  allButtonLabel?: string;
  iconMap?: Record<string, JSX.Element>;
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  buttonActiveClassName?: string;
};
