import style from './style.module.scss';
import clsx from 'clsx';

export type CardBodyProps = {
  children?: React.ReactNode;
  className?: string;
};

export const CardBody = ({ children, className }: CardBodyProps) => {
  const classes = clsx(style.card__body, className);
  return (
    <div className={classes} data-testid='card-body'>
      {children}
    </div>
  );
};
