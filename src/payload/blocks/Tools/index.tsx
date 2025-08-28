'use client';

import type { ToolsBlockProps, Media } from '@/payload-types';
import { useState } from 'react';
import { ImageMedia } from '@/components/ui/Media/Image';
import { Card, CardBody } from '@/components/ui/Card';
import { RichText } from '@/components/ui/RichText';
import { Dialog } from '@/components/ui/Dialog';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { getHref } from '@/lib/utilities/getHref';
import { Divider } from '@/components/ui/Divider';
import style from './style.module.scss';
import clsx from 'clsx';

export type Props = {
  className?: string;
} & ToolsBlockProps;

const ToolImage = ({
  icon,
  onClick,
  className,
}: {
  icon: string | Media;
  onClick?: () => void;
  className?: string;
}) => {
  if (typeof icon === 'object' && icon !== null) {
    return (
      <ImageMedia
        src={icon.filename ?? ''}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        className={clsx(style.tools__image, className)}
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
  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);
  const openDialog = (index: number) => {
    setOpenDialogIndex(index);
  };

  const closeDialog = () => {
    setOpenDialogIndex(null);
  };

  return (
    <Card className={className}>
      <CardBody className={style.tools__block}>
        {tools?.map((tools, index) => {
          const { icon, name, description, link } = tools;
          const href = getHref(link);
          if (!href) return null;

          const newTabProps = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};

          return (
            <div key={index} className={style.tools__entry}>
              <ToolImage icon={icon} onClick={() => openDialog(index)} />
              <Dialog
                isOpen={openDialogIndex === index}
                onClose={closeDialog}
                className={style.tools__modal}
              >
                <div className={style['tools__modal-container']}>
                  <ToolImage icon={icon} className={style['tools__modal-image']} />
                  <div className={style['tools__modal-content']}>
                    <h2 className={style['tools__modal-title']}>{name}</h2>
                    <Divider type='content' className={style['tools__modal-divider']} />
                    {description && <RichText data={description} />}
                  </div>
                  <Button
                    href={href}
                    className={style['tools__modal-button']}
                    color={link.color || undefined}
                    {...newTabProps}
                    aria-label={`Visit ${name}`}
                  >
                    {link.label}
                  </Button>
                </div>
              </Dialog>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};
