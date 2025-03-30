'use client';
import { useCallback, useEffect } from 'react';
import { TextFieldClientProps } from 'payload';
import { IconLock, IconLockOpen2 } from '@tabler/icons-react';
import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from '@payloadcms/ui';
import './index.scss';

export type Props = {
  fieldToUse: string;
  checkboxFieldPath: string;
  clonedFieldName: string;
} & TextFieldClientProps;

export const ClonedFieldComponent = ({
  field,
  path,
  readOnly: readOnlyFromProps,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  clonedFieldName,
}: Props) => {
  const { label } = field;

  const checkboxFieldPath = path?.includes('.')
    ? `${path.replace(`.${clonedFieldName}`, '')}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps;

  const { value, setValue } = useField<string>({ path: path || field.name });

  const { dispatchFields } = useForm();

  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string;
  });

  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string;
  });

  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        if (targetFieldValue !== undefined && value !== targetFieldValue)
          setValue(targetFieldValue);
      } else if (targetFieldValue === undefined && value !== '') {
        if (value !== '') setValue('');
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value]);

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault();

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue,
      });
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  );

  const readOnly = readOnlyFromProps || checkboxValue;

  return (
    <div className='field-type cloned-field-component'>
      <div className='label-wrapper'>
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button className='lock-button' buttonStyle='none' onClick={handleLock}>
          {checkboxValue ? (
            <>
              Unlock <IconLockOpen2 stroke={2} />
            </>
          ) : (
            <>
              Lock <IconLock stroke={2} />
            </>
          )}
        </Button>
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
        description={field.admin?.description}
        style={field?.admin?.style}
        className={field?.admin?.className}
      />
    </div>
  );
};
