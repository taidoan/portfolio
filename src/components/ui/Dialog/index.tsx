'use client';
import { useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import style from './style.module.scss';

export type DialogProps = {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  open?: boolean;
};

export const Dialog = ({ children, className, isOpen, onClose, open }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dialogClasses = clsx(style.dialog, className);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      if (onClose) {
        onClose();
      }
    };
    dialog.addEventListener('close', handleClose);
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [isOpen, onClose]);

  return (
    <dialog className={dialogClasses} role='dialog' ref={dialogRef} aria-modal='true' open={open}>
      <button className={style['modal__close-button']} onClick={onClose} aria-label='Close Modal'>
        <IconX stroke={4} />
      </button>
      {children}
    </dialog>
  );
};
