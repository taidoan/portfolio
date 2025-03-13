import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { Media, LinksBlockProps } from '@/payload-types';

export type TabFilterCategories = {
  title: string;
  id: string;
  slug?: string | null | undefined;
  description?: DefaultTypedEditorState | string;
  items?: {
    title: string;
    description?: DefaultTypedEditorState | string;
    image?: Media;
    id: string;
  }[];
  link?: LinksBlockProps['link'];
}[];

export type TabbedContentProps = {
  className?: string | undefined | null;
  categories: TabFilterCategories;
};
