import { CollectionSlug, GlobalSlug } from 'payload';
import {
  IconUser,
  IconPhoto,
  IconTags,
  IconCategory,
  IconSettings,
  IconForms,
  IconSearch,
  IconUTurnRight,
  IconMessage,
  IconBriefcase2,
  IconPalette,
  IconBook,
  IconBrandCloudflare,
  IconLayoutSidebar,
  IconLayoutNavbar,
  IconLayoutBottombar,
  IconLayoutColumns,
  IconPhotoCog,
} from '@tabler/icons-react';
import { ExoticComponent } from 'react';

type CustomNavSlug = 'cloudflare' | 'metrics' | 'imagekit';
type NavSlug = CollectionSlug | GlobalSlug | CustomNavSlug;

export const navIconMap: Partial<Record<NavSlug, ExoticComponent>> = {
  users: IconUser,
  media: IconPhoto,
  tags: IconTags,
  categories: IconCategory,
  'site-settings': IconSettings,
  forms: IconForms,
  'form-submissions': IconForms,
  search: IconSearch,
  redirects: IconUTurnRight,
  posts: IconMessage,
  services: IconBriefcase2,
  projects: IconPalette,
  pages: IconBook,
  sidebar: IconLayoutSidebar,
  header: IconLayoutNavbar,
  footer: IconLayoutBottombar,
  breakpoints: IconLayoutColumns,
  cloudflare: IconBrandCloudflare,
  imagekit: IconPhotoCog,
};

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug) ? navIconMap[slug as CollectionSlug | GlobalSlug] : undefined;
