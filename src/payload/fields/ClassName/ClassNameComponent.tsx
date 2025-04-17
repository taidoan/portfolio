'use client';
import { useEffect, useState } from 'react';
import { TextFieldClientProps } from 'payload';
import { useField, TextInput, FieldLabel, useFormFields } from '@payloadcms/ui';
import { formatClass } from './formatClass';

export type ClassNameComopnentProps = {
  fieldToUse: string;
  checkboxFieldPath: string;
} & TextFieldClientProps;

export const ClassNameComponent = ({ field, fieldToUse }: ClassNameComopnentProps) => {
  const { label } = field;
  const { value, setValue } = useField<string>({ path: field.name || field.name });

  const [displayValue, setDisplayValue] = useState<string>(value);

  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string;
  });

  useEffect(() => {
    if (targetFieldValue) {
      const formattedClassName = formatClass(targetFieldValue);
      if (value !== formattedClassName) {
        setValue(formattedClassName);
      }
    }
  }, [targetFieldValue, setValue, value]);

  useEffect(() => {
    setDisplayValue(value || '');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value); // Update the displayed value when the input changes
  };

  return (
    <div className='field-type class-name-field-component'>
      <div className='label-wrapper'>
        <FieldLabel htmlFor={`field-${field.name}`} label={label} />
      </div>
      <TextInput
        value={displayValue} // Keep the user input displayed here
        onChange={handleInputChange}
        path={field.name}
        readOnly={true}
      />
    </div>
  );
};
