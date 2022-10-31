import { PeraWalletConnect } from '@perawallet/connect';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/authService';

const peraWallet = new PeraWalletConnect();

export default function ConnectWallet() {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;
  const router = useRouter();
  const user = isAuthenticated();

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
        // TODO: Set User.walletAddress in database
        user.walletAddress = newAccounts[0];
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/onboarding');
      })
      .catch((error) => {
        if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();

    setAccountAddress(null);
    // TODO: Remove localStorage
    localStorage.clear();
    router.push('/');
  }

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick);

        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <button
      className="rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow"
      onClick={
        isConnectedToPeraWallet
          ? handleDisconnectWalletClick
          : handleConnectWalletClick
      }
    >
      {isConnectedToPeraWallet ? 'Disconnect' : 'Connect to Wallet'}
    </button>
  );
}
