import type { SelectField } from 'payload';

export const backgroundColourOptions = [
  'none',
  'primary',
  'secondary',
  'accent',
  'light-grey',
  'concrete',
  'urban-steel',
  'gallery',
  'stormy-slate',
  'gradient-light',
  'gradient-primary',
  'gradient-secondary',
  'gradient-accent',
  'gradient-grey',
] as const;

export type ColorType = (typeof backgroundColourOptions)[number];

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
    options: backgroundColourOptions.map((value) => ({
      value,
      label: value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
    })),
  };

  return backgroundColourResult;
};
