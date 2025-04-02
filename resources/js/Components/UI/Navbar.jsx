import React from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/components/UI/ApplicationLogo';

export default function Navbar({
  user,
  showingNavigationDropdown,
  setShowingNavigationDropdown,
  isSidebarCollapsed,
}) {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div
        className={`${isSidebarCollapsed ? 'md:pl-16' : 'md:pl-64'} transition-all duration-300`}
      >
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href={route('dashboard')}>
                  <ApplicationLogo className="block w-20 fill-current text-gray-800" />
                </Link>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <div className="flex items-center gap-4">
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowingNavigationDropdown(
                          previousState => !previousState,
                        )
                      }
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      {user.name}

                      <svg
                        className="ms-2 -me-0.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div
                      className={`${
                        showingNavigationDropdown ? 'block' : 'hidden'
                      } absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    >
                      <Link
                        href={route('profile.edit')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log Out
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
