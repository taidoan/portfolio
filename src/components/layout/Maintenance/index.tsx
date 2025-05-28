import clsx from 'clsx';
import style from './style.module.scss';

export const MaintenanceBlock = () => {
  return (
    <div className={clsx(style.maintenance, 'section')}>
      <h2 className={style['maintenance__title']}>Under Maintenance</h2>
      <p className={style['maintenance__message']}>
        We&apos;re performing some maintenance at the moment. We&apos;ll be back soon!
      </p>
    </div>
  );
};
