import style from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { IconCircleArrowRightFilled, IconExternalLink, IconShare } from '@tabler/icons-react';

export type ButtonProps = {
  action?: () => void;
  className?: string;
  href?: string;
  target?: string;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'light-grey'
    | 'sage'
    | 'slate'
    | 'bittersweet'
    | 'frosted-pearl';
  hoverColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'light-grey'
    | 'sage'
    | 'slate'
    | 'bittersweet';
  shadow?: 'none' | 'small' | 'medium' | 'large' | null | undefined;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: 'share';
  variant?: 'outlined' | 'fill';
  styleOverrides?: React.CSSProperties;
  id?: string;
  width?: 'auto' | 'full' | 'half' | 'quarter' | 'third' | 'two-thirds' | 'three-quarters';
};

/**
 * Button component renders a button with a custom color, shadow, href, target, title, and action.
 * @param {ButtonProps} props
 * @returns {JSX.Element} The rendered button component.
 * @example
 * <Button>Button</Button>
 * <Button color="primary">Button</Button>
 * <Button color="secondary">Button</Button>
 * <Button color="accent">Button</Button>
 * <Button color="light-grey">Button</Button>
 * <Button color="sage">Button</Button>
 * <Button color="slate">Button</Button>
 * <Button color="bittersweet">Button</Button>
 * <Button shadow="small">Button</Button>
 * <Button shadow="medium">Button</Button>
 * <Button shadow="large">Button</Button>
 * <Button href="/">Button</Button>
 * <Button target="_blank" href="/">Button</Button>
 * <Button disabled>Button</Button>
 * <Button action={() => alert('Button clicked')}>Button</Button>
 * <Button title="Button">Button</Button>
 */

export const Button = ({
  action,
  className,
  href,
  target,
  disabled,
  title,
  children,
  color = 'light-grey',
  shadow = 'none',
  type = 'button',
  hoverColor = 'default',
  variant = 'fill',
  styleOverrides,
  width = 'auto',
  buttonType,
}: ButtonProps) => {
  const buttonClasses = clsx(style.button, className, {
    [style[`button--clr-${color}`]]: !!color,
    [style[`button--shadow-${shadow}`]]: shadow && shadow !== 'none' && variant !== 'outlined',
    [style[`button--hover-clr-${hoverColor}`]]:
      hoverColor && hoverColor !== 'default' && variant !== 'outlined',
    [style[`button--${variant}`]]: variant,
    [style[`button-width--${width}`]]: width !== 'auto',
    [style[`button--type-share`]]: buttonType === 'share',
  });

  if (!href) {
    return (
      <button
        className={buttonClasses}
        onClick={action}
        type={type}
        disabled={disabled || undefined}
        aria-label={title || (typeof children === 'string' ? children : undefined)}
        style={styleOverrides}
      >
        {children}
        {buttonType === 'share' && <IconShare className={style.button__icon} />}
      </button>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      className={buttonClasses}
      onClick={action}
      title={title}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      style={styleOverrides}
    >
      {children}
      {target === '_blank' ? <IconExternalLink stroke={3} /> : <IconCircleArrowRightFilled />}
    </Link>
  );
};
