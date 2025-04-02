<?php

namespace App\Repositories\Contracts;

use App\Models\ProjectMember;
use Illuminate\Database\Eloquent\Collection;

interface ProjectMemberRepository extends BaseRepository
{
    /**
     * Get members by project id
     *
     * @param int $projectId
     * @return Collection
     */
    public function getByProjectId(int $projectId): Collection;

    /**
     * Get member by project and user id
     *
     * @param int $projectId
     * @param int $userId
     * @return ProjectMember|null
     */
    public function findByProjectAndUser(int $projectId, int $userId): ?ProjectMember;

    /**
     * Get members by role
     *
     * @param int $projectId
     * @param string $role
     * @return Collection
     */
    public function getByRole(int $projectId, string $role): Collection;

    /**
     * Update member role
     *
     * @param int $projectId
     * @param int $userId
     * @param string $role
     * @param array $permissions
     * @return ProjectMember
     */
    public function updateMemberRole(int $projectId, int $userId, string $role, array $permissions = []): ProjectMember;

    /**
     * Check if user is member of project
     *
     * @param int $projectId
     * @param int $userId
     * @return bool
     */
    public function isMember(int $projectId, int $userId): bool;
}
