import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
export const FormBuilder = () => {
  return formBuilderPlugin({
    fields: {
      state: false,
      message: false,
      payment: false,
      country: false,
    },
  });
};
