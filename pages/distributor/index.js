import Layout from '../../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/authService';
import { USER_ROLES, CROPS_FOR_SALE, CROPS_BOUGHT } from '../../constants';
import Crops from '../../components/Crops';

export default function Dashboard() {
  const router = useRouter();
  const user = isAuthenticated();
  const { walletAddress, role, company } = user;
  const { farmer, distributor } = USER_ROLES;

  useEffect(() => {
    if (!walletAddress) router.push('/');
    if (role === farmer) router.push('/farmer');
    if (!company) router.push('/distributor/register');
  }, [distributor, farmer, company, role, router, walletAddress]);

  return (
    <Layout>
      <div className="p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Distributor Dashboard
            </h2>
            <p className="text-gray-500 mb-6">Welcome to your dashboard.</p>
            <Crops
              headerText="Crops for Sale"
              // TODO: Switch hardcoded code out with Crop NFTs
              crops={CROPS_FOR_SALE}
              buttonText="Buy"
              specialTreatments
              buyButton
            />
            <Crops
              headerText="History"
              // TODO: Switch hardcoded code out with Crop NFTs
              crops={CROPS_BOUGHT}
              buttonText="Purchase Again"
              buyButton
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
