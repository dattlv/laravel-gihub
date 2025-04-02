<?php

namespace App\Repositories\Eloquent;

use App\Models\Project;
use App\Repositories\Contracts\ProjectRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepositoryEloquent extends BaseRepositoryEloquent implements ProjectRepository
{
    /**
     * ProjectRepositoryEloquent constructor.
     *
     * @param Project $model
     */
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritDoc
     */
    public function getByOwnerId(int $ownerId): Collection
    {
        return $this->model->where('owner_id', $ownerId)->get();
    }

    /**
     * @inheritDoc
     */
    public function getByCategoryId(int $categoryId): Collection
    {
        return $this->model->where('category_id', $categoryId)->get();
    }

    /**
     * @inheritDoc
     */
    public function getByStatus(string $status): Collection
    {
        return $this->model->where('status', $status)->get();
    }

    /**
     * @inheritDoc
     */
    public function getByVisibility(string $visibility): Collection
    {
        return $this->model->where('visibility', $visibility)->get();
    }

    /**
     * @inheritDoc
     */
    public function archive(int $id): Project
    {
        $project = $this->findById($id);
        $project->update(['status' => 'cancelled']);
        return $project;
    }

    /**
     * @inheritDoc
     */
    public function restore(int $id): Project
    {
        $project = $this->findById($id);
        $project->update(['status' => 'active']);
        return $project;
    }

    /**
     * @inheritDoc
     */
    public function getProjectsForMember(int $userId): Collection
    {
        return $this->model->with('members')->whereHas('members', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();
    }
}
