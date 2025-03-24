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

export const BorderRadiusSides = (
  overrides: {
    admin?: Partial<SelectField['admin']>;
    hooks?: Partial<SelectField['hooks']>;
  } = {},
): SelectField => {
  const borderRadiusSidesResult: SelectField = {
    type: 'select',
    name: 'borderRadiusSides',
    label: 'Apply Border Radius Sides',
    hasMany: true,
    required: true,
    admin: {
      ...overrides.admin,
      condition: (_, siblingData) =>
        siblingData.borderRadius &&
        siblingData.borderRadius !== 'none' &&
        siblingData.borderRadius !== 'circle',
    },
    hooks: {
      ...overrides.hooks,
    },
    options: [
      { value: 'top-left', label: 'Top Left' },
      { value: 'top-right', label: 'Top Right' },
      { value: 'bottom-left', label: 'Bottom Left' },
      { value: 'bottom-right', label: 'Bottom Right' },
      { value: 'all', label: 'All Corners' },
    ],
    defaultValue: 'all',
  };

  return borderRadiusSidesResult;
};
