import type { CheckboxField, TextField } from 'payload';

export type Overrides = {
  clonedOverrides?: Partial<TextField>;
};

type Cloned = (fieldToUse: string, overrides?: Overrides) => [TextField, CheckboxField];

export const ClonedField: Cloned = (fieldToUse = '', overrides = {}) => {
  const { clonedOverrides } = overrides;

  const checkboxField: CheckboxField = {
    type: 'checkbox',
    name: `clonedLock-${crypto.getRandomValues(new Uint32Array(1))[0]}`,
    defaultValue: true,
    admin: {
      hidden: true,
    },
  };

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const clonedField: TextField = {
    type: 'text',
    name: 'cloned',
    index: true,
    label: 'Cloned Field',
    required: true,
    ...(clonedOverrides || {}),
    admin: {
      ...(clonedOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/fields/ClonedField/component#ClonedFieldComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkboxField.name,
            clonedFieldName: clonedOverrides?.name || 'cloned',
          },
        },
      },
    },
  };

  return [clonedField, checkboxField];
};
