import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import type { Post } from '@/payload-types';

import { revalidatePath, revalidateTag } from 'next/cache';
