import Hero from '../components/Hero';
import Layout from '../components/Layout';
import { isAuthenticated } from '../services/authService';
import { useRouter } from 'next/router';
import { USER_ROLES } from '../constants';
import { useEffect } from 'react';
const { farmer, distributor } = USER_ROLES;

export default function Home() {
  const router = useRouter();
  const user = isAuthenticated();
  const { role, walletAddress } = user;

  useEffect(() => {
    if (role === farmer) router.replace('/farmer');
    if (role === distributor) router.replace('/distributor');
    if (walletAddress && !role) router.replace('/onboarding');
  }, [role, router, walletAddress]);

  return (
    <Layout>
      <Hero />
    </Layout>
  );
}
