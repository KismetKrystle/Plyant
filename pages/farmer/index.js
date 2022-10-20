import Layout from '../../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/authService';
import { USER_ROLES } from '../../constants';

export default function Dashboard() {
  const router = useRouter();
  const user = isAuthenticated();
  const { walletAddress, role, farms } = user;
  const { farmer, distributor } = USER_ROLES;

  useEffect(() => {
    if (!walletAddress) router.push('/');
    if (role === distributor) router.push('/distributor');
    if (!farms) router.push('/farmer/register');
  }, [distributor, farmer, role, farms, router, walletAddress]);

  return (
    <Layout>
      <div className="flex flex-col max-w-5xl px-2 mx-auto space-y-4">
        <div className="flex flex-col my-6 space-y-3 p-8">
          <div className="mx-auto max-w-xl">
            <h1 className="text-2xl font-extrabold sm:text-4xl text-center">
              Farmer Dashboard
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
