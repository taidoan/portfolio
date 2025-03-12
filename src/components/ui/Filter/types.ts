import type { Category } from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { JSX } from 'react';

export type FilterCategory = {
  id: string;
  title: string;
  slug: string;
  description?: string | DefaultTypedEditorState | null;
  icon?: JSX.Element;
  items?: {
    title: string;
    description?: string | DefaultTypedEditorState;
  }[];
};

export type FilterProps = {
  categories: (Category | FilterCategory)[];
  selectedCategory: string | null;
  onSelectCategoryAction: (category: string | null) => void;
  showAllButton?: boolean;
  allButtonLabel?: string;
  iconMap?: Record<string, JSX.Element>;
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  buttonActiveClassName?: string;
};
