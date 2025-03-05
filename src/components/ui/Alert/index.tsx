import style from './style.module.scss';
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertCircle,
} from '@tabler/icons-react';

export type AlertProps = {
  severity: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
};

export const Alert = ({ severity, children, icon, action }: AlertProps) => {
  return (
    <div className={`${style.alert} ${style[severity]}`} role='alert'>
      <div className={style.icon}>{icon}</div>
      <div className={style.content}>
        <div className={style.message}>
          <h4>{severity}</h4>
          <p>{children}</p>
        </div>
        {action && <div className={style.action}>{action}</div>}
      </div>
    </div>
  );
};
