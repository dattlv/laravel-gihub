import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({ auth }) {
  const teamMembers = [
    { name: 'John Doe', role: 'Frontend Developer', avatar: 'JD' },
    { name: 'Jane Smith', role: 'UI Designer', avatar: 'JS' },
    { name: 'Mike Johnson', role: 'Backend Developer', avatar: 'MJ' },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="w-full">
          {/* Welcome Message */}
          <div className="mb-6 overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome back, {auth.user.name}!
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                View All Projects
              </button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Tasks */}
            <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
              <div className="text-sm font-medium text-gray-500">
                Total Tasks
              </div>
              <div className="mt-2 flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">24</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <svg
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Increased by</span>
                  12%
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
              <div className="text-sm font-medium text-gray-500">
                Completed Tasks
              </div>
              <div className="mt-2 flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">18</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <svg
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Increased by</span>
                  8%
                </div>
              </div>
            </div>

            {/* Ongoing Projects */}
            <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
              <div className="text-sm font-medium text-gray-500">
                Ongoing Projects
              </div>
              <div className="mt-2 flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">4</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600">
                  <svg
                    className="h-5 w-5 flex-shrink-0 self-center text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">No change</span>
                  Same
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
              <div className="text-sm font-medium text-gray-500">
                Team Members
              </div>
              <div className="mt-2 flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">8</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <svg
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Increased by</span>2
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
            {/* Tasks and Calendar Section - 4 columns */}
            <div className="space-y-8 lg:col-span-4">
              {/* Recent Tasks */}
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Recent Tasks
                    </h3>
                    <div className="flex items-center space-x-3">
                      <select className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                        <option>All Tasks</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      <li className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                              <span className="text-sm font-medium leading-none text-green-600">
                                UI
                              </span>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              Design New Dashboard Layout
                            </p>
                            <p className="text-sm text-gray-500">
                              Due in 2 days
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              In Progress
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                              <span className="text-sm font-medium leading-none text-blue-600">
                                API
                              </span>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              Implement Authentication API
                            </p>
                            <p className="text-sm text-gray-500">
                              Due tomorrow
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Pending Review
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      View All Tasks
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Overview */}
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Upcoming Deadlines
                    </h3>
                    <button className="text-sm text-blue-600 hover:text-blue-500">
                      View Calendar
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      <li className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <time className="inline-flex h-8 w-8 items-center justify-center rounded bg-red-100 text-red-600">
                              15
                            </time>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              Project Milestone Review
                            </p>
                            <p className="text-sm text-gray-500">
                              10:00 AM - 11:30 AM
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              High Priority
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <time className="inline-flex h-8 w-8 items-center justify-center rounded bg-blue-100 text-blue-600">
                              16
                            </time>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              Team Weekly Sync
                            </p>
                            <p className="text-sm text-gray-500">
                              2:00 PM - 3:00 PM
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              Regular
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - 2 columns */}
            <div className="space-y-8 lg:col-span-2">
              {/* Team Members */}
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h3 className="mb-6 text-lg font-medium text-gray-900">
                    Team Members
                  </h3>
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                      {teamMembers.map(member => (
                        <li key={member.name} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                                <span className="text-sm font-medium leading-none text-white">
                                  {member.avatar}
                                </span>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {member.name}
                              </p>
                              <p className="truncate text-sm text-gray-500">
                                {member.role}
                              </p>
                            </div>
                            <div>
                              <button className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50">
                                View
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      View All Members
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6">
                  <h3 className="mb-6 text-lg font-medium text-gray-900">
                    Recent Activity
                  </h3>
                  <div className="flow-root">
                    <ul className="-mb-8">
                      <li>
                        <div className="relative pb-8">
                          <span
                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          ></span>
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-white">
                                <svg
                                  className="h-5 w-5 text-white"
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
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm text-gray-500">
                                  New task{' '}
                                  <span className="font-medium text-gray-900">
                                    Website Redesign
                                  </span>{' '}
                                  created
                                </p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                <time dateTime="2024-03-15">1h ago</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      {/* Add more activity items as needed */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
