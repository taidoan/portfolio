import style from './style.module.scss';
import clsx from 'clsx';

export type AlertTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export const AlertTitle = ({ children, className }: AlertTitleProps) => {
  const titleClassName = clsx(style.alert__title, className);
  return <h4 className={titleClassName}>{children}</h4>;
};
