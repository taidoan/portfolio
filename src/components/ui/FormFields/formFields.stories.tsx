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
  Label,
} from '.';

const meta: Meta<typeof TextField> = {
  title: 'UI/FormFields',
  component: TextField,
  tags: ['autodocs'],
  args: {
    className: 'text-sm',
  },
  argTypes: {
    className: {
      description: 'Add a custom class to the field',
    },
  },
};
export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='text-field'>Text Field</Label>
      <TextField id='text-field' placeholder='Enter text' />
    </FormField>
  ),
};

export const Search: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='search-field'>Search Field</Label>
      <SearchField id='search-field' placeholder='Enter search' />
    </FormField>
  ),
};

export const Number: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='number-field'>Number Field</Label>
      <NumberField id='number-field' placeholder='Enter number' />
    </FormField>
  ),
};

export const Password: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='password-field'>Password Field</Label>
      <PasswordField id='password-field' placeholder='Enter password' />
    </FormField>
  ),
};

export const Email: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='email-field'>Email Field</Label>
      <EmailField id='email-field' placeholder='Enter email' />
    </FormField>
  ),
};

export const Range: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='range-field'>Range Field</Label>
      <RangeField id='range-field' placeholder='Enter range' />
    </FormField>
  ),
};

export const Date: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='date-field'>Date Field</Label>
      <DateField id='date-field' placeholder='Enter date' />
    </FormField>
  ),
};

export const Color: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='color-field'>Color Field</Label>
      <ColorField id='color-field' placeholder='Enter color' />
    </FormField>
  ),
};

export const File: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='file-field'>File Field</Label>
      <FileField id='file-field' placeholder='Select file' />
    </FormField>
  ),
};

export const Checkbox: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='checkbox-field'>Checkbox Field</Label>
      <CheckboxField id='checkbox-field' placeholder='Checkbox' />
    </FormField>
  ),
};

export const Radio: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='radio-field'>Radio Field</Label>
      <RadioField id='radio-field' placeholder='Radio' />
    </FormField>
  ),
};

export const Select: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='select-field'>Select Field</Label>
      <SelectField id='select-field'>
        <option value='option-1'>Option 1</option>
        <option value='option-2'>Option 2</option>
        <option value='option-3'>Option 3</option>
      </SelectField>
    </FormField>
  ),
};

export const Textarea: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='textarea-field'>Textarea Field</Label>
      <TextareaField id='textarea-field' placeholder='Enter text' />
    </FormField>
  ),
};

export const AllFormFields: Story = {
  render: () => (
    <FormField>
      <Label htmlFor='form-field'>Form Field</Label>
      <TextField id='form-field' placeholder='Enter text' />

      <Label htmlFor='search-field'>Search Field</Label>
      <SearchField id='search-field' placeholder='Enter search' />

      <Label htmlFor='number-field'>Number Field</Label>
      <NumberField id='number-field' placeholder='Enter number' />

      <Label htmlFor='password-field'>Password Field</Label>
      <PasswordField id='password-field' placeholder='Enter password' />

      <Label htmlFor='email-field'>Email Field</Label>
      <EmailField id='email-field' placeholder='Enter email' />

      <Label htmlFor='range-field'>Range Field</Label>
      <RangeField id='range-field' placeholder='Enter range' />

      <Label htmlFor='date-field'>Date Field</Label>
      <DateField id='date-field' placeholder='Enter date' />

      <Label htmlFor='color-field'>Color Field</Label>
      <ColorField id='color-field' placeholder='Enter color' />

      <Label htmlFor='file-field'>File Field</Label>
      <FileField id='file-field' placeholder='Select file' />

      <Label htmlFor='checkbox-field'>Checkbox Field</Label>
      <CheckboxField id='checkbox-field' placeholder='Checkbox' />

      <Label htmlFor='radio-field'>Radio Field</Label>
      <RadioField id='radio-field' placeholder='Radio' />

      <Label htmlFor='select-field'>Select Field</Label>
      <SelectField id='select-field'>
        <option value='option-1'>Option 1</option>
        <option value='option-2'>Option 2</option>
        <option value='option-3'>Option 3</option>
      </SelectField>
    </FormField>
  ),
};
