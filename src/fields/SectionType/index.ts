import type { SelectField } from 'payload';
export const SectionTypeField: SelectField = {
  name: 'sectionType',
  type: 'select',
  label: 'Section Type',
  options: [
    { value: 'default', label: 'Default' },
    { value: 'boxed', label: 'Boxed' },
    { value: 'full-width', label: 'Full Width' },
  ],
  defaultValue: 'default',
  admin: {
    description:
      'The layout of the section, you can choose between default, boxed, and full-width.',
    width: '50%',
  },
};
