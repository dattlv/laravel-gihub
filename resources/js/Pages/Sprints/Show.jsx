import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SprintBoard from '@/Components/UI/SprintBoard';
import SprintMetrics from '@/Components/UI/SprintMetrics';

const SprintShow = ({ auth, sprint, tasks, burndownData, velocityData }) => {
  const handleTaskMove = (taskId, sourceStatus, destinationStatus) => {
    // TODO: Implement task status update logic
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`Sprint: ${sprint.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Header with Navigation */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
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
                <button className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
                  Edit Sprint
                </button>
                <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  Add Task
                </button>
              </div>
            </div>

            {/* Sprint Navigation */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <a
                  href="#"
                  className="whitespace-nowrap border-b-2 border-blue-500 px-1 py-4 text-sm font-medium text-blue-600"
                >
                  Board
                </a>
                <a
                  href="#"
                  className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Analytics
                </a>
                <a
                  href="#"
                  className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Planning
                </a>
                <a
                  href="#"
                  className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Retrospective
                </a>
              </nav>
            </div>
          </div>

          {/* Sprint Metrics */}
          <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <SprintMetrics
              sprint={sprint}
              burndownData={burndownData}
              velocityData={velocityData}
            />
          </div>

          {/* Sprint Board */}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
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
