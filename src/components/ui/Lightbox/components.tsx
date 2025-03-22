import React, { useState, forwardRef, createContext, useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import {
  IconX,
  IconZoomInFilled,
  IconZoomOutFilled,
  IconMaximize,
  IconMinimize,
} from '@tabler/icons-react';

type TransformContextType = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
};

const TransformContext = createContext<TransformContextType | null>(null);

const useTransform = () => {
  const context = useContext(TransformContext);
  if (!context) {
    throw new Error('useTransform must be used within a TransformContext.Provider');
  }
  return context;
};

const LightboxControlButton = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button ref={ref} className={clsx(className, style['lightbox__control-button'])} {...props} />
));

LightboxControlButton.displayName = 'LightboxControlButton';

const LightboxCloseButton = ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 100);
  }, []);

  return (
    <LightboxControlButton
      ref={buttonRef}
      className={clsx(className, style['lightbox__close-button'])}
      aria-label='Close Lightbox'
      {...props}
    >
      <IconX stroke={4} />
    </LightboxControlButton>
  );
};

const LightboxZoomButton = ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { zoomIn, zoomOut } = useTransform();

  const toggleZoom = () => {
    if (isZoomed) {
      zoomOut();
    } else {
      zoomIn();
    }
    setIsZoomed((prev) => !prev);
  };

  return (
    <LightboxControlButton
      className={clsx(className, style['lightbox__zoom-button'])}
      onClick={toggleZoom}
      aria-label='Toggle Zoom'
      {...props}
    >
      {isZoomed ? <IconZoomOutFilled /> : <IconZoomInFilled />}
    </LightboxControlButton>
  );
};

const LightboxFullscreenButton = ({
  className,
  ...props
}: {
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.fullscreenEnabled) {
        try {
          const contentElement =
            document.querySelector(`.${style['lightbox__content']}`) ||
            document.querySelector('.react-transform-component');

          if (contentElement) {
            contentElement.requestFullscreen().catch((err) => {
              console.error('Error entering content fullscreen:', err);

              document.documentElement
                .requestFullscreen()
                .catch((err) => console.error('Fallback also failed:', err));
            });
          } else {
            document.documentElement.requestFullscreen();
          }
        } catch (e) {
          console.error('Error requesting fullscreen:', e);
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  return (
    <LightboxControlButton
      className={clsx(className, style['lightbox__fullscreen-button'])}
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      {...props}
    >
      {isFullscreen ? <IconMinimize stroke={3} /> : <IconMaximize stroke={3} />}
    </LightboxControlButton>
  );
};

type LightboxTopBarProps = {
  className?: string;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const LightboxTopBar = ({
  className,
  dialogRef,
  onClose,
  ...props
}: LightboxTopBarProps) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      onClose?.();
    }
  };

  return (
    <div className={clsx(className, style['lightbox__top-bar'])} {...props}>
      <div className={style['lightbox__counter']}>Counter here</div>
      <div className={style['lightbox__controls']}>
        <LightboxZoomButton data-testid='zoomLightbox' />
        {!isIOS && <LightboxFullscreenButton data-testid='fullscreenLightbox' />}
        <LightboxCloseButton onClick={handleClose} data-testid='closeLightbox' />
      </div>
    </div>
  );
};

export const LightboxCaption = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <figcaption className={clsx(className, style['lightbox__caption'])} {...props} />
);

export const LightboxBottomBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(className, style['lightbox__bottom-bar'])} {...props} />
);

export const LightboxContent = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
  <TransformComponent
    wrapperClass={style.lightbox__wrapper}
    contentClass={style['lightbox__content']}
  >
    {children}
  </TransformComponent>
);

type LightboxContainerProps = {
  open: boolean;
} & React.HTMLAttributes<HTMLDialogElement>;

export const LightboxContainer = forwardRef<HTMLDialogElement, LightboxContainerProps>(
  ({ className, children, open, ...props }, ref) => {
    return (
      <dialog
        ref={ref}
        className={clsx(className, style['lightbox__container'])}
        open={open}
        {...props}
      >
        <TransformWrapper
          minScale={1}
          maxScale={2.5}
          doubleClick={{ mode: 'toggle' }}
          initialScale={1}
          centerOnInit={true}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <TransformContext.Provider value={{ zoomIn, zoomOut, resetTransform }}>
              {children}
            </TransformContext.Provider>
          )}
        </TransformWrapper>
      </dialog>
    );
  },
);

LightboxContainer.displayName = 'LightboxContainer';
