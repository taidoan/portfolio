import style from './style.module.scss';
import clsx from 'clsx';

export const Spinner = ({
  className,
  text = 'Loading...',
}: {
  className?: string;
  text?: string;
}) => {
  return (
    <div className={clsx(style.spinner__container, className)}>
      <div className={style.spinner}></div>
      <p>{text}</p>
    </div>
  );
};
