import type { SelectField } from 'payload';

export const BorderRadius = (
  ovverides: {
    admin?: Partial<SelectField['admin']>;
    hooks?: Partial<SelectField['hooks']>;
  } = {},
): SelectField => {
  const borderRadiusResult: SelectField = {
    type: 'select',
    name: 'borderRadius',
    label: 'Border Radius',
    admin: {
      ...ovverides.admin,
    },
    hooks: {
      ...ovverides.hooks,
    },
    defaultValue: 'medium',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
      { label: 'Circle', value: 'circle' },
    ],
  };

  return borderRadiusResult;
};
