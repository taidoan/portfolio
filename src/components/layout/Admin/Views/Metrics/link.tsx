import Link from 'next/link';
import { NavPreferences } from 'payload';
import { NavGroup } from '@payloadcms/ui/elements/NavGroup';
import { getNavIcon } from '../../Nav/navIconMap';

export const Metrics = ({
  navPreferences,
  key,
}: {
  navPreferences: NavPreferences;
  key: string;
}) => {
  const Icon = getNavIcon('cloudflare');
  return (
    <NavGroup label='Metrics'>
      <Link href='/admin/metrics/cloudflare' className='nav__link'>
        {Icon && <Icon />}
        Cloudflare
      </Link>
    </NavGroup>
  );
};
