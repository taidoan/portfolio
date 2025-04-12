import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';

export const FormBuilder = () => {
  return formBuilderPlugin({
    fields: {
      text: true,
      textarea: true,
      select: true,
      email: true,
      state: true,
      country: true,
      checkbox: true,
      number: true,
      message: true,
      payment: false,
    },
  });
};
