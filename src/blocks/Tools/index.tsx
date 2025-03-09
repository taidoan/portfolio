'use client';

import type { ToolsBlockProps, Media } from '@/payload-types';
import { useState, useRef } from 'react';
import { ImageMedia } from '@/components/ui/Media/Image';
import { Card, CardBody } from '@/components/ui/Card';
import { RichText } from '@/components/ui/RichText';
import { Dialog } from '@/components/ui/Dialog';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import style from './style.module.scss';

export type Props = {
  className?: string;
} & ToolsBlockProps;

const ToolImage = ({ icon, onClick }: { icon: string | Media; onClick?: () => void }) => {
  if (typeof icon === 'object' && icon !== null) {
    return (
      <ImageMedia
        src={icon.filename ?? ''}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        className={style.tools__icon}
        onClick={onClick}
        sizes='184px'
      />
    );
  }

  return (
    <Alert severity='warning'>
      <AlertTitle>Missing Icon</AlertTitle>No icon was provided. Please add an icon to this tool.
    </Alert>
  );
};

export const ToolsBlock = ({ tools, className }: Props) => {
  return <div className={className}>tyest</div>;
};
