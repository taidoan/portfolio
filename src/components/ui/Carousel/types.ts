export type CarouselProps = {
  children?: React.ReactNode[] | React.ReactNode;
  className?: string | undefined | null;
  wrapperClassName?: string | undefined;
  slideClassName?: string | undefined;
  slidesPerView?: number;
  slidesToScroll?: number | 'auto' | string;
  slideSpacing?: number;
  loop?: boolean;
  focus?: boolean | null;
  pagination?: boolean;
  paginationType?: 'bullets' | 'progress' | null;
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
  disableAt?: string | null;
  autoHeight?: boolean;
  autoPlay?: boolean;
  keyboardControls?: boolean;
  buttonNavigation?: boolean;
};
