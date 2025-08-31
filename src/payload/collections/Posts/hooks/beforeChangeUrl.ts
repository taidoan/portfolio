import type { Post } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';
import { createBeforeChangeUrlHook } from '@/lib/utilities/createBeforeChangeUrlHook';

export const beforeChangeUrl: CollectionBeforeChangeHook<Post> =
  createBeforeChangeUrlHook<Post>('posts');
