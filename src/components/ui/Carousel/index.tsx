'use client';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import { AnimatePresence } from 'motion/react';
import type { CarouselProps } from './types';
import useEmblaCarousel from 'embla-carousel-react';
import AutoHeight from 'embla-carousel-auto-height';
import Autoplay from 'embla-carousel-autoplay';
import { Children, useCallback, useRef, useState, useEffect } from 'react';

import clsx from 'clsx';
import style from './style.module.scss';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useCarouselHeight } from './utils/useCarouselHeight';
import { usePagination, Pagination } from './components/pagination';
import { useKeyboard } from './components/keyboard';
import { ButtonNavigation } from './components/buttonNavigation';
import { CarouselSlide } from './components/slide';

export const Carousel = ({
  children,
  className,
  wrapperClassName,
  slideClassName,
  slidesPerView = 3,
  slidesToScroll = 'auto',
  slideSpacing = 16,
  loop = false,
  focus,
  pagination,
  paginationType = 'bullets',
  direction = 'horizontal',
  disableAt,
  autoHeight,
  autoPlay,
  keyboardControls,
  buttonNavigation,
  paginationColor,
  ...props
}: CarouselProps) => {
  const isMediaQueryMatched = useMediaQuery(disableAt || 'none');
  const [isActive, setIsActive] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const childrenRefs = useRef<Array<HTMLDivElement | null>>([]);
  const numSlides = focus ? 3 : (slidesPerView ?? 1);

  useCarouselHeight(direction, numSlides, slidesPerView, childrenRefs, carouselRef);

  useEffect(() => {
    setIsActive(!disableAt || !isMediaQueryMatched);
  }, [isMediaQueryMatched, disableAt]);

  const config = {
    buttonNav: buttonNavigation ?? false,
    pagination: pagination ?? false,
    autoHeight: autoHeight ?? false,
    autoPlay: autoPlay ?? false,
    keyboardControls: keyboardControls ?? false,
  };

  const options: EmblaOptionsType = {
    active: true,
    loop,
    slidesToScroll: slidesToScroll as EmblaOptionsType['slidesToScroll'],
    axis: direction === 'vertical' || direction === 'vertical-scroll' ? 'y' : 'x',
    breakpoints: disableAt ? { [disableAt]: { active: false } } : undefined,
  };

  const plugins = [
    ...(autoHeight ? [AutoHeight()] : []),
    ...(autoPlay
      ? [
          Autoplay({
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
          }),
        ]
      : []),
  ];

  useEffect(() => {
    if (slidesPerView && carouselRef.current) {
      carouselRef.current.style.setProperty('--slide-height-lg', `${100 / slidesPerView}%`);
      carouselRef.current.style.setProperty('--slide-size-lg', `${100 / slidesPerView}%`);
    }
  }, [slidesPerView]);

  useEffect(() => {
    if (slideSpacing && carouselRef.current) {
      carouselRef.current.style.setProperty(
        '--slide-spacing',
        `${Math.round(slideSpacing / 16)}rem`,
      );
    }
  }, [slideSpacing]);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi.on('reInit', onScroll).on('scroll', onScroll).on('slideFocus', onScroll);
  }, [emblaApi, onScroll]);

  useKeyboard({
    isEnabled: keyboardControls,
    onNext: scrollNext,
    onPrev: scrollPrev,
    elementRef: carouselRef,
  });

  const { selectedIndex, scrollSnaps, onDotClick } = usePagination(emblaApi!);

  const wrapperClasses = clsx(!isActive && wrapperClassName, {
    [style.wrapper]: isActive && direction === 'horizontal',
    [style['wrapper--vertical']]:
      isActive && (direction === 'vertical' || direction === 'vertical-scroll'),
    [style['wrapper--focused']]:
      isActive && focus && (direction === 'vertical' || direction === 'vertical-scroll'),
  });

  const slideClasses = clsx(style.slide, slideClassName);

  const childrenCount = Children.count(children);

  const renderSlides = () => {
    const slides = Children.map(children, (child, index) => (
      <CarouselSlide
        key={index}
        child={child}
        isActive={index === selectedIndex}
        slideClasses={slideClasses}
        isCarouselActive={isActive}
        ref={
          index < numSlides
            ? (el: HTMLDivElement | null) => {
                childrenRefs.current[index] = el;
              }
            : undefined
        }
      />
    ));

    if (direction === 'horizontal') {
      return <AnimatePresence mode='popLayout'>{slides}</AnimatePresence>;
    }

    return slides;
  };

  return (
    <div
      ref={carouselRef}
      className={clsx(style.container, className)}
      aria-disabled={!isActive}
      data-direction={direction}
      data-testid='carousel'
      {...props}
    >
      <div className={style.viewport} ref={emblaRef}>
        <div className={wrapperClasses}>{renderSlides()}</div>
      </div>
      {isActive && childrenCount > 1 && (
        <div className={style.controls}>
          {config.buttonNav && <ButtonNavigation onPrev={scrollPrev} onNext={scrollNext} />}
          {config.pagination && paginationType === 'bullets' && (
            <Pagination
              scrollSnaps={scrollSnaps}
              selectedIndex={selectedIndex}
              onDotClick={onDotClick}
              paginationColor={paginationColor}
            />
          )}
          {config.pagination && paginationType === 'progress' && (
            <div className={style.progress}>
              <div
                className={clsx(style['progress__bar'], {
                  [`bg--${paginationColor}`]: paginationColor,
                })}
                style={
                  direction === 'vertical-scroll'
                    ? { transform: `translate3d(0px,${scrollProgress}%,0px)` }
                    : { transform: `translate3d(${scrollProgress}%,0px,0px)` }
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
