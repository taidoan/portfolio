import * as React from 'react';
import clsx from 'clsx';
import style from './style.module.scss';
import { IconSearch } from '@tabler/icons-react';
import { Button } from '../Button';

export const TextField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='text' className={clsx(className, style.text)} {...props} />;
};

export const SearchField = ({
  className,
  submitPosition = 'inside',
  ...props
}: React.ComponentProps<'input'> & { submitPosition?: 'inside' | 'outside' }) => {
  if (submitPosition === 'outside') {
    return (
      <div className={clsx(style['search__wrapper--outside'])}>
        <input type='search' className={clsx(className, style.search)} {...props} />
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
    );
  }
  return (
    <div className={clsx('search__wrapper')}>
      <input type='search' className={clsx(className, style.search)} {...props} />
      <button type='submit' className={clsx('search__button')} aria-label='Search'>
        <IconSearch stroke={2} />
      </button>
    </div>
  );
};

export const NumberField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='number' className={clsx(className, style.number)} {...props} />;
};

export const PasswordField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='password' className={clsx(className, style.password)} {...props} />;
};

export const EmailField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='email' className={clsx(className, style.email)} {...props} />;
};

export const RangeField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='range' className={clsx(className, style.range)} {...props} />;
};

export const DateField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='date' className={clsx(className, style.date)} {...props} />;
};

export const ColorField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='color' className={clsx(className, style.color)} {...props} />;
};

export const FileField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='file' className={clsx(className, style.file)} {...props} />;
};

export const CheckboxField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='checkbox' className={clsx(className, style.checkbox)} {...props} />;
};

export const RadioField = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return <input type='radio' className={clsx(className, style.radio)} {...props} />;
};

export const SelectField = ({ className, ...props }: React.ComponentProps<'select'>) => {
  return (
    <div className='select__wrapper'>
      <select className={clsx(className, style.select)} {...props} />
    </div>
  );
};

export const TextareaField = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return <textarea className={clsx(className, style.textarea)} {...props} />;
};

export const FormField = ({ className, ...props }: React.ComponentProps<'form'>) => {
  return <form className={clsx(className, style.form)} {...props} />;
};

export const Label = ({ className, ...props }: React.ComponentProps<'label'>) => {
  return <label className={clsx(className, style.label)} {...props} />;
};
