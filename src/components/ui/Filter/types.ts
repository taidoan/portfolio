import type { Category, Service } from '@/payload-types';
import { JSX } from 'react';

export type FilterCategory = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  icon?: JSX.Element;
  items?: {
    title: string;
    description?: string;
  };
};

export type ServiceWithDescription = Service & {
  description?: {
    root: {
      type: string;
      children: { type: string; version: number; [k: string]: unknown }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
};

export type FilterProps = {
  categories: (Category | ServiceWithDescription)[];
  selectedCategory: string | null;
  onSelectCategoryAction: (category: string | null) => void;
  showAllButton?: boolean;
  allButtonLabel?: string;
  iconMap?: Record<string, JSX.Element>;
  className?: string;
};
