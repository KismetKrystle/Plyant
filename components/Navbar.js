import Image from 'next/image';
import Link from 'next/link';
import ConnectWallet from './Buttons/ConnectWallet';
import { useEffect, useState } from 'react';
import { USER_ROLES } from '../constants';
import { isAuthenticated } from '../services/authService';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { farmer, distributor } = USER_ROLES;

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
                {user?.role === distributor && (
                  <li className="font-sans block lg:ml-6 align-middle text-gray-700">
                    <a
                      role="button"
                      className="relative flex mt-2 cursor-not-allowed"
                    >
                      <svg
                        className="flex-1 w-8 h-8 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                      </svg>
                    </a>
                  </li>
                )}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              {!navbarOpen && (
                <div className="sm:flex sm:gap-4">
                  <ConnectWallet />
                </div>
              )}

              <nav className={navbarOpen ? ' flex' : ' hidden'}>
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
                  {user?.role === distributor && (
                    <li className="font-sans block sm:w-50% lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-600">
                      <a
                        role="button"
                        className="relative flex mt-2 cursor-not-allowed"
                      >
                        <svg
                          className="flex-1 w-8 h-8 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                        </svg>
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
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
