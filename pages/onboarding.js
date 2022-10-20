import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import RadioButton from '../components/RadioButton';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../services/authService';
import { USER_ROLES } from '../constants';

export default function Onboarding() {
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();
  const user = isAuthenticated();
  const { walletAddress, role } = user;
  const { farmer, distributor } = USER_ROLES;

  useEffect(() => {
    if (!walletAddress) router.push('/');
    if (role === farmer) router.push('/farmer/register');
    if (role === distributor) router.push('/distributor/register');
  }, [distributor, farmer, role, router, walletAddress]);

  const handleFarmerChange = () => setUserRole(farmer);
  const handleDistributorChange = () => setUserRole(distributor);

  const handleSubmit = (event) => {
    event.preventDefault();

    user.role = userRole;

    // TODO: Remove localStorage and set User.role in the database
    localStorage.setItem('user', JSON.stringify(user));

    if (user.role === farmer) {
      router.push('/farmer/register');
    } else if (user.role === distributor) {
      router.push('/distributor/register');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col max-w-5xl px-2 mx-auto space-y-4">
        <div className="flex flex-col my-6 space-y-3 p-8">
          <div className="mx-auto max-w-xl">
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              Welcome to Plyant! Who are you?
            </h1>
            <form className="md:mt-6">
              <div className="my-6 flex">
                <div className="ml-2">
                  <RadioButton
                    name="onboarding"
                    id="farmer"
                    label="I am a Farmer"
                    value={userRole === 'farmer'}
                    onChange={handleFarmerChange}
                  />
                  <RadioButton
                    name="onboarding"
                    id="distributor"
                    label="I am a Distributor"
                    value={userRole === 'distributor'}
                    onChange={handleDistributorChange}
                  />
                </div>
              </div>
              <button
                className="rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow w-full inline-block"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
