import type { FieldHook } from 'payload';

export const formatClass = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

export const formatClassHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatClass(value);
    }

    if (operation === 'create' || !data?.className) {
      const fallbackData = data?.[fallback] || data?.[fallback];

      if (fallbackData && typeof fallbackData === 'string') {
        return formatClass(fallbackData);
      }
    }

    return value;
  };
