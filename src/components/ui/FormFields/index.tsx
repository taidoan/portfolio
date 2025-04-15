import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';
import * as React from 'react';
import clsx from 'clsx';
import style from './style.module.scss';
import {
  stripInvalidInputProps,
  stripInvalidSelectProps,
  stripInvalidTextareaProps,
} from '@/lib/utilities/stripProps';
import { IconSearch } from '@tabler/icons-react';
import { Button } from '../Button';

export type BaseType<T extends FieldValues = FieldValues> = {
  name?: string;
  className?: string;
  register?: UseFormRegister<T>;
  required?: boolean;
  errors?: Partial<FieldErrorsImpl<T>>;
  label?: string;
  showLabel?: boolean;
};

export type BaseInputType = BaseType & React.ComponentProps<'input'>;
export type BaseSelectType = BaseType & React.ComponentProps<'select'>;
export type BaseTextAreaType = BaseType & React.ComponentProps<'textarea'>;

const FieldWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={clsx(style.field__wrapper, className)}>{children}</div>;
};

export const TextField = ({
  className,
  name,
  register,
  required,
  label,
  id,
  showLabel = true,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Text Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='text'
        id={fieldId}
        className={clsx(className, style.text)}
        autoComplete='on'
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const SearchField = ({
  className,
  name,
  submitPosition = 'inside',
  showLabel = false,
  label,
  id,
  ...props
}: { submitPosition?: 'inside' | 'outside' } & BaseInputType) => {
  const fieldId = id || name;
  if (submitPosition === 'outside') {
    return (
      <FieldWrapper>
        {showLabel && (
          <label htmlFor={fieldId}>
            {' '}
            <span>{label || 'Search Field'}</span>
          </label>
        )}
        <div className={clsx(style['search__wrapper--outside'], 'search__wrapper--outside')}>
          <input
            type='search'
            id={fieldId}
            className={clsx(className, style.search)}
            {...stripInvalidInputProps(props)}
          />
          <Button
            type='submit'
            className={clsx(style['search__button--outside'])}
            aria-label='Search'
            color='secondary'
            hoverColor='accent'
            shadow='small'
          >
            Search
            <IconSearch stroke={3} />
          </Button>
        </div>
      </FieldWrapper>
    );
  }
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Search Field'}</span>
        </label>
      )}
      <div className={clsx('search__wrapper')}>
        <input
          type='search'
          id={fieldId}
          className={clsx(className, style.search)}
          {...stripInvalidInputProps(props)}
        />
        <button type='submit' className={clsx('search__button')} aria-label='Search'>
          <IconSearch stroke={2} />
        </button>
      </div>
    </FieldWrapper>
  );
};

export const NumberField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Number Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='number'
        id={fieldId}
        className={clsx(className, style.number)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const PasswordField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Password Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='password'
        id={fieldId}
        className={clsx(className, style.password)}
        autoComplete='current-password'
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const EmailField = ({
  className,
  name,
  register,
  required,
  label,
  id,
  showLabel = true,
  ...props
}: React.ComponentProps<'input'> & BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Email Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='email'
        autoComplete='email'
        id={fieldId}
        className={clsx(className, style.email)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const RangeField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Range Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='range'
        id={fieldId}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.range)}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const DateField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Date Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='date'
        id={fieldId}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.date)}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const ColorField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Colour Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='color'
        id={fieldId}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.color)}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const FileField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'File Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='file'
        id={fieldId}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.file)}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const CheckboxField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Checkbox Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='checkbox'
        id={fieldId}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.checkbox)}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const RadioField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseInputType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Radio Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        type='radio'
        id={fieldId}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.radio)}
        {...stripInvalidInputProps(props)}
      />
    </FieldWrapper>
  );
};

export const SelectField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseSelectType) => {
  const fieldId = id || name;
  return (
    <div className='select__wrapper'>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Select Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <select
        id={fieldId}
        className={clsx(className, style.select)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidSelectProps(props)}
      >
        {props.children}
      </select>
    </div>
  );
};

export const TextareaField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  id,
  ...props
}: BaseTextAreaType) => {
  const fieldId = id || name;
  return (
    <FieldWrapper>
      {showLabel && (
        <label htmlFor={fieldId}>
          <span>{label || 'Textarea Field'}</span>
          {required && <span className='required'>*</span>}
        </label>
      )}
      <textarea
        id={fieldId}
        className={clsx(className, style.textarea)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidTextareaProps(props)}
      />
    </FieldWrapper>
  );
};

export const FormField = ({ className, ...props }: React.ComponentProps<'form'>) => {
  return <form className={clsx(className, style.form)} {...props} />;
};

export const Label = ({ className, ...props }: React.ComponentProps<'label'>) => {
  return <label className={clsx(className, style.label)} {...props} />;
};
