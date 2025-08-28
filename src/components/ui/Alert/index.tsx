import style from './style.module.scss';
import clsx from 'clsx';
import { capitaliseFirstLetter } from '@/lib/utilities/capitaliseFirstLetter';
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertCircle,
} from '@tabler/icons-react';

export type AlertProps = {
  severity: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  variant?: 'filled' | 'outlined';
  className?: string;
};

/**
 * Alert component renders a styled alert with a title, severity, and variant.
 * @param {AlertProps} props - Alert component props
 * @returns {React.ReactElement} Alert component
 * @example
 * <Alert severity='success'>Success Message</Alert>
 * <Alert severity='warning'>Warning Message</Alert>
 * <Alert severity='error'>Error Message</Alert>
 * <Alert severity='info'>Info Message</Alert>
 */

export const Alert = ({ severity, children, variant = 'filled', className }: AlertProps) => {
  const labelText = `${capitaliseFirstLetter(severity)} Alert`;
  const iconClasses = clsx(style.alert__icon, style[`alert__icon--${severity}`]);
  const iconMap = {
    success: <IconCircleCheck stroke={2} className={iconClasses} aria-label={labelText} />,
    warning: <IconAlertTriangle stroke={2} className={iconClasses} aria-label={labelText} />,
    info: <IconInfoCircle stroke={2} className={iconClasses} aria-label={labelText} />,
    error: <IconAlertCircle stroke={2} className={iconClasses} aria-label={labelText} />,
  };
  const icon = iconMap[severity];

  const alertClasses = clsx(
    style.alert,
    style[`alert--${variant}`],
    style[`alert--${severity}`],
    className,
  );

  return (
    <div className={alertClasses} role='alert'>
      <div className={style.icon}>{icon}</div>
      <div className={style.alert__content}>{children}</div>
    </div>
  );
};

export { AlertTitle } from './AlertTitle';
