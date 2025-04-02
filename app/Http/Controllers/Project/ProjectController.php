<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Services\Project\ProjectService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    protected ProjectService $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    /**
     * Display a listing of projects.
     */
    public function index(Request $request): Response
    {
        // Get projects with pagination and optional filters
        $projects = $this->projectService->getProjects(
            $request->get('status'),
            $request->get('visibility'),
            $request->get('category_id'),
            $request->get('search'),
            $request->get('per_page', 10)
        );

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => $request->all(['status', 'visibility', 'category_id', 'search']),
        ]);
    }

    /**
     * Display the specified project.
     */
    public function show(Project $project): Response
    {
        // Load necessary relationships
        $project->load(['category', 'members.user', 'owner']);

        return Inertia::render('Projects/Show', [
            'project' => $project
        ]);
    }

    /**
     * Store a newly created project.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = $this->projectService->createProject(
            $request->validated(),
            auth()->id()
        );

        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project
        ], 201);
    }

    /**
     * Update the specified project.
     */
    public function update(UpdateProjectRequest $request, Project $project): JsonResponse
    {
        $project = $this->projectService->updateProject(
            $project->id,
            $request->validated()
        );

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project
        ]);
    }

    /**
     * Remove the specified project.
     */
    public function destroy(Project $project): JsonResponse
    {
        $this->projectService->deleteProject($project->id);

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }

    /**
     * Archive the specified project.
     */
    public function archive(Project $project): JsonResponse
    {
        $project = $this->projectService->archiveProject($project->id);

        return response()->json([
            'message' => 'Project archived successfully',
            'project' => $project
        ]);
    }

    /**
     * Restore the specified project from archive.
     */
    public function restore(Project $project): JsonResponse
    {
        $project = $this->projectService->restoreProject($project->id);

        return response()->json([
            'message' => 'Project restored successfully',
            'project' => $project
        ]);
    }
}
