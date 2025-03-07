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
  paginationColor?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'urban-steel'
    | 'slate'
    | 'bitter-sweet'
    | 'chery-punch'
    | 'fresh-leaf';
  direction?: 'vertical' | 'horizontal' | 'vertical-scroll';
  disableAt?: string;
  autoHeight?: boolean;
  autoPlay?: boolean;
  keyboardControls?: boolean;
  buttonNavigation?: boolean;
};
