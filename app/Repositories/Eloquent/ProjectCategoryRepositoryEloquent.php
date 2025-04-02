<?php

namespace App\Repositories\Eloquent;

use App\Models\ProjectCategory;
use App\Repositories\Contracts\ProjectCategoryRepository;
use Illuminate\Database\Eloquent\Collection;

class ProjectCategoryRepositoryEloquent extends BaseRepositoryEloquent implements ProjectCategoryRepository
{
    /**
     * ProjectCategoryRepositoryEloquent constructor.
     *
     * @param ProjectCategory $model
     */
    public function __construct(ProjectCategory $model)
    {
        parent::__construct($model);
    }

    /**
     * @inheritDoc
     */
    public function findBySlug(string $slug): ?ProjectCategory
    {
        return $this->model->where('slug', $slug)->first();
    }

    /**
     * @inheritDoc
     */
    public function getWithProjectCount(): Collection
    {
        return $this->model->withCount('projects')->get();
    }

    /**
     * @inheritDoc
     */
    public function getActiveCategories(): Collection
    {
        return $this->model->whereHas('projects', function ($query) {
            $query->where('status', 'active');
        })->get();
    }
}
