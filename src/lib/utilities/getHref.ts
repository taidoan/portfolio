export const getHref = (link: {
  type?: string | null | undefined;
  reference?: {
    value?: { slug?: string } | number | string | undefined | null;
    relationTo?: string | undefined;
  } | null;
  url?: string | null;
}): string | null => {
  if (!link || Object.keys(link).length === 0) return null;
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link?.reference?.value?.slug
  ) {
    return `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link?.reference?.value.slug}`;
  }

  return link.url || null;
};
