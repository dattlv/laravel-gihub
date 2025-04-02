<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\AddMemberRequest;
use App\Http\Requests\Project\UpdateMemberRequest;
use App\Http\Resources\Project\ProjectMemberResource;
use App\Models\Project;
use App\Services\Project\ProjectMemberService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class ProjectMemberController extends Controller
{
    protected ProjectMemberService $memberService;

    public function __construct(ProjectMemberService $memberService)
    {
        $this->memberService = $memberService;
    }

    /**
     * Display a listing of project members.
     */
    public function index(Project $project): JsonResponse
    {
        // Load members with their user information
        $members = $this->memberService->getProjectMembers($project->id);

        return response()->json([
            'data' => ProjectMemberResource::collection($members)
        ]);
    }

    /**
     * Add a new member to the project.
     */
    public function store(AddMemberRequest $request, Project $project): JsonResponse
    {
        if (!Gate::allows('manage-members', $project)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $member = $this->memberService->addMember(
            $project->id,
            $request->validated('user_id'),
            $request->validated('role'),
            $request->validated('permissions', [])
        );

        return response()->json([
            'data' => new ProjectMemberResource($member)
        ], 201);
    }

    /**
     * Update member's role and permissions.
     */
    public function update(UpdateMemberRequest $request, Project $project, int $userId): JsonResponse
    {
        if (!Gate::allows('manage-members', $project)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $member = $this->memberService->updateMemberRole(
            $project->id,
            $userId,
            $request->validated('role'),
            $request->validated('permissions')
        );

        return response()->json([
            'data' => new ProjectMemberResource($member)
        ]);
    }

    /**
     * Remove a member from the project.
     */
    public function destroy(Project $project, int $userId): JsonResponse
    {
        if (!Gate::allows('manage-members', $project)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $this->memberService->removeMember($project->id, $userId);

        return response()->json(null, 204);
    }
}
