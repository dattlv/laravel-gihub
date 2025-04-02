<?php

namespace App\Repositories\Eloquent;

use App\Models\ProjectMember;
use App\Repositories\Contracts\ProjectMemberRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectMemberRepositoryEloquent extends BaseRepositoryEloquent implements ProjectMemberRepository
{
    /**
     * ProjectMemberRepositoryEloquent constructor.
     *
     * @param ProjectMember $model
     */
    public function __construct(ProjectMember $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritDoc
     */
    public function getByProjectId(int $projectId): Collection
    {
        return $this->model->where('project_id', $projectId)->get();
    }

    /**
     * @inheritDoc
     */
    public function findByProjectAndUser(int $projectId, int $userId): ?ProjectMember
    {
        return $this->model
            ->where('project_id', $projectId)
            ->where('user_id', $userId)
            ->first();
    }

    /**
     * @inheritDoc
     */
    public function getByRole(int $projectId, string $role): Collection
    {
        return $this->model
            ->where('project_id', $projectId)
            ->where('role', $role)
            ->get();
    }

    /**
     * @inheritDoc
     */
    public function updateMemberRole(int $projectId, int $userId, string $role, array $permissions = []): ProjectMember
    {
        $member = $this->findByProjectAndUser($projectId, $userId);

        if (!$member) {
            throw new \RuntimeException('Member not found');
        }

        $member->update([
            'role' => $role,
            'permissions' => $permissions ?: $member->permissions,
        ]);

        return $member;
    }

    /**
     * @inheritDoc
     */
    public function isMember(int $projectId, int $userId): bool
    {
        return $this->model
            ->where('project_id', $projectId)
            ->where('user_id', $userId)
            ->exists();
    }

    /**
     * @inheritDoc
     */
    public function deleteById(int $id): bool
    {
        $member = $this->model->find($id);

        if ($member) {
            return $member->forceDelete();
        }

        return false;
    }
}
