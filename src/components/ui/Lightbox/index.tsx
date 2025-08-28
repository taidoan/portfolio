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
  LightboxNavigationButton,
} from './components';
import { Carousel } from '@components/ui/Carousel';
import { RichText } from '@components/ui/RichText';
import type { EmblaCarouselType } from 'embla-carousel';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

export type LightboxProps = {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
  initialIndex?: number;
  captions?: (DefaultTypedEditorState | null)[];
  items?: Array<{ caption?: DefaultTypedEditorState }>;
};

/**
 * Lightbox component is a modal that displays a large image or video. It will automatically display a carousel if more than one piece of media is provided. It can be used to display additional information or content related to the main image
 * @param {LightboxProps} props - Lightbox component props
 * @returns {React.ReactElement} Lightbox component
 * @example
 * <Lightbox
 *   className={className}
 *   children={children}
 *   onClose={onClose}
 *   open={open}
 *   initialIndex={initialIndex}
 *   captions={captions}
 *   items={items}
 * />
 */
export const Lightbox = ({
  className,
  children,
  onClose,
  open,
  initialIndex = 0,
  captions = [],
  items = [],
  ...props
}: LightboxProps) => {
  const lightboxRef = useRef<HTMLDialogElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
  const totalSlides = Children.count(children);

  const itemCaptions = items.map((item) => item.caption || null);
  const displayCaptions = captions.length > 0 ? captions : itemCaptions;

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

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on('select', onSelect);
      emblaApi.on('settle', onSelect);

      setActiveIndex(emblaApi.selectedScrollSnap());

      if (initialIndex !== emblaApi.selectedScrollSnap()) {
        emblaApi.scrollTo(initialIndex);
      }

      return () => {
        emblaApi.off('select', onSelect);
        emblaApi.off('settle', onSelect);
      };
    }
  }, [emblaApi, initialIndex]);

  const handleEmblaInit = (api: EmblaCarouselType) => {
    setEmblaApi(api);
  };

  const handleOnNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  };

  const handleOnPrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  };

  const carouselOptions = {
    slidesPerView: 1,
    slidesToScroll: 1,
    keyboardControls: true,
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
        <LightboxTopBar
          dialogRef={lightboxRef}
          onClose={onClose}
          currentIndex={activeIndex}
          totalSlides={totalSlides}
        />
        {totalSlides > 1 && (
          <LightboxNavigationButton onClick={() => handleOnPrev()} direction='prev' />
        )}
        <LightboxContent>
          {totalSlides > 1 ? (
            <Carousel
              className={style.lightbox__carousel}
              {...carouselOptions}
              onInit={handleEmblaInit}
              slideClassName={style['lightbox__carousel-slide']}
            >
              {children}
            </Carousel>
          ) : (
            <>{children}</>
          )}
        </LightboxContent>
        {totalSlides > 1 && (
          <LightboxNavigationButton onClick={() => handleOnNext()} direction='next' />
        )}
        <LightboxBottomBar>
          {displayCaptions[activeIndex] && (
            <LightboxCaption>
              <RichText data={displayCaptions[activeIndex]} />
            </LightboxCaption>
          )}
        </LightboxBottomBar>
      </LightboxContainer>
    </>
  );
};
