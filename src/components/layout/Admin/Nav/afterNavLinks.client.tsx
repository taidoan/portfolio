'use client';

import { NavPreferences } from 'payload';
import { NavGroup } from '@payloadcms/ui';
import { NavLinkWithIcon } from './navLink';

type Props = {
  navPreferences: NavPreferences | null;
};

export const AfterNavLinksClient = ({ navPreferences }: Props) => {
  return (
    <NavGroup label='Metrics' isOpen={navPreferences?.groups?.Metrics?.open ?? false}>
      <NavLinkWithIcon href='/admin/metrics/cloudflare' label='Cloudflare' className='nav__link' />
    </NavGroup>
  );
};
