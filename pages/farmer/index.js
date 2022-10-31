import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/authService';
import { USER_ROLES } from '../../constants';
import Farms from '../../components/Farms';
import Crops from '../../components/Crops';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { distributor } = USER_ROLES;

  useEffect(() => {
    const user = isAuthenticated();
    const { walletAddress, role, farms } = user;
    setUser(user);

    if (!walletAddress) router.push('/');
    if (role === distributor) router.push('/distributor');
    if (!farms) router.push('/farmer/register/farm');
  }, [distributor, router]);

  return (
    <Layout>
      <div className="p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-semibold text-xl text-gray-600">
            Farmer Dashboard
          </h2>
          <p className="text-gray-500 mb-6">Welcome to your dashboard.</p>
          {user?.farms && <Farms farms={user.farms} />}
          {user?.crops && <Crops headerText="Crops" crops={user.crops} />}
        </div>
      </div>
    </Layout>
  );
}
