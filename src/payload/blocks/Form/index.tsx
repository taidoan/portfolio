'use client';
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { buildInitialFormState } from './initialFormState';
import { fields } from './fields';
import clsx from 'clsx';

import RichText from '@/components/ui/RichText';
import { Button } from '@components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import { Turnstile } from 'next-turnstile';
import { TURNSTILE_SITE_KEY } from '@/lib/constants';

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
  container: string;
  customClassName?: string;
  backgroundColour?: string;
  borderRadius: string;
  form: FormType;
  id?: string;
  className?: string;
};

export const FormBlock: React.FC<FormBlockType> = ({ className, ...props }) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    customClassName,
    container,
    backgroundColour,
    borderRadius,
  } = props;

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<{ message: string; status?: string } | undefined>();
  const [turnstileStatus, setTurnstileStatus] = useState<
    'success' | 'error' | 'expired' | 'required'
  >('required');
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const formSubmitAttempted = useRef(false);
  const router = useRouter();
  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>;

      const submitForm = async () => {
        setError(undefined);
        formSubmitAttempted.current = true;

        if (turnstileStatus !== 'success' || !turnstileToken) {
          setError({
            message: 'Please verify you are a not a robot.',
          });
          setIsLoading(false);
          return;
        }

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
              token: turnstileToken,
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
              status: res.status.toString(),
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
            status: '500',
          });
        }
      };

      void submitForm();
    },
    [router, formID, redirect, confirmationType, turnstileStatus, turnstileToken],
  );

  const formClasses = clsx(customClassName, {
    [`border-radius--${borderRadius}`]: borderRadius,
    [`container--boxed`]: container === 'boxed',
    [`bg--${backgroundColour}`]: backgroundColour,
  });

  return (
    <div className={className}>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          <RichText data={confirmationMessage} />
        </Alert>
      )}
      {isLoading && !hasSubmitted && (
        <div className={formClasses}>
          <Spinner text='Sending Message...' />
        </div>
      )}
      {error && (
        <Alert severity='error'>
          <AlertTitle>{error.status || '500'}</AlertTitle>
          {error.message || ''}
        </Alert>
      )}
      {!hasSubmitted && (
        <form id={formID} onSubmit={handleSubmit(onSubmit)} className={formClasses}>
          {formFromProps &&
            formFromProps.fields &&
            formFromProps.fields.map((field, index) => {
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            theme='light'
            className='turnstile__widget'
            appearance='execute'
            execution='render'
            /* @ts-expect-error - turnstile typings are incorrect */
            size='flexible'
            onError={() => {
              setTurnstileStatus('error');
              setTurnstileToken('');
              setError({
                message: 'Security check failed, please try again.',
              });
            }}
            onExpire={() => {
              setTurnstileStatus('expired');
              setTurnstileToken('');
              setError({
                message: 'Security check expired, please verify again.',
              });
            }}
            onLoad={() => {
              setTurnstileStatus('required');
              setTurnstileToken('');
              setError(undefined);
            }}
            onVerify={(token) => {
              setTurnstileStatus('success');
              setTurnstileToken(token);
              setError(undefined);
            }}
          />
          <Button type='submit' color='secondary' hoverColor='accent' width='full'>
            {submitButtonLabel}
          </Button>
        </form>
      )}
    </div>
  );
};
