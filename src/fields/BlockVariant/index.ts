import type { SelectField } from 'payload';

export const BlockVariant = (
  overrides: { admin?: Partial<SelectField['admin']>; hooks?: Partial<SelectField['hooks']> } = {},
): SelectField => {
  const blockVariantResult: SelectField = {
    type: 'select',
    name: 'blockVariant',
    label: 'Variant',
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
    options: [
      { label: 'Fill', value: 'fill' },
      { label: 'Outlined', value: 'outlined' },
      { label: 'Outlined Thick', value: 'outlined-thick' },
    ],
    defaultValue: 'fill',
  };

  return blockVariantResult;
};
