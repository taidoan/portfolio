import type { ArrayField } from 'payload';

export type BreadCrumbsOverrides = Partial<ArrayField> & {
  admin?: Partial<NonNullable<ArrayField['admin']>>;
};

type BreadCrumbs = (overrides?: BreadCrumbsOverrides) => ArrayField;

export const BreadCrumbs: BreadCrumbs = (overrides = {}) => {
  const breadCrumb: ArrayField = {
    name: 'breadcrumbs',
    type: 'array',
    label: 'Breadcrumbs',
    minRows: 1,
    labels: {
      singular: 'Breadcrumb',
      plural: 'Breadcrumbs',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'relationTo',
            label: 'Relation',
            type: 'relationship',
            relationTo: ['pages', 'projects', 'services'],
            required: true,
            hasMany: false,
            admin: { width: '50%' },
            maxDepth: 0,
          },
          {
            name: 'label',
            type: 'text',
            required: true,
            admin: { width: '50%' },
          },
        ],
      },
    ],
    ...(overrides || {}),
    admin: {
      ...(overrides?.admin || {}),
    },
  };
  return breadCrumb;
};
