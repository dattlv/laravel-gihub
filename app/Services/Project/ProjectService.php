<?php

namespace App\Services\Project;

use App\Models\Project;
use App\Repositories\Contracts\ProjectRepository;
use App\Repositories\Contracts\ProjectMemberRepository;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use App\Events\Project\ProjectCreated;
use App\Events\Project\ProjectDeleted;
use App\Events\Project\ProjectUpdated;

class ProjectService
{
    protected ProjectRepository $projectRepository;
    protected ProjectMemberRepository $memberRepository;

    public function __construct(
        ProjectRepository $projectRepository,
        ProjectMemberRepository $memberRepository
    ) {
        $this->projectRepository = $projectRepository;
        $this->memberRepository = $memberRepository;
    }

    /**
     * Create a new project
     *
     * @param array $data Project data
     * @param int $ownerId Owner user ID
     * @return Project
     */
    public function createProject(array $data, int $ownerId): Project
    {
        return DB::transaction(function () use ($data, $ownerId) {
            // Generate slug if not provided
            $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
            $data['owner_id'] = $ownerId;

            // Create project
            $project = $this->projectRepository->create($data);

            // Add owner as project member with owner role
            $this->memberRepository->create([
                'project_id' => $project->id,
                'user_id' => $ownerId,
                'role' => 'owner',
                'permissions' => [
                    'view' => true,
                    'create' => true,
                    'update' => true,
                    'delete' => true,
                ],
            ]);

            event(new ProjectCreated($project));

            return $project;
        });
    }

    /**
     * Update a project
     *
     * @param int $projectId
     * @param array $data
     * @return Project
     */
    public function updateProject(int $projectId, array $data): Project
    {
        // Generate slug if name is updated
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $project = $this->projectRepository->update($projectId, $data);
        event(new ProjectUpdated($project, $data));
        return $project;
    }

    /**
     * Delete a project
     *
     * @param int $projectId
     * @return bool
     */
    public function deleteProject(int $projectId): bool
    {
        return DB::transaction(function () use ($projectId) {
            $project = $this->projectRepository->findById($projectId);

            // Delete all project members first
            $members = $this->memberRepository->getByProjectId($projectId);
            foreach ($members as $member) {
                if ($member && $member->id) {
                    $this->memberRepository->deleteById($member->id);
                }
            }

            // Delete the project
            $result = $this->projectRepository->deleteById($projectId);

            if ($result) {
                event(new ProjectDeleted($project));
            }

            return $result;
        });
    }

    /**
     * Archive a project
     *
     * @param int $projectId
     * @return Project
     */
    public function archiveProject(int $projectId): Project
    {
        $project = $this->projectRepository->archive($projectId);
        event(new ProjectUpdated($project, ['status' => 'cancelled']));
        return $project;
    }

    /**
     * Restore an archived project
     *
     * @param int $projectId
     * @return Project
     */
    public function restoreProject(int $projectId): Project
    {
        $project = $this->projectRepository->restore($projectId);
        event(new ProjectUpdated($project, ['status' => 'active']));
        return $project;
    }

    /**
     * Get projects by owner
     *
     * @param int $ownerId
     * @return Collection
     */
    public function getProjectsByOwner(int $ownerId): Collection
    {
        return $this->projectRepository->getByOwnerId($ownerId);
    }

    /**
     * Get projects by status
     *
     * @param string $status
     * @return Collection
     */
    public function getProjectsByStatus(string $status): Collection
    {
        return $this->projectRepository->getByStatus($status);
    }

    /**
     * Get projects by visibility
     *
     * @param string $visibility
     * @return Collection
     */
    public function getProjectsByVisibility(string $visibility): Collection
    {
        return $this->projectRepository->getByVisibility($visibility);
    }

    /**
     * Get projects where user is a member
     *
     * @param int $userId
     * @return Collection
     */
    public function getProjectsForMember(int $userId): Collection
    {
        return $this->projectRepository->getProjectsForMember($userId);
    }

    /**
     * Get projects with filters and pagination
     *
     * @param string|null $status
     * @param string|null $visibility
     * @param int|null $categoryId
     * @param string|null $search
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getProjects(
        ?string $status = null,
        ?string $visibility = null,
        ?int $categoryId = null,
        ?string $search = null,
        int $perPage = 10
    ) {
        $query = Project::query();

        if ($status) {
            $query->where('status', $status);
        }

        if ($visibility) {
            $query->where('visibility', $visibility);
        }

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return $query->with(['category', 'owner'])
                    ->orderBy('created_at', 'desc')
                    ->paginate($perPage);
    }

    /**
     * Transfer project ownership to another user
     *
     * @param int $projectId
     * @param int $newOwnerId
     * @return Project
     */
    public function transferOwnership(int $projectId, int $newOwnerId): Project
    {
        return DB::transaction(function () use ($projectId, $newOwnerId) {
            // Update project owner
            $project = $this->projectRepository->update($projectId, [
                'owner_id' => $newOwnerId
            ]);

            // Update member roles
            $oldOwnerMember = $this->memberRepository->findByProjectAndUser($projectId, $project->owner_id);
            if ($oldOwnerMember) {
                $this->memberRepository->update($oldOwnerMember->id, ['role' => 'admin']);
            }

            // Add new owner as member if not already
            $newOwnerMember = $this->memberRepository->findByProjectAndUser($projectId, $newOwnerId);
            if (!$newOwnerMember) {
                $this->memberRepository->create([
                    'project_id' => $projectId,
                    'user_id' => $newOwnerId,
                    'role' => 'owner'
                ]);
            } else {
                $this->memberRepository->update($newOwnerMember->id, ['role' => 'owner']);
            }

            event(new ProjectUpdated($project, ['owner_id' => $newOwnerId]));

            return $project;
        });
    }
}
