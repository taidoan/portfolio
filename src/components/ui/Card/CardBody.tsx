import style from './style.module.scss';
import clsx from 'clsx';

export type CardBodyProps = {
  children?: React.ReactNode;
  className?: string;
  padding?: 'small' | 'base' | 'medium' | 'large';
};

export const CardBody = ({ children, className, padding }: CardBodyProps) => {
  const classes = clsx(style.card__body, className, {
    [style['card__body--p-sm']]: padding === 'small',
    [style['card__body--p-base']]: padding === 'base',
    [style['card__body--p-md']]: padding === 'medium',
    [style['card__body--p-lg']]: padding === 'large',
  });

  return (
    <div className={classes} data-testid='card-body'>
      {children}
    </div>
  );
};
