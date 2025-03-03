import type { SelectField } from 'payload';

export const BackgroundColour = (
  overrides: {
    admin?: Partial<SelectField['admin']>;
    hooks?: Partial<SelectField['hooks']>;
  } = {},
): SelectField => {
  const backgroundColourResult: SelectField = {
    type: 'select',
    name: 'backgroundColour',
    label: 'Background Colour',
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
    options: [
      { value: 'none', label: 'None' },
      { value: 'primary', label: 'Primary' },
      { value: 'secondary', label: 'Secondary' },
      { value: 'accent', label: 'Accent' },
      { value: 'gradient-light', label: 'Light Gradient' },
      { value: 'gradient-primary', label: 'Primary Gradient' },
      { value: 'gradient-secondary', label: 'Secondary Gradient' },
      { value: 'gradient-accent', label: 'Accent Gradient' },
    ],
  };

  return backgroundColourResult;
};
