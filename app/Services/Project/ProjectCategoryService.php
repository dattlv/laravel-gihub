<?php

namespace App\Services\Project;

use App\Models\ProjectCategory;
use App\Repositories\Contracts\ProjectCategoryRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class ProjectCategoryService
{
    protected ProjectCategoryRepository $categoryRepository;

    public function __construct(ProjectCategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Create a new category
     *
     * @param array $data
     * @return ProjectCategory
     */
    public function createCategory(array $data): ProjectCategory
    {
        // Generate slug if not provided
        if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        return $this->categoryRepository->create($data);
    }

    /**
     * Update a category
     *
     * @param int $categoryId
     * @param array $data
     * @return ProjectCategory
     */
    public function updateCategory(int $categoryId, array $data): ProjectCategory
    {
        // Generate slug if name is updated
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        return $this->categoryRepository->update($categoryId, $data);
    }

    /**
     * Delete a category
     *
     * @param int $categoryId
     * @return bool
     */
    public function deleteCategory(int $categoryId): bool
    {
        return $this->categoryRepository->deleteById($categoryId);
    }

    /**
     * Get category by slug
     *
     * @param string $slug
     * @return ProjectCategory|null
     */
    public function getCategoryBySlug(string $slug): ?ProjectCategory
    {
        return $this->categoryRepository->findBySlug($slug);
    }

    /**
     * Get all categories with project count
     *
     * @return Collection
     */
    public function getCategoriesWithProjectCount(): Collection
    {
        return $this->categoryRepository->getWithProjectCount();
    }

    /**
     * Get active categories
     *
     * @return Collection
     */
    public function getActiveCategories(): Collection
    {
        return $this->categoryRepository->getActiveCategories();
    }

    /**
     * Get all categories
     *
     * @return Collection
     */
    public function getAllCategories(): Collection
    {
        return $this->categoryRepository->all();
    }
}
