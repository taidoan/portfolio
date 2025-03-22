'use client';

import { useRef, useEffect, Children, useState } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';

import {
  LightboxBottomBar,
  LightboxCaption,
  LightboxContent,
  LightboxTopBar,
  LightboxContainer,
} from './components';
import { Carousel } from '@components/ui/Carousel';

export type LightboxProps = {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
  initialIndex?: number;
  captions?: React.ReactNode[];
};

export const Lightbox = ({
  className,
  children,
  onClose,
  open,
  initialIndex = 0,
  captions = [],
  ...props
}: LightboxProps) => {
  const lightboxRef = useRef<HTMLDialogElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const totalSlides = Children.count(children);

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

  useEffect(() => {
    const lightbox = lightboxRef.current;
    if (!lightbox) return;

    const handleClose = () => {
      if (onClose) onClose();
    };
    lightbox.addEventListener('close', handleClose);

    if (open && !lightbox.open) {
      lightbox.showModal();
    } else if (!open && lightbox.open) {
      lightbox.close();
    }

    return () => {
      lightbox.removeEventListener('close', handleClose);
    };
  }, [open, lightboxRef, onClose]);

  const carouselOptions = {
    slidesPerView: 1,
    slidesToScroll: 1,
    keyboardControls: true,
    autoHeight: true,
    startIndex: initialIndex,
  };

  return (
    <>
      <LightboxContainer
        ref={lightboxRef}
        className={clsx(className, style.lightbox__container)}
        open={open || false}
        aria-modal='true'
        onClick={handleOverlayClick}
        {...props}
      >
        <LightboxTopBar dialogRef={lightboxRef} onClose={onClose} />
        <LightboxContent>
          {totalSlides > 1 ? <Carousel {...carouselOptions}>{children}</Carousel> : <>{children}</>}
        </LightboxContent>
        <LightboxBottomBar>
          <div className={style.lightbox__info}>
            {totalSlides > 1 && (
              <div className={style.lightbox__counter}>
                {activeIndex + 1} of {totalSlides}
              </div>
            )}
            <LightboxCaption>{captions[activeIndex] || null}</LightboxCaption>
          </div>
        </LightboxBottomBar>
      </LightboxContainer>
    </>
  );
};
