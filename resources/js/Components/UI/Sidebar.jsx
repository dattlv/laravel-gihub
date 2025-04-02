import React from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const navigation = [
    {
      name: 'Dashboard',
      href: route('dashboard'),
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      current: route().current('dashboard'),
    },
    {
      name: 'Sprint Management',
      href: route('sprints.index'),
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      current: route().current('sprints.index'),
    },
    {
      name: 'My Tasks',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Projects',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Calendar',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Team',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      current: false,
    },
    {
      name: 'Reports',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      current: false,
    },
  ];

  const projects = [
    { id: 1, name: 'Website Redesign', color: 'bg-pink-600' },
    { id: 2, name: 'Mobile App', color: 'bg-purple-600' },
    { id: 3, name: 'Database Migration', color: 'bg-yellow-500' },
  ];

  return (
    <div
      className={`${isCollapsed ? 'md:w-16' : 'md:w-64'} hidden transition-all duration-300 ease-in-out md:fixed md:inset-y-0 md:flex md:flex-col`}
    >
      <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
        {/* Logo Section */}
        <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
          <Link href="/" className="flex items-center">
            {!isCollapsed && (
              <>
                <ApplicationLogo className="h-8 w-auto text-white" />
                <span className="ml-2 text-xl font-semibold text-white">
                  NOTORIA
                </span>
              </>
            )}
            {isCollapsed && <ApplicationLogo className="h-8 w-8 text-white" />}
          </Link>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 rounded-full border border-gray-700 bg-gray-800 p-1 hover:bg-gray-700 focus:outline-none"
        >
          <svg
            className={`h-4 w-4 transform text-white transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Search Section - Only show when expanded */}
        {!isCollapsed && (
          <div className="mt-5 px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full rounded-md bg-gray-700 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
          <nav className="flex-1 space-y-1 px-2">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                title={isCollapsed ? item.name : ''}
              >
                <div
                  className={`${
                    item.current
                      ? 'text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-300'
                  } ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`}
                >
                  {item.icon}
                </div>
                {!isCollapsed && item.name}
              </Link>
            ))}
          </nav>

          {/* Recent Projects Section - Only show when expanded */}
          {!isCollapsed && (
            <div className="mt-8 px-2">
              <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Recent Projects
              </h3>
              <div className="mt-2 space-y-1">
                {projects.map(project => (
                  <a
                    key={project.id}
                    href="#"
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <span
                      className={`mr-3 h-2.5 w-2.5 rounded-full ${project.color}`}
                      aria-hidden="true"
                    />
                    {project.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions - Only show when expanded */}
        {!isCollapsed && (
          <div className="flex flex-shrink-0 flex-col gap-2 border-t border-gray-700 p-4">
            <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Task
            </button>
            <button className="flex w-full items-center justify-center rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
