import type { CollapsibleField } from 'payload';
import { blockSize } from '@/fields/BlockSize';

export const GridAppearance = (): CollapsibleField => {
  const result: CollapsibleField = {
    type: 'collapsible',
    label: 'Grid Appearance Options',
    admin: {
      description:
        'Grid appearance options for the block, this will only affect desktop screens as mobile is a standard flex one column layout.',
    },
    fields: [
      {
        type: 'row',
        fields: [
          blockSize({
            admin: { width: '33%' },
          }),
          {
            type: 'select',
            name: 'alignSelf',
            label: 'Align Self',
            defaultValue: 'start',
            admin: {
              width: '33%',
            },
            options: [
              { label: 'Stretch', value: 'stretch' },
              { label: 'Start', value: 'start' },
              { label: 'Center', value: 'center' },
              { label: 'End', value: 'end' },
            ],
          },
          {
            type: 'select',
            name: 'justifySelf',
            label: 'Justify Self',
            defaultValue: 'start',
            admin: {
              width: '33%',
            },
            options: [
              { label: 'Start', value: 'start' },
              { label: 'Center', value: 'center' },
              { label: 'End', value: 'end' },
              { label: 'Stretch', value: 'stretch' },
            ],
          },
        ],
      },
    ],
  };

  return result;
};
