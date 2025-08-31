'use client';
import type { User } from '@/payload-types';
import type { SiteSetting } from '@/payload-types';

import style from './style.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { IconLogout, IconUser, IconMenu2 } from '@tabler/icons-react';

type Props = {
  user: User | null;
  maintenance: SiteSetting;
};

export const AdminHeaderClient = ({ user, maintenance }: Props) => {
  return (
    <div className={clsx(style['admin-header'])}>
      <div className={style['admin-header__user']}>
        <IconUser className={clsx(style['admin-header__icon'])} />
        <Link href={`/admin/account`} className={clsx(style['admin-header__link'])}>
          {user?.name}
        </Link>
      </div>
      <IconMenu2
        className={clsx(style['admin-header__menu-button'])}
        onClick={() => {
          const menu = document.querySelector(`.${style['admin-header__menu']}`);
          if (menu) {
            menu.setAttribute(
              'data-visible',
              menu.getAttribute('data-visible') === 'true' ? 'false' : 'true',
            );
          }
        }}
      />
      <ul className={clsx(style['admin-header__menu'])} data-visible='false'>
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
