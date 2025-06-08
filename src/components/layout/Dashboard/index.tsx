import { getUserSignedIn } from '@/lib/utilities/getUserSignedIn';
import { getMaintenanceStatus } from '@/lib/utilities/getMaintenanceStatus';

import Link from 'next/link';
import clsx from 'clsx';

const Dashboard = async () => {
  const user = await getUserSignedIn();
  const maintenance = await getMaintenanceStatus();
  console.log(maintenance);
  return (
    <div className='dashboard-group'>
      <ul className='dashboard__welcome'>
        <li>
          <h1>Hi {user?.knownAs}! Welcome to the dashboard.</h1>
        </li>
        <li>
          <div className='card'>
            <div className='dashboard__welcome-item'>
              <span className='dashboard__custom-label'>Site Link: </span>
              <Link href='/' target='_blank'>
                Visit the website
              </Link>
            </div>
            <div className='dashboard__welcome-item'>
              {' '}
              <span className='dashboard__custom-label'>Site Status: </span>
              <span
                className={clsx(
                  'dashboard-status',
                  maintenance?.maintenanceMode === true && 'dashboard-status--maintenance',
                )}
              >
                {maintenance?.maintenanceMode === true ? 'Under Maintenance' : 'Online'}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
