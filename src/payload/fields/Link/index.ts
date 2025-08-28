import type { Field, GroupField } from 'payload';

export type Overrides = {
  linkOverrides?: Partial<GroupField>;
};

type Link = (overrides?: Overrides) => GroupField;

export const Link: Link = (overrides = {}) => {
  const { linkOverrides } = overrides;

  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    label: '',
    ...(linkOverrides || {}),
    admin: {
      ...(linkOverrides?.admin || {}),
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            required: true,
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            options: [
              {
                label: 'Internal',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
            hooks: {
              beforeValidate: [
                ({ value, siblingData }) => {
                  if (value === 'reference') {
                    if (siblingData?.url) delete siblingData.url;
                  } else if (value === 'custom') {
                    if (siblingData?.reference) delete siblingData.reference;
                  }
                  return value;
                },
              ],
            },
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'reference',
        width: '50%',
      },
      relationTo: ['pages', 'projects', 'services', 'posts', 'categories'],
      label: 'Document to link to',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'custom',
        width: '50%',
      },
      label: 'URL',
      required: true,
    },
  ];

  linkResult.fields.push({
    type: 'row',
    fields: [
      ...linkTypes,
      {
        name: 'label',
        type: 'text',
        admin: {
          width: '50%',
        },
        label: 'Label',
        required: true,
      },
    ],
  });

  const linkStyles: Field[] = [
    {
      type: 'select',
      name: 'variant',
      label: 'Variant',
      options: [
        { label: 'Fill', value: 'fill' },
        { label: 'Outlined', value: 'outlined' },
      ],
      defaultValue: 'fill',
      admin: {
        width: '33%',
      },
    },
    {
      name: 'color',
      type: 'select',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'accent', label: 'Accent' },
        { value: 'sage', label: 'Sage' },
        { value: 'slate', label: 'Slate' },
        { value: 'bittersweet', label: 'Bittersweet' },
      ],
      defaultValue: 'secondary',
      label: 'Color',
      admin: {
        width: '33%',
      },
    },
    {
      name: 'hoverColor',
      type: 'select',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'accent', label: 'Accent' },
        { value: 'sage', label: 'Sage' },
        { value: 'slate', label: 'Slate' },
        { value: 'bittersweet', label: 'Bittersweet' },
      ],
      defaultValue: 'default',
      label: 'Hover Color',
      admin: {
        width: '33%',
        condition: (_, siblingData) => siblingData.variant !== 'outlined',
      },
    },
    {
      type: 'select',
      name: 'buttonShadow',
      label: 'Button Shadow',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      defaultValue: 'none',
      admin: {
        width: '33%',
        condition: (_, siblingData) => siblingData.variant !== 'outlined',
      },
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
    },
  ];

  linkResult.fields.push({
    type: 'row',
    fields: [...linkStyles],
  });

  return linkResult;
};
