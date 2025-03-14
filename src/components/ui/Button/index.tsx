import style from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { IconCircleArrowRightFilled, IconExternalLink } from '@tabler/icons-react';

/**
 * Button component renders a button with a custom color, shadow, href, target, title, and action.
 * @param props - {@link ButtonProps}
 * @param {string} [props.children] - The content of the button.
 * @param {string} [props.className] - The class name to be applied to the button.
 * @param {string} [props.href] - The URL of the button.
 * @param {string} [props.target] - The target of the button.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {string} [props.title] - The title of the button.
 * @param {string} [props.color] - The color of the button.
 * @param {string} [props.hoverColor] - The hover color of the button.
 * @param {string} [props.shadow] - The shadow of the button.
 * @param {string} [props.type] - The type of the button.
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
export type ButtonProps = {
  action?: () => void;
  className?: string;
  href?: string;
  target?: string;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'light-grey' | 'sage' | 'slate' | 'bittersweet';
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
  variant?: 'outlined' | 'fill';
};

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
}: ButtonProps) => {
  const buttonClasses = clsx(style.button, className, {
    [style[`button--clr-${color}`]]: !!color,
    [style[`button--shadow-${shadow}`]]: shadow && shadow !== 'none',
    [style[`button--hover-clr-${hoverColor}`]]:
      hoverColor && hoverColor !== 'default' && variant !== 'outlined',
    [style[`button--${variant}`]]: variant,
  });

  if (!href) {
    return (
      <button
        className={buttonClasses}
        onClick={action}
        type={type}
        disabled={disabled || undefined}
        aria-label={title || (typeof children === 'string' ? children : undefined)}
      >
        {children}
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
    >
      {children}
      {target === '_blank' ? <IconExternalLink stroke={3} /> : <IconCircleArrowRightFilled />}
    </Link>
  );
};
