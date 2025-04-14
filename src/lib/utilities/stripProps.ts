function stripProps<T extends object>(props: T, allowedKeys: (keyof T)[]) {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        allowedKeys.includes(key as keyof T) || key.startsWith('data-') || key.startsWith('aria-'),
    ),
  ) as Partial<T>;
}

/**
 * Strips invalid input props from the props object.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - The props object to be stripped.
 * @returns {Partial<React.InputHTMLAttributes<HTMLInputElement>>} - The stripped props object.
 */
export const stripInvalidInputProps = (
  props: React.InputHTMLAttributes<HTMLInputElement>,
): Partial<React.InputHTMLAttributes<HTMLInputElement>> => {
  const allowed: (keyof React.InputHTMLAttributes<HTMLInputElement>)[] = [
    'type',
    'value',
    'onChange',
    'onBlur',
    'placeholder',
    'disabled',
    'readOnly',
    'autoFocus',
    'maxLength',
    'minLength',
    'name',
    'id',
    'className',
    'checked',
    'defaultValue',
    'defaultChecked',
    'required',
    'pattern',
    'step',
    'min',
    'max',
    'size',
    'form',
    'autoComplete',
    'list',
    'inputMode',
    'multiple',
  ];

  return stripProps(props, allowed);
};

/**
 * Strips invalid select props from the props object.
 * @param {React.SelectHTMLAttributes<HTMLSelectElement>} props - The props object to be stripped.
 * @returns {Partial<React.SelectHTMLAttributes<HTMLSelectElement>>} - The stripped props object.
 */
export const stripInvalidSelectProps = (
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
): Partial<React.SelectHTMLAttributes<HTMLSelectElement>> => {
  const allowed: (keyof React.SelectHTMLAttributes<HTMLSelectElement>)[] = [
    'value',
    'onChange',
    'onBlur',
    'disabled',
    'name',
    'id',
    'className',
    'required',
    'multiple',
    'size',
    'autoFocus',
    'form',
  ];

  return stripProps(props, allowed);
};

/**
 * Strips invalid textarea props from the props object.
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props - The props object to be stripped.
 * @returns {Partial<React.TextareaHTMLAttributes<HTMLTextAreaElement>>} - The stripped props object.
 */
export const stripInvalidTextareaProps = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
): Partial<React.TextareaHTMLAttributes<HTMLTextAreaElement>> => {
  const allowed: (keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>)[] = [
    'value',
    'onChange',
    'onBlur',
    'placeholder',
    'disabled',
    'readOnly',
    'autoFocus',
    'maxLength',
    'minLength',
    'name',
    'id',
    'className',
    'required',
    'rows',
    'cols',
    'wrap',
    'defaultValue',
    'form',
    'autoComplete',
  ];

  return stripProps(props, allowed);
};
