import { getUserSignedIn } from '@/lib/utilities/getUserSignedIn';

const Dashboard = async () => {
  const user = await getUserSignedIn();

  return (
    <div className='dashboard-group'>
      <ul className='dashboard__welcome'>
        <li>
          <h1>Hi {user?.knownAs}! Welcome to the dashboard.</h1>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
