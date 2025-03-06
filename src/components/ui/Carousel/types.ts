export type CarouselProps = {
  children?: React.ReactNode[] | React.ReactNode;
  className?: string | undefined;
  wrapperClassName?: string | undefined;
  slideClassName?: string | undefined;
  slidesPerView?: number;
  slidesToScroll?: number | 'auto' | string;
  slideSpacing?: number;
  loop?: boolean;
  focus?: boolean;
  pagination?: boolean;
  paginationType?: 'bullets' | 'progress';
  direction?: 'vertical' | 'horizontal' | 'vertical-scroll';
  disableAt?: string;
  autoHeight?: boolean;
  autoPlay?: boolean;
  keyboardControls?: boolean;
  buttonNavigation?: boolean;
};
