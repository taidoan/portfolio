'use client';
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export type FormBlockProps = {
  form: FormType;
};

export const FormBlock = ({ form }: FormBlockProps) => {
  return <div>Form here</div>;
};
