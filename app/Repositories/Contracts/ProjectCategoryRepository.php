<?php

namespace App\Repositories\Contracts;

use App\Models\ProjectCategory;
use Illuminate\Database\Eloquent\Collection;

interface ProjectCategoryRepository extends BaseRepository
{
    /**
     * Find category by slug
     *
     * @param string $slug
     * @return ProjectCategory|null
     */
    public function findBySlug(string $slug): ?ProjectCategory;

    /**
     * Get categories with project count
     *
     * @return Collection
     */
    public function getWithProjectCount(): Collection;

    /**
     * Get active categories (categories with active projects)
     *
     * @return Collection
     */
    public function getActiveCategories(): Collection;
}
