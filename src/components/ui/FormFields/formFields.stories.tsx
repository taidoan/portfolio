import { Meta, StoryObj } from '@storybook/react';
import {
  TextField,
  SearchField,
  NumberField,
  PasswordField,
  EmailField,
  RangeField,
  DateField,
  ColorField,
  FileField,
  CheckboxField,
  RadioField,
  SelectField,
  TextareaField,
  FormField,
} from '.';

const meta: Meta<typeof TextField> = {
  title: 'UI/FormFields',
  component: TextField,
  tags: ['autodocs'],
  args: {
    className: 'text-sm',
    showLabel: true,
  },
  argTypes: {
    className: {
      description: 'Add a custom class to the field',
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
      description: 'Add a label to the field',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Show or hide the label',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Make the field required',
    },
    name: {
      control: { type: 'text' },
      description: 'Add a name to the field',
    },
  },
};
export default meta;
type Story = StoryObj<typeof TextField>;

export const Text: StoryObj<typeof TextField> = {
  render: ({ ...args }) => (
    <FormField>
      <TextField name='text-field' placeholder='Enter text' {...args} />
    </FormField>
  ),
};

export const Search: StoryObj<typeof SearchField> = {
  render: ({ ...args }) => (
    <FormField>
      <SearchField name='search-field' placeholder='Enter search' showLabel={false} {...args} />
    </FormField>
  ),
};

export const SearchOutside: StoryObj<typeof SearchField> = {
  render: ({ ...args }) => (
    <FormField>
      <SearchField
        name='search-field'
        placeholder='Enter search'
        submitPosition='outside'
        {...args}
      />
    </FormField>
  ),
};

export const Number: StoryObj<typeof NumberField> = {
  render: ({ ...args }) => (
    <FormField>
      <NumberField name='number-field' placeholder='Enter number' {...args} />
    </FormField>
  ),
};

export const Password: StoryObj<typeof PasswordField> = {
  render: ({ ...args }) => (
    <FormField>
      <PasswordField name='password-field' placeholder='Enter password' {...args} />
    </FormField>
  ),
};

export const Email: StoryObj<typeof EmailField> = {
  render: ({ ...args }) => (
    <FormField>
      <EmailField name='email-field' placeholder='Enter email' {...args} />
    </FormField>
  ),
};

export const Range: StoryObj<typeof RangeField> = {
  render: ({ ...args }) => (
    <FormField>
      <RangeField name='range-field' placeholder='Enter range' {...args} />
    </FormField>
  ),
};

export const Date: StoryObj<typeof DateField> = {
  render: ({ ...args }) => (
    <FormField>
      <DateField name='date-field' placeholder='Enter date' {...args} />
    </FormField>
  ),
};

export const Color: StoryObj<typeof ColorField> = {
  render: ({ ...args }) => (
    <FormField>
      <ColorField name='color-field' placeholder='Enter color' {...args} />
    </FormField>
  ),
};

export const File: StoryObj<typeof FileField> = {
  render: ({ ...args }) => (
    <FormField>
      <FileField name='file-field' placeholder='Select file' {...args} />
    </FormField>
  ),
};

export const Checkbox: StoryObj<typeof CheckboxField> = {
  render: ({ ...args }) => (
    <FormField>
      <CheckboxField name='checkbox-field' placeholder='Checkbox' {...args} />
    </FormField>
  ),
};

export const Radio: StoryObj<typeof RadioField> = {
  render: ({ ...args }) => (
    <FormField>
      <RadioField name='radio-field' placeholder='Radio' {...args} />
    </FormField>
  ),
};

export const Select: StoryObj<typeof SelectField> = {
  args: {
    showLabel: true,
  },
  render: ({ ...args }) => (
    <FormField>
      <SelectField name='select-field' {...args}>
        <option value='option-1'>Option 1</option>
        <option value='option-2'>Option 2</option>
        <option value='option-3'>Option 3</option>
      </SelectField>
    </FormField>
  ),
};

export const Textarea: StoryObj<typeof TextareaField> = {
  render: ({ ...args }) => (
    <FormField>
      <TextareaField name='textarea-field' placeholder='Enter text' {...args} />
    </FormField>
  ),
};

export const AllFormFields: Story = {
  render: () => (
    <FormField>
      <TextField name='form-field' placeholder='Enter text' />
      <SearchField name='search-field' placeholder='Enter search' showLabel />
      <NumberField name='number-field' placeholder='Enter number' />
      <PasswordField name='password-field' placeholder='Enter password' />
      <EmailField name='email-field' placeholder='Enter email' />
      <RangeField name='range-field' placeholder='Enter range' />
      <DateField name='date-field' placeholder='Enter date' />
      <ColorField name='color-field' placeholder='Enter color' />
      <FileField name='file-field' placeholder='Select file' />
      <CheckboxField name='checkbox-field' placeholder='Checkbox' />
      <RadioField name='radio-field' placeholder='Radio' />
      <SelectField name='select-field'>
        <option value='option-1'>Option 1</option>
        <option value='option-2'>Option 2</option>
        <option value='option-3'>Option 3</option>
      </SelectField>
    </FormField>
  ),
};
