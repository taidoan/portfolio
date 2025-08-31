'use client';
import { useEffect } from 'react';
import { TextFieldClientProps } from 'payload';
import { IconClipboard } from '@tabler/icons-react';
import { useField, Button, TextInput, FieldLabel, useFormFields } from '@payloadcms/ui';
import { toast } from '@payloadcms/ui';
import './index.scss';

export type UrlComponentProps = {
  fieldToUse: string;
  collection?: string;
} & TextFieldClientProps;

export const UrlComponent = ({ field, fieldToUse, path }: UrlComponentProps) => {
  const { label } = field;
  const { value, setValue } = useField<string>({ path: path || field.name });

  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string;
  });

  useEffect(() => {
    if (targetFieldValue) {
      setValue(targetFieldValue);
    } else {
      setValue('');
    }
  }, [targetFieldValue, setValue]);

  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        toast.success('Copied to clipboard');
      } catch (error) {
        console.error('Failed to copy to clipboard', error);
        toast.error('Failed to copy to clipboard');
      }
    }
  };

  return (
    <div className='field-type url-field-component'>
      <div className='label-wrapper'>
        <FieldLabel htmlFor={`field-${path}`} label={label} />
        <Button onClick={handleCopy} buttonStyle='none' className='copy-button'>
          Copy <IconClipboard stroke={2} />
        </Button>
      </div>
      <TextInput value={value} onChange={setValue} path={path || field.name} readOnly={true} />
    </div>
  );
};
