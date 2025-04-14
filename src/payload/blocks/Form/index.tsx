'use client';
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { buildInitialFormState } from './initialFormState';
import { fields } from './fields';

import RichText from '@/components/ui/RichText';
import { Button } from '@components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Alert, AlertTitle } from '@/components/ui/Alert';

export type Value = unknown;

export type Property = {
  [key: string]: Value;
};

export type Data = {
  [key: string]: Property | Property[] | Value;
};

export type FormBlockType = {
  blockName?: string;
  blockType?: 'formBlock';
  form: FormType;
  id?: string;
  className?: string;
};

export const FormBlock: React.FC<FormBlockType> = ({ className, ...props }) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
  } = props;

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  });

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<{ message: string; status?: string } | undefined>();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>;

      const submitForm = async () => {
        setError(undefined);

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });

          const res = await req.json();

          clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);
            setError({
              message: res.error?.[0]?.message || 'Internal Server Error',
              status: res.status,
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect;
            const redirectUrl = url;

            if (redirectUrl) router.push(redirectUrl);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: 'Something went wrong, please try again later.',
          });
        }
      };

      void submitForm();
    },
    [router, formID, redirect, confirmationType],
  );

  return (
    <div className={className}>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          <RichText data={confirmationMessage} />
        </Alert>
      )}
      {isLoading && !hasSubmitted && <Spinner text='Sending Message...' />}
      {error && (
        <Alert severity='error'>
          <AlertTitle>${error.status || '500'}</AlertTitle>
          {error.message || ''}
        </Alert>
      )}
      {!hasSubmitted && (
        <form id={formID} onSubmit={handleSubmit(onSubmit)} autoComplete=''>
          {formFromProps &&
            formFromProps.fields &&
            formFromProps.fields.map((field, index) => {
              const Field: React.FC<any> = fields?.[field.blockType];

              if (Field) {
                return (
                  <React.Fragment key={index}>
                    <Field
                      {...field}
                      {...formMethods}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  </React.Fragment>
                );
              }

              return null;
            })}
          <Button type='submit'>{submitButtonLabel}</Button>
        </form>
      )}
    </div>
  );
};
