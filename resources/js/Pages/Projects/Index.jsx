import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { projectApiSlice } from '@/features/projects/projectApiSlice';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import ProjectCard from '@/Components/Projects/ProjectCard';

export default function Index({ auth }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    start_date: '',
    end_date: '',
    status: 'active',
    visibility: 'private',
    priority: 'medium',
  });
  const [errors, setErrors] = useState({});

  const { data: projects, isLoading } = projectApiSlice.useGetProjectsQuery();
  const { data: categories } = projectApiSlice.useGetCategoriesQuery();
  const [createProject] = projectApiSlice.useCreateProjectMutation();
  const [updateProject] = projectApiSlice.useUpdateProjectMutation();
  const [deleteProject] = projectApiSlice.useDeleteProjectMutation();

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
      category_id: project.category_id,
      start_date: project.start_date,
      end_date: project.end_date || '',
      status: project.status,
      visibility: project.visibility,
      priority: project.priority,
    });
    setShowUpdateModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProject({
        id: selectedProject.id,
        ...formData,
      }).unwrap();
      setShowUpdateModal(false);
      setSelectedProject(null);
      setFormData({
        name: '',
        description: '',
        category_id: '',
        start_date: '',
        end_date: '',
        status: 'active',
        visibility: 'private',
        priority: 'medium',
      });
    } catch (error) {
      setErrors(error.data?.errors || {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData).unwrap();
      setShowCreateModal(false);
      setFormData({
        name: '',
        description: '',
        category_id: '',
        start_date: '',
        end_date: '',
        status: 'active',
        visibility: 'private',
        priority: 'medium',
      });
    } catch (error) {
      setErrors(error.data?.errors || {});
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Projects
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Project
          </button>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects?.data?.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDelete}
                  onEdit={() => handleEdit(project)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Create Project</h2>

          <div className="mt-6">
            <InputLabel htmlFor="name" value="Project Name" />
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <InputError message={errors.name?.[0]} className="mt-2" />
          </div>

          <div className="mt-6">
            <InputLabel htmlFor="category_id" value="Category" />
            <select
              id="category_id"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <InputError message={errors.category_id?.[0]} className="mt-2" />
          </div>

          <div className="mt-6">
            <InputLabel htmlFor="description" value="Description" />
            <textarea
              id="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <InputError message={errors.description?.[0]} className="mt-2" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="start_date" value="Start Date" />
              <TextInput
                id="start_date"
                type="date"
                className="mt-1 block w-full"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
              <InputError message={errors.start_date?.[0]} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="end_date" value="End Date" />
              <TextInput
                id="end_date"
                type="date"
                className="mt-1 block w-full"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
              />
              <InputError message={errors.end_date?.[0]} className="mt-2" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="status" value="Status" />
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <InputError message={errors.status?.[0]} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="priority" value="Priority" />
              <select
                id="priority"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <InputError message={errors.priority?.[0]} className="mt-2" />
            </div>
          </div>

          <div className="mt-6">
            <InputLabel htmlFor="visibility" value="Visibility" />
            <select
              id="visibility"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.visibility}
              onChange={(e) =>
                setFormData({ ...formData, visibility: e.target.value })
              }
            >
              <option value="private">Private</option>
              <option value="team">Team</option>
              <option value="public">Public</option>
            </select>
            <InputError message={errors.visibility?.[0]} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="mr-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </button>
            <PrimaryButton>Create Project</PrimaryButton>
          </div>
        </form>
      </Modal>

      {/* Update Project Modal */}
      <Modal show={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <form onSubmit={handleUpdate} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Update Project</h2>

          <div className="mt-6">
            <InputLabel htmlFor="name" value="Project Name" />
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <InputError message={errors.name?.[0]} className="mt-2" />
          </div>

          <div className="mt-6">
            <InputLabel htmlFor="category_id" value="Category" />
            <select
              id="category_id"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <InputError message={errors.category_id?.[0]} className="mt-2" />
          </div>

          <div className="mt-6">
            <InputLabel htmlFor="description" value="Description" />
            <textarea
              id="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <InputError message={errors.description?.[0]} className="mt-2" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="start_date" value="Start Date" />
              <TextInput
                id="start_date"
                type="date"
                className="mt-1 block w-full"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
              <InputError message={errors.start_date?.[0]} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="end_date" value="End Date" />
              <TextInput
                id="end_date"
                type="date"
                className="mt-1 block w-full"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
              />
              <InputError message={errors.end_date?.[0]} className="mt-2" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="status" value="Status" />
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <InputError message={errors.status?.[0]} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="priority" value="Priority" />
              <select
                id="priority"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <InputError message={errors.priority?.[0]} className="mt-2" />
            </div>
          </div>

          <div className="mt-6">
            <InputLabel htmlFor="visibility" value="Visibility" />
            <select
              id="visibility"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.visibility}
              onChange={(e) =>
                setFormData({ ...formData, visibility: e.target.value })
              }
            >
              <option value="private">Private</option>
              <option value="team">Team</option>
              <option value="public">Public</option>
            </select>
            <InputError message={errors.visibility?.[0]} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="mr-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              onClick={() => setShowUpdateModal(false)}
            >
              Cancel
            </button>
            <PrimaryButton>Update Project</PrimaryButton>
          </div>
        </form>
      </Modal>
    </AuthenticatedLayout>
  );
}
