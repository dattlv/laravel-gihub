<?php

namespace App\Repositories\Contracts;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

interface ProjectRepository extends BaseRepository
{
    /**
     * Get projects by owner id
     *
     * @param int $ownerId
     * @return Collection
     */
    public function getByOwnerId(int $ownerId): Collection;

    /**
     * Get projects by category id
     *
     * @param int $categoryId
     * @return Collection
     */
    public function getByCategoryId(int $categoryId): Collection;

    /**
     * Get projects by status
     *
     * @param string $status
     * @return Collection
     */
    public function getByStatus(string $status): Collection;

    /**
     * Get projects by visibility
     *
     * @param string $visibility
     * @return Collection
     */
    public function getByVisibility(string $visibility): Collection;

    /**
     * Archive a project
     *
     * @param int $id
     * @return Project
     */
    public function archive(int $id): Project;

    /**
     * Restore an archived project
     *
     * @param int $id
     * @return Project
     */
    public function restore(int $id): Project;

    /**
     * Get projects where user is a member
     *
     * @param int $userId
     * @return Collection
     */
    public function getProjectsForMember(int $userId): Collection;
}
