import Link from 'next/link';
import { NavGroup } from '@payloadcms/ui/elements/NavGroup';

export const Analytics = () => {
  return (
    <NavGroup label='Analytics'>
      <Link href='/admin/analytics/cloudflare' className='nav__link'>
        Cloudflare
      </Link>
    </NavGroup>
  );
};
