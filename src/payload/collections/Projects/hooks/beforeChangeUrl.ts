import type { Project } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';
import { createBeforeChangeUrlHook } from '@/lib/utilities/createBeforeChangeUrlHook';

export const beforeChangeUrl: CollectionBeforeChangeHook<Project> =
  createBeforeChangeUrlHook<Project>('projects');
