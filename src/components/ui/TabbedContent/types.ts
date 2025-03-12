import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { Media } from '@/payload-types';

export type TabFilterCategories = {
  title: string;
  id: string;
  slug: string;
  description?: DefaultTypedEditorState | string;
  items?: {
    title: string;
    description?: DefaultTypedEditorState | string;
    image?: Media;
    id: string;
  }[];
}[];

export type TabbedContentProps = {
  className?: string;
  categories: TabFilterCategories;
};
