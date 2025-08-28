import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types';

export const buildInitialFormState = (fields: FormFieldBlock[] = []) => {
  return fields.reduce((initialSchema, field) => {
    if (field.blockType === 'checkbox') {
      return {
        ...initialSchema,
        [field.name]: false,
      };
    }

    if (
      field.blockType === 'email' ||
      field.blockType === 'text' ||
      field.blockType === 'textarea' ||
      field.blockType === 'select' ||
      field.blockType === 'payment'
    ) {
      return {
        ...initialSchema,
        [field.name]: '',
      };
    }

    return initialSchema;
  }, {});
};
