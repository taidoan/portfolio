import type { CollectionAfterReadHook } from 'payload';
import { User } from '@/payload-types';

export const populateAuthor: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.author) {
    const authorDocs: User[] = [];

    for (const author of doc.author) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 0,
        });

        if (authorDoc) {
          authorDocs.push(authorDoc);
        }
      } catch {}
    }

    if (authorDocs.length > 0) {
      doc.populatedAuthors = authorDocs.map((authorDoc) => ({
        id: authorDoc.id,
        name: authorDoc.name,
      }));

      payload.logger.info(`Populated authors: ${authorDocs.map((a) => a.name).join(', ')}`);
    }
  }

  return doc;
};
