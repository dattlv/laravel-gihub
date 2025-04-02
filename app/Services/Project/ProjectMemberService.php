<?php

namespace App\Services\Project;

use App\Models\ProjectMember;
use App\Repositories\Contracts\ProjectMemberRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectMemberService
{
    protected ProjectMemberRepository $memberRepository;

    public function __construct(ProjectMemberRepository $memberRepository)
    {
        $this->memberRepository = $memberRepository;
    }

    /**
     * Add a member to project
     *
     * @param int $projectId
     * @param int $userId
     * @param string $role
     * @param array $permissions
     * @return ProjectMember
     */
    public function addMember(int $projectId, int $userId, string $role = 'member', array $permissions = []): ProjectMember
    {
        // Set default permissions if not provided
        if (empty($permissions)) {
            $permissions = $this->getDefaultPermissions($role);
        }

        return $this->memberRepository->create([
            'project_id' => $projectId,
            'user_id' => $userId,
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Remove a member from project
     *
     * @param int $projectId
     * @param int $userId
     * @return bool
     */
    public function removeMember(int $projectId, int $userId): bool
    {
        $member = $this->memberRepository->findByProjectAndUser($projectId, $userId);

        if ($member) {
            return $this->memberRepository->deleteById($member->id);
        }

        return false;
    }

    /**
     * Update member role and permissions
     *
     * @param int $projectId
     * @param int $userId
     * @param string $role
     * @param array|null $permissions
     * @return ProjectMember
     */
    public function updateMemberRole(int $projectId, int $userId, string $role, ?array $permissions = null): ProjectMember
    {
        // If permissions not provided, use default permissions for the role
        $permissions = $permissions ?? $this->getDefaultPermissions($role);

        return $this->memberRepository->updateMemberRole($projectId, $userId, $role, $permissions);
    }

    /**
     * Get project members
     *
     * @param int $projectId
     * @return Collection
     */
    public function getProjectMembers(int $projectId): Collection
    {
        return $this->memberRepository->getByProjectId($projectId);
    }

    /**
     * Get members by role
     *
     * @param int $projectId
     * @param string $role
     * @return Collection
     */
    public function getMembersByRole(int $projectId, string $role): Collection
    {
        return $this->memberRepository->getByRole($projectId, $role);
    }

    /**
     * Check if user is member of project
     *
     * @param int $projectId
     * @param int $userId
     * @return bool
     */
    public function isMember(int $projectId, int $userId): bool
    {
        return $this->memberRepository->isMember($projectId, $userId);
    }

    /**
     * Get default permissions for role
     *
     * @param string $role
     * @return array
     */
    protected function getDefaultPermissions(string $role): array
    {
        return match ($role) {
            'owner' => [
                'view' => true,
                'create' => true,
                'update' => true,
                'delete' => true,
            ],
            'admin' => [
                'view' => true,
                'create' => true,
                'update' => true,
                'delete' => false,
            ],
            'member' => [
                'view' => true,
                'create' => true,
                'update' => false,
                'delete' => false,
            ],
            'guest' => [
                'view' => true,
                'create' => false,
                'update' => false,
                'delete' => false,
            ],
            default => [
                'view' => true,
                'create' => false,
                'update' => false,
                'delete' => false,
            ],
        };
    }
}
