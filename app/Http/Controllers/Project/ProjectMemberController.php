<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\AddMemberRequest;
use App\Http\Requests\Project\UpdateMemberRequest;
use App\Models\Project;
use App\Services\Project\ProjectMemberService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

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
    public function index(Project $project): Response
    {
        // Load members with their user information
        $members = $this->memberService->getProjectMembers($project->id);

        return Inertia::render('Projects/Members/Index', [
            'project' => $project,
            'members' => $members
        ]);
    }

    /**
     * Add a new member to the project.
     */
    public function store(AddMemberRequest $request, Project $project): JsonResponse
    {
        $member = $this->memberService->addMember(
            $project->id,
            $request->validated('user_id'),
            $request->validated('role'),
            $request->validated('permissions', [])
        );

        return response()->json([
            'message' => 'Member added successfully',
            'member' => $member
        ], 201);
    }

    /**
     * Update member's role and permissions.
     */
    public function update(UpdateMemberRequest $request, Project $project, int $userId): JsonResponse
    {
        $member = $this->memberService->updateMemberRole(
            $project->id,
            $userId,
            $request->validated('role'),
            $request->validated('permissions')
        );

        return response()->json([
            'message' => 'Member role updated successfully',
            'member' => $member
        ]);
    }

    /**
     * Remove a member from the project.
     */
    public function destroy(Project $project, int $userId): JsonResponse
    {
        $this->memberService->removeMember($project->id, $userId);

        return response()->json([
            'message' => 'Member removed successfully'
        ]);
    }
}
