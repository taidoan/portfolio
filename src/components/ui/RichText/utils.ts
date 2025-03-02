import { SerializedLinkNode } from '@payloadcms/richtext-lexical';

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;

  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }

  const isProject = relationTo === 'projects';
  const basePath = isProject ? '/projects' : '';
  return `${basePath}/${value.slug}`;
};
