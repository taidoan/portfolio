import type { SelectField } from 'payload';

export const blockSize = (
  overides: { admin?: Partial<SelectField['admin']> } = {},
): SelectField => {
  const sizeResult: SelectField = {
    type: 'select',
    name: 'blockSize',
    label: 'Column Size',
    admin: {
      ...overides.admin,
    },
    defaultValue: 'col-span-16',
    options: [
      { label: 'Sixteenth (1/16)', value: 'col-span-1' },
      { label: 'Eighth (2/16)', value: 'col-span-2' },
      { label: 'Three-Sixteenths (3/16)', value: 'col-span-3' },
      { label: 'Quarter (4/16)', value: 'col-span-4' },
      { label: 'Five-Sixteenths (5/16)', value: 'col-span-5' },
      { label: 'Three-Eighths (6/16)', value: 'col-span-6' },
      { label: 'Seven-Sixteenths (7/16)', value: 'col-span-7' },
      { label: 'Half (8/16)', value: 'col-span-8' },
      { label: 'Nine-Sixteenths (9/16)', value: 'col-span-9' },
      { label: 'Five-Eighths (10/16)', value: 'col-span-10' },
      { label: 'Eleven-Sixteenths (11/16)', value: 'col-span-11' },
      { label: 'Three-Quarters (12/16)', value: 'col-span-12' },
      { label: 'Thirteen-Sixteenths (13/16)', value: 'col-span-13' },
      { label: 'Seven-Eighths (14/16)', value: 'col-span-14' },
      { label: 'Fifteen-Sixteenths (15/16)', value: 'col-span-15' },
      { label: 'Full (16/16)', value: 'col-span-16' },
    ],
  };

  return sizeResult;
};
