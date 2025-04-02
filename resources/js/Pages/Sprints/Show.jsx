import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SprintBoard from '@/components/UI/SprintBoard';
import SprintMetrics from '@/components/UI/SprintMetrics';

const SprintShow = ({ auth, sprint, tasks, burndownData, velocityData }) => {
  const handleTaskMove = () => {
    // TODO: Implement task status update logic
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`Sprint: ${sprint.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Header with Navigation */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  {sprint.name}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {new Date(sprint.start_date).toLocaleDateString()} -{' '}
                  {new Date(sprint.end_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                  Edit Sprint
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add Task
                </button>
              </div>
            </div>

            {/* Sprint Navigation */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <a
                  href="#"
                  className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Board
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Analytics
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Planning
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Retrospective
                </a>
              </nav>
            </div>
          </div>

          {/* Sprint Metrics */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
            <SprintMetrics
              sprint={sprint}
              burndownData={burndownData}
              velocityData={velocityData}
            />
          </div>

          {/* Sprint Board */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <SprintBoard
              sprint={sprint}
              tasks={tasks}
              onTaskMove={handleTaskMove}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SprintShow;
