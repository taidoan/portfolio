import type { TextField } from 'payload';
import { formatClassHook, formatClass } from './formatClass';

export type Overrides = {
  classNameOverrides?: Partial<TextField>;
};

type ClassName = (fieldToUse?: string, overrides?: Overrides) => TextField[];

export const ClassName: ClassName = (fieldToUse = 'blockName', overrides = {}) => {
  const { classNameOverrides } = overrides;

  const hiddenSlugField: TextField = {
    name: 'hiddenSlug',
    type: 'text',
    admin: {
      hidden: true,
      readOnly: true,
    },
    hooks: {
      beforeValidate: [
        ({ data, value }) => {
          const slug = formatClass(data?.title);
          return slug || value;
        },
      ],
    },
  };

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const classNameField: TextField = {
    name: 'blockName',
    type: 'text',
    index: true,
    label: 'Class Name',
    ...(classNameOverrides || {}),
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatClassHook(fieldToUse)],
    },
    admin: {
      ...(classNameOverrides?.admin || {}),
      width: '50%',
      components: {
        Field: {
          path: '@/fields/ClassName/ClassNameComponent#ClassNameComponent',
          clientProps: {
            fieldToUse,
          },
        },
      },
    },
  };

  return [classNameField, hiddenSlugField];
};
