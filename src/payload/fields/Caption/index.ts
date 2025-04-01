import type { CheckboxField, RichTextField } from 'payload';
import { CaptionEditor } from '@/lib/editor/caption';

export const ShowCaption = (
  overrides: {
    admin?: Partial<CheckboxField['admin']>;
    hooks?: Partial<CheckboxField['hooks']>;
  } = {},
): CheckboxField => {
  const showCaptionResult: CheckboxField = {
    type: 'checkbox',
    name: 'showCaption',
    label: 'Show Caption',
    admin: {
      ...overrides.admin,
    },
    hooks: {
      ...overrides.hooks,
    },
    defaultValue: false,
  };

  return showCaptionResult;
};

export const Caption = (
  overrides: {
    admin?: Partial<RichTextField['admin']>;
    hooks?: Partial<RichTextField['hooks']>;
  } = {},
): RichTextField => {
  const captionResult: RichTextField = {
    type: 'richText',
    editor: CaptionEditor,
    name: 'caption',
    admin: {
      ...overrides.admin,
      condition: (_, siblingData) => siblingData.showCaption,
    },
    hooks: {
      ...overrides.hooks,
    },
  };

  return captionResult;
};
