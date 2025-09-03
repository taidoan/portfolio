import type { ArrayField, RelationshipField } from 'payload';

export type BreadCrumbsOverrides = Partial<ArrayField> & {
  admin?: Partial<NonNullable<ArrayField['admin']>>;
  relationTo?: RelationshipField['relationTo'];
};

type BreadCrumbs = (overrides?: BreadCrumbsOverrides) => ArrayField;

/**
 * Breadcrumbs field, can be used in any collection. RelationTo can be overriden.
 * @param overrides - Overrides for the field
 * @returns ArrayField
 * @example
 * BreadCrumbs({ relationTo: ['pages', 'categories'] })
 * BreadCrumbs({ relationTo: ['pages', 'categories'], admin: { readOnly: true } })
 * BreadCrumbs()
 */
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
    defaultValue: [
      {
        relationTo: overrides.relationTo?.[0] ?? 'pages',
        label: 'Home',
      },
    ],
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'relationTo',
            label: 'Relation',
            type: 'relationship',
            relationTo: overrides.relationTo ?? ['pages', 'projects', 'services'],
            required: true,
            hasMany: false,
            admin: { width: '50%' },
            maxDepth: 0,
            ...overrides?.fields,
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
