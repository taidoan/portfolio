import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';
import * as React from 'react';
import clsx from 'clsx';
import style from './style.module.scss';
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Text Field'}</label>}
      <input
        type='text'
        id={name}
        className={clsx(className, style.text)}
        {...(register && name ? register(`${name}`, { required }) : {})}
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
}: { submitPosition?: 'inside' | 'outside' } & BaseInputType) => {
  if (submitPosition === 'outside') {
    return (
      <>
        {showLabel && <label htmlFor={name}>{label || 'Search Field'}</label>}
        <div className={clsx(style['search__wrapper--outside'], 'search__wrapper--outside')}>
          <input type='search' id={name} className={clsx(className, style.search)} />
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
        <input type='search' id={name} className={clsx(className, style.search)} />
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Number Field'}</label>}
      <input
        type='number'
        id={name}
        className={clsx(className, style.number)}
        {...(register && name ? register(`${name}`, { required }) : {})}
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Password Field'}</label>}
      <input
        type='password'
        id={name}
        className={clsx(className, style.password)}
        {...(register && name ? register(`${name}`, { required }) : {})}
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
}: React.ComponentProps<'input'> & BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Email Field'}</label>}
      <input
        type='email'
        id={name}
        className={clsx(className, style.email)}
        {...(register && name ? register(`${name}`, { required }) : {})}
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Range Field'}</label>}
      <input
        type='range'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.range)}
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Date Field'}</label>}
      <input
        type='date'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.date)}
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Colour Field'}</label>}
      <input
        type='color'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.color)}
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'File Field'}</label>}
      <input
        type='file'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.file)}
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Checkbox Field'}</label>}
      <input
        type='checkbox'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.checkbox)}
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
}: BaseInputType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Radio Field'}</label>}
      <input
        type='radio'
        id={name}
        {...(register && name ? register(`${name}`, { required }) : {})}
        className={clsx(className, style.radio)}
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
}: BaseSelectType) => {
  return (
    <div className='select__wrapper'>
      {showLabel && <label htmlFor={name}>{label || 'Select Field'}</label>}
      <select
        id={name}
        className={clsx(className, style.select)}
        {...(register && name ? register(`${name}`, { required }) : {})}
      />
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
}: BaseTextAreaType) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label || 'Textarea Field'}</label>}
      <textarea
        id={name}
        className={clsx(className, style.textarea)}
        {...(register && name ? register(`${name}`, { required }) : {})}
      />
    </>
  );
};

export const FormField = ({ className }: React.ComponentProps<'form'>) => {
  return <form className={clsx(className, style.form)} />;
};

export const Label = ({ className }: React.ComponentProps<'label'>) => {
  return <label className={clsx(className, style.label)} />;
};
