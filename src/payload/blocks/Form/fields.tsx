import { RadioField, TextField } from '@/components/ui/FormFields/index';
import { SelectField } from '@/components/ui/FormFields/index';
import { CheckboxField } from '@/components/ui/FormFields/index';
import { EmailField } from '@/components/ui/FormFields/index';
import { NumberField } from '@/components/ui/FormFields/index';
import { TextareaField } from '@/components/ui/FormFields/index';

export const fields = {
  text: TextField,
  select: SelectField,
  checkbox: CheckboxField,
  email: EmailField,
  number: NumberField,
  textarea: TextareaField,
  country: TextField,
  payment: TextField,
  state: TextField,
  radio: RadioField,
  message: TextField,
};
