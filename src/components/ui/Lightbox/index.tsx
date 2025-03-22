import { useRef } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';

import {
  LightboxBottomBar,
  LightboxCaption,
  LightboxContent,
  LightboxTopBar,
  LightboxContainer,
} from './components';

export type LightboxProps = {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
};

export const Lightbox = ({ className, children, onClose, open, ...props }: LightboxProps) => {
  const lightboxRef = useRef<HTMLDialogElement | null>(null);

  const openLightbox = () => lightboxRef.current?.showModal();
  const handleOverlayClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const rect = lightboxRef.current?.getBoundingClientRect();
    if (
      rect &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    ) {
      if (lightboxRef.current) {
        lightboxRef.current.close();
        onClose?.();
      }
    }
  };

  return (
    <>
      <button onClick={openLightbox} data-testid='openLightbox'>
        Open Lightbox
      </button>

      <LightboxContainer
        ref={lightboxRef}
        className={clsx(className, style.lightbox__container)}
        open={open || false}
        aria-modal='true'
        onClick={handleOverlayClick}
        {...props}
      >
        <LightboxTopBar dialogRef={lightboxRef} onClose={onClose} />
        <LightboxContent>{children}</LightboxContent>
        <LightboxBottomBar>
          <LightboxCaption>Caption here</LightboxCaption>
        </LightboxBottomBar>
      </LightboxContainer>
    </>
  );
};
