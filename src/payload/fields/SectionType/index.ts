import type { SelectField } from 'payload';
export const SectionTypeField: SelectField = {
  name: 'sectionType',
  type: 'select',
  label: 'Section Type',
  options: [
    { value: 'default', label: 'Blocks Layout' },
    { value: 'full-width', label: 'Full Width Blocks Layout' },
    { value: 'boxed', label: 'Boxed Content' },
  ],
  defaultValue: 'default',
  admin: {
    description:
      'The layout of the section, you can choose between a blocks layout, boxed content, or full-width blocks layout.',
    width: '50%',
  },
};
