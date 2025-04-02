<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\ProjectCategory;
use App\Services\Project\ProjectCategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectCategoryController extends Controller
{
    protected ProjectCategoryService $categoryService;

    public function __construct(ProjectCategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of project categories.
     */
    public function index(): Response
    {
        $categories = $this->categoryService->getCategoriesWithProjectCount();

        return Inertia::render('Projects/Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Display the specified category.
     */
    public function show(ProjectCategory $category): Response
    {
        return Inertia::render('Projects/Categories/Show', [
            'category' => $category,
            'projects' => $category->projects()->paginate(10)
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:project_categories,name',
            'description' => 'nullable|string|max:1000',
            'color' => 'nullable|string|max:7|regex:/^#[a-fA-F0-9]{6}$/'
        ]);

        $category = $this->categoryService->createCategory($validated);

        return response()->json([
            'message' => 'Category created successfully',
            'category' => $category
        ], 201);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, ProjectCategory $category): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:project_categories,name,' . $category->id,
            'description' => 'nullable|string|max:1000',
            'color' => 'nullable|string|max:7|regex:/^#[a-fA-F0-9]{6}$/'
        ]);

        $category = $this->categoryService->updateCategory($category->id, $validated);

        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $category
        ]);
    }

    /**
     * Remove the specified category.
     */
    public function destroy(ProjectCategory $category): JsonResponse
    {
        $this->categoryService->deleteCategory($category->id);

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }

    /**
     * Get active categories (with projects).
     */
    public function active(): JsonResponse
    {
        $categories = $this->categoryService->getActiveCategories();

        return response()->json([
            'categories' => $categories
        ]);
    }
}
