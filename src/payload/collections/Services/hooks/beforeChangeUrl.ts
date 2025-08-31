import type { Service } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';
import { createBeforeChangeUrlHook } from '@/lib/utilities/createBeforeChangeUrlHook';

export const beforeChangeUrl: CollectionBeforeChangeHook<Service> =
  createBeforeChangeUrlHook<Service>('services');
