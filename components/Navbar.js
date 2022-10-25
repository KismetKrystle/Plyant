import Image from 'next/image';
import Link from 'next/link';
import ConnectWallet from './Buttons/ConnectWallet';
import { useEffect, useState } from 'react';
import { USER_ROLES } from '../constants';
import { isAuthenticated } from '../services/authService';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { farmer } = USER_ROLES;

  useEffect(() => {
    const user = isAuthenticated();
    setUser(user);
  }, []);

  return (
    <header>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-green-600" href="/">
              <a>
                <Image
                  src="/assets/logo.svg"
                  alt="Herb"
                  width="80%"
                  height="80%"
                />
              </a>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav
              className="hidden md:block"
              aria-labelledby="header-navigation"
            >
              <ul className="flex items-center gap-6 text-sm text-gray-600">
                <li>
                  <Link href="/">Home</Link>
                </li>
                {user?.role === farmer && (
                  <>
                    <li>
                      <Link href="/farmer/register/farm">Register Farm</Link>
                    </li>
                    {user?.farms && (
                      <li>
                        <Link href="/farmer/register/crops">Log Crops</Link>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <ConnectWallet />
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
