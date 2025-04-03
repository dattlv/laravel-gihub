import React from 'react';
import { format } from 'date-fns';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  on_hold: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  planning: 'bg-purple-100 text-purple-800',
};

export default function ProjectCard({ project, onDelete, onEdit }) {
  return (
    <div className="relative flex h-[280px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header with Status */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {project.name}
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusColors[project.status] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="line-clamp-4 text-sm text-gray-600">{project.description}</p>

      {/* Dates */}
      <div className="mt-4 space-y-1">
        <p className="flex items-center text-sm text-gray-500">
          <span className="font-medium">Start Date:</span>
          <span className="ml-2">
            {format(new Date(project.start_date), 'MM/dd/yyyy')}
          </span>
        </p>
        {project.end_date && (
          <p className="flex items-center text-sm text-gray-500">
            <span className="font-medium">End Date:</span>
            <span className="ml-2">
              {format(new Date(project.end_date), 'MM/dd/yyyy')}
            </span>
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="absolute bottom-4 right-4 flex space-x-3">
        <button
          onClick={() => onEdit(project)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
