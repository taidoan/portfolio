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

export type BaseType = {
  name?: string;
  className?: string;
  register?: UseFormRegister<any & FieldValues>;
  required?: boolean;
  errors?: Partial<FieldErrorsImpl<{ [x: string]: any }>>;
  label?: string;
  showLabel?: boolean;
  [key: string]: any;
};

export type BaseInputType = BaseType & React.ComponentProps<'input'>;
export type BaseSelectType = BaseType & React.ComponentProps<'select'>;
export type BaseTextAreaType = BaseType & React.ComponentProps<'textarea'>;

export const TextField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Text Field'}</label>}
      <input
        type='text'
        id={name}
        className={clsx(className, style.text)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const SearchField = ({
  className,
  name,
  submitPosition = 'inside',
  showLabel = false,
  label,
  ...props
}: { submitPosition?: 'inside' | 'outside' } & BaseInputType) => {
  if (submitPosition === 'outside') {
    return (
      <>
        {showLabel && <label htmlFor={name}>{label || 'Search Field'}</label>}
        <div className={clsx(style['search__wrapper--outside'], 'search__wrapper--outside')}>
          <input
            type='search'
            id={name}
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
      </>
    );
  }
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Search Field'}</label>}
      <div className={clsx('search__wrapper')}>
        <input
          type='search'
          id={name}
          className={clsx(className, style.search)}
          {...stripInvalidInputProps(props)}
        />
        <button type='submit' className={clsx('search__button')} aria-label='Search'>
          <IconSearch stroke={2} />
        </button>
      </div>
    </>
  );
};

export const NumberField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Number Field'}</label>}
      <input
        type='number'
        id={name}
        className={clsx(className, style.number)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const PasswordField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Password Field'}</label>}
      <input
        type='password'
        id={name}
        className={clsx(className, style.password)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const EmailField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: React.ComponentProps<'input'> & BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Email Field'}</label>}
      <input
        type='email'
        id={name}
        className={clsx(className, style.email)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const RangeField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Range Field'}</label>}
      <input
        type='range'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.range)}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const DateField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Date Field'}</label>}
      <input
        type='date'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.date)}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const ColorField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Colour Field'}</label>}
      <input
        type='color'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.color)}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const FileField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'File Field'}</label>}
      <input
        type='file'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.file)}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const CheckboxField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Checkbox Field'}</label>}
      <input
        type='checkbox'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.checkbox)}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const RadioField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Radio Field'}</label>}
      <input
        type='radio'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.radio)}
        {...stripInvalidInputProps(props)}
      />
    </>
  );
};

export const SelectField = ({
  className,
  name,
  register,
  required,
  label,
  showLabel = true,
  ...props
}: BaseSelectType) => {
  return (
    <div className='select__wrapper'>
      {showLabel && <label htmlFor={name}>{label || 'Select Field'}</label>}
      <select
        id={name}
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
  ...props
}: BaseTextAreaType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Textarea Field'}</label>}
      <textarea
        id={name}
        className={clsx(className, style.textarea)}
        {...(register && name ? register(`${name}`, { required }) : {})}
        {...stripInvalidTextareaProps(props)}
      />
    </>
  );
};

export const FormField = ({ className, ...props }: React.ComponentProps<'form'>) => {
  return <form className={clsx(className, style.form)} {...props} />;
};

export const Label = ({ className, ...props }: React.ComponentProps<'label'>) => {
  return <label className={clsx(className, style.label)} {...props} />;
};
