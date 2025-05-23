import clsx from 'clsx';
import style from './style.module.scss';
import React from 'react';

type SwitcherProps = {
  className?: string;
  children: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
};

export const Switcher = ({ className, children, value, onChange, ...props }: SwitcherProps) => {
  return (
    <div className={clsx(style.switcher__container, className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<SwitcherButtonProps>(child)) {
          const childValue = child.props.value;
          return React.cloneElement(child, {
            active: childValue === value,
            onClick: () => {
              onChange?.(childValue);
            },
          });
        }
        return child;
      })}
    </div>
  );
};

type SwitcherButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  value: string;
};

export const SwitcherButton = ({
  className,
  children,
  active,
  onClick,
  ...props
}: SwitcherButtonProps) => {
  return (
    <button
      className={clsx(style.switcher__button, className, {
        [style['switcher__button--active']]: active,
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
