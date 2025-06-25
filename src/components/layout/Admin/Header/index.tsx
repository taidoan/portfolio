import { getUserSignedIn } from '@/lib/utilities/getUserSignedIn';
import { getMaintenanceStatus } from '@/lib/utilities/getMaintenanceStatus';

import style from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { IconLogout, IconUser } from '@tabler/icons-react';

export const AdminHeader = async () => {
  const user = await getUserSignedIn();
  const maintenance = await getMaintenanceStatus();

  return (
    <div className={clsx(style['admin-header'])}>
      <div className={style['admin-header__user']}>
        <IconUser className={clsx(style['admin-header__icon'])} />
        <Link href={`/admin/account`} className={clsx(style['admin-header__link'])}>
          {user?.name}
        </Link>
      </div>
      <ul className={clsx(style['admin-header__items'])}>
        <li>
          <span className='dashboard__custom-label'>Site Link: </span>
          <Link href='/' target='_blank'>
            Visit the website
          </Link>
        </li>
        <li>
          <span className='dashboard__custom-label'>Site Status: </span>
          <span
            className={clsx(
              'dashboard-status',
              maintenance?.maintenanceMode === true && 'dashboard-status--maintenance',
            )}
          >
            {maintenance?.maintenanceMode === true ? 'Under Maintenance' : 'Online'}
          </span>
        </li>
        <li>
          <Link
            href='/admin/logout'
            className={clsx(style['admin-header__link'], style['admin-header__link--sm'])}
          >
            Logout
          </Link>
          <IconLogout className={clsx(style['admin-header__icon'])} />
        </li>
      </ul>
    </div>
  );
};
