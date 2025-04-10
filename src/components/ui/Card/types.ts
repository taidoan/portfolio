import type { Project, Service, Post, Category } from '@/payload-types';

export type CardRelation = 'projects' | 'services' | 'posts' | 'categories' | string | null;

type BaseCardData = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  relationTo: CardRelation;
  url?: string;
  doc?: {
    relationTo: CardRelation;
  };
};

export type SimpleCategory = Pick<Category, 'id' | 'title' | 'slug' | 'description'>;

export type ProjectCard = BaseCardData & {
  relationTo: 'projects';
  thumbnail: Project['thumbnail'];
  details?: Project['details'];
  categories: string[];
};

export type PostCard = BaseCardData & {
  relationTo: 'posts';
  thumbnail: Post['thumbnail'];
  excerpt: Post['excerpt'];
  categories: string[];
};

export type ServiceCard = BaseCardData & {
  relationTo: 'services';
  image: Service['image'];
  description: Service['description'];
};

export type CardData = ProjectCard | ServiceCard | PostCard;

export type CardProps = {
  children?: React.ReactNode;
  className?: string;
  data?: CardData;
  relation?: CardRelation;
  textAlign?: 'centered' | 'left' | 'right' | null;
  id?: string;
  href?: string;
  target?: string;
  title?: string;
  kind?: 'archive' | 'default';
};
