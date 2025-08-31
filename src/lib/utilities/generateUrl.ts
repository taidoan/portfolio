export const generateUrl = (slug?: string | null, collectionPath?: string): string | undefined => {
  if (!slug) return undefined;
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  return collectionPath ? `${base}/${collectionPath}/${slug}` : `${base}/${slug}`;
};
