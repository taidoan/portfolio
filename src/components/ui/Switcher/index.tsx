import clsx from 'clsx';
import style from './style.module.scss';

export type SwitcherProps = {
  className?: string;
  children: React.ReactNode;
  active?: boolean;
};

export const Switcher = ({ className, children }: SwitcherProps) => {
  return <div className={clsx(style.switcher__container, className)}>{children}</div>;
};

export const SwitcherButton = ({ className, children, active }: SwitcherProps) => {
  return (
    <button
      className={clsx(style.switcher__button, className, {
        [style['switcher__button--active']]: active,
      })}
    >
      {children}
    </button>
  );
};
