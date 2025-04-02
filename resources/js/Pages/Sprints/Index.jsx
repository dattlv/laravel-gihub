import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const SprintIndex = ({ auth, sprints }) => {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Sprint Management" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Sprints</h1>
            <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Create New Sprint
            </button>
          </div>

          {/* Sprint List */}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              {/* Sprint Filter */}
              <div className="mb-6 flex gap-4">
                <button className="rounded bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200">
                  Active Sprints
                </button>
                <button className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Completed
                </button>
                <button className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100">
                  All Sprints
                </button>
              </div>

              {/* Sprint Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sprints.map(sprint => (
                  <Link
                    key={sprint.id}
                    href={route('sprints.show', sprint.id)}
                    className="block rounded-lg border bg-white p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {sprint.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(sprint.start_date).toLocaleDateString()} -{' '}
                          {new Date(sprint.end_date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`rounded px-2 py-1 text-sm ${
                          sprint.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : sprint.status === 'completed'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {sprint.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          {Math.round(
                            (sprint.completed_points / sprint.total_points) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{
                            width: `${(sprint.completed_points / sprint.total_points) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>
                          {sprint.completed_points} / {sprint.total_points}{' '}
                          points
                        </span>
                        <span>{sprint.days_remaining} days left</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{' '}
                      <span className="font-medium">10</span> of{' '}
                      <span className="font-medium">20</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SprintIndex;
