import { getUserSignedIn } from '@/lib/utilities/getUserSignedIn';
import { getMaintenanceStatus } from '@/lib/utilities/getMaintenanceStatus';
import { AdminHeaderClient } from './index.client';

export const AdminHeader = async () => {
  const user = await getUserSignedIn();
  const maintenance = await getMaintenanceStatus();

  return <AdminHeaderClient user={user} maintenance={maintenance} />;
};
