import type { SelectField, NumberField } from 'payload';

export const VideoPlayerWidth = (
  overrides: {
    admin?: Partial<SelectField['admin']>;
    hooks?: Partial<SelectField['hooks']>;
  } = {},
): SelectField => {
  const videoPlayerWidthResult: SelectField = {
    type: 'select',
    name: 'videoPlayerWidth',
    label: 'Video Player Width',
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
    options: [
      { value: '100%', label: '100%' },
      { value: '50%', label: '50%' },
      { value: '33%', label: '33%' },
      { value: '25%', label: '25%' },
    ],
    defaultValue: '100%',
  };

  return videoPlayerWidthResult;
};

export const VideoWidth = (
  overrides: {
    admin?: Partial<NumberField['admin']>;
    hooks?: Partial<NumberField['hooks']>;
  } = {},
): NumberField => {
  const videoWidthResult: NumberField = {
    type: 'number',
    name: 'videoWidth',
    label: 'Video Width in px',
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
    defaultValue: 640,
  };

  return videoWidthResult;
};

export const VideoHeight = (
  overrides: {
    admin?: Partial<NumberField['admin']>;
    hooks?: Partial<NumberField['hooks']>;
  } = {},
): NumberField => {
  const videoHeightResult: NumberField = {
    type: 'number',
    name: 'videoHeight',
    label: 'Video Height in px',
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
    defaultValue: 360,
  };

  return videoHeightResult;
};
