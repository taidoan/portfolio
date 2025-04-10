import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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
} from './index';

vi.mock('./style.module.scss', () => ({
  default: {
    text: 'mock-text-class',
    search: 'mock-search-class',
    number: 'mock-number-class',
    password: 'mock-password-class',
    email: 'mock-email-class',
    range: 'mock-range-class',
    date: 'mock-date-class',
    color: 'mock-color-class',
    file: 'mock-file-class',
    checkbox: 'mock-checkbox-class',
    radio: 'mock-radio-class',
    select: 'mock-select-class',
    textarea: 'mock-textarea-class',
    form: 'mock-form-class',
    label: 'mock-label-class',
  },
}));

vi.mock('clsx', () => ({
  default: (...args: string[]) => args.filter(Boolean).join(' '),
}));

describe('Form Components', () => {
  describe('TextField', () => {
    it('renders with correct type and classes', () => {
      render(<TextField data-testid='text-field' />);
      const input = screen.getByTestId('text-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveClass('mock-text-class');
    });

    it('passes additional props', () => {
      render(<TextField data-testid='text-field' placeholder='Enter text' />);
      const input = screen.getByTestId('text-field');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });

    it('merges custom className with default', () => {
      render(<TextField data-testid='text-field' className='custom-class' />);
      const input = screen.getByTestId('text-field');
      expect(input).toHaveClass('custom-class mock-text-class');
    });
  });

  describe('SearchField', () => {
    it('renders with correct type and classes', () => {
      render(<SearchField data-testid='search-field' />);
      const input = screen.getByTestId('search-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'search');
      expect(input).toHaveClass('mock-search-class');
    });
  });

  describe('NumberField', () => {
    it('renders with correct type and classes', () => {
      render(<NumberField data-testid='number-field' />);
      const input = screen.getByTestId('number-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'number');
      expect(input).toHaveClass('mock-number-class');
    });
  });

  describe('PasswordField', () => {
    it('renders with correct type and classes', () => {
      render(<PasswordField data-testid='password-field' />);
      const input = screen.getByTestId('password-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
      expect(input).toHaveClass('mock-password-class');
    });
  });

  describe('EmailField', () => {
    it('renders with correct type and classes', () => {
      render(<EmailField data-testid='email-field' />);
      const input = screen.getByTestId('email-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveClass('mock-email-class');
    });
  });

  describe('RangeField', () => {
    it('renders with correct type and classes', () => {
      render(<RangeField data-testid='range-field' />);
      const input = screen.getByTestId('range-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'range');
      expect(input).toHaveClass('mock-range-class');
    });
  });

  describe('DateField', () => {
    it('renders with correct type and classes', () => {
      render(<DateField data-testid='date-field' />);
      const input = screen.getByTestId('date-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'date');
      expect(input).toHaveClass('mock-date-class');
    });
  });

  describe('ColorField', () => {
    it('renders with correct type and classes', () => {
      render(<ColorField data-testid='color-field' />);
      const input = screen.getByTestId('color-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'color');
      expect(input).toHaveClass('mock-color-class');
    });
  });

  describe('FileField', () => {
    it('renders with correct type and classes', () => {
      render(<FileField data-testid='file-field' />);
      const input = screen.getByTestId('file-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'file');
      expect(input).toHaveClass('mock-file-class');
    });
  });

  describe('CheckboxField', () => {
    it('renders with correct type and classes', () => {
      render(<CheckboxField data-testid='checkbox-field' />);
      const input = screen.getByTestId('checkbox-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'checkbox');
      expect(input).toHaveClass('mock-checkbox-class');
    });
  });

  describe('RadioField', () => {
    it('renders with correct type and classes', () => {
      render(<RadioField data-testid='radio-field' />);
      const input = screen.getByTestId('radio-field');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'radio');
      expect(input).toHaveClass('mock-radio-class');
    });
  });

  describe('SelectField', () => {
    it('renders with correct wrapper and classes', () => {
      render(<SelectField data-testid='select-field' />);
      const select = screen.getByTestId('select-field');
      expect(select).toBeInTheDocument();
      expect(select).toHaveClass('mock-select-class');
      expect(select.parentElement).toHaveClass('select__wrapper');
    });

    it('renders with options', () => {
      render(
        <SelectField data-testid='select-field'>
          <option value='1'>Option 1</option>
          <option value='2'>Option 2</option>
        </SelectField>,
      );
      const select = screen.getByTestId('select-field');
      expect(select.children.length).toBe(2);
      expect(select.children[0]).toHaveTextContent('Option 1');
      expect(select.children[1]).toHaveTextContent('Option 2');
    });
  });

  describe('TextareaField', () => {
    it('renders with correct classes', () => {
      render(<TextareaField data-testid='textarea-field' />);
      const textarea = screen.getByTestId('textarea-field');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveClass('mock-textarea-class');
    });
  });

  describe('FormField', () => {
    it('renders with correct classes', () => {
      render(<FormField data-testid='form-field' />);
      const form = screen.getByTestId('form-field');
      expect(form).toBeInTheDocument();
      expect(form).toHaveClass('mock-form-class');
    });
  });

  describe('Label', () => {
    it('renders with correct classes', () => {
      render(<Label data-testid='label'>Label Text</Label>);
      const label = screen.getByTestId('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('mock-label-class');
      expect(label).toHaveTextContent('Label Text');
    });
  });

  describe('Integration', () => {
    it('composes form elements correctly', () => {
      render(
        <FormField data-testid='form'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <TextField id='name' data-testid='name-input' />
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <EmailField id='email' data-testid='email-input' />
          </div>
        </FormField>,
      );

      expect(screen.getByTestId('form')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByTestId('name-input')).toHaveAttribute('type', 'text');
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toHaveAttribute('type', 'email');
    });
  });
});
