import React from 'react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SprintBoard from '../../components/UI/SprintBoard';
import SprintMetrics from '../../components/UI/SprintMetrics';

const SprintIndex = ({ auth, sprint, tasks, burndownData, velocityData }) => {
  const handleTaskMove = () => {
    // TODO: Implement task status update logic
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Sprint Management" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Sprint Actions */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Sprint Management
            </h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Start New Sprint
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Sprint Planning
              </button>
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

export default SprintIndex;
