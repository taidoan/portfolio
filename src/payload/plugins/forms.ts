import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import { CONTACT_EMAIL } from '@/lib/constants';
export const FormBuilder = () => {
  return formBuilderPlugin({
    defaultToEmail: CONTACT_EMAIL,
    fields: {
      state: false,
      message: false,
      payment: false,
      country: false,
    },
  });
};
