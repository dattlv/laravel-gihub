<?php

namespace Database\Seeders;

use App\Models\ProjectCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default categories
        $defaultCategories = [
            [
                'name' => 'Development',
                'color' => '#4CAF50',
                'description' => 'Software development projects',
            ],
            [
                'name' => 'Design',
                'color' => '#2196F3',
                'description' => 'UI/UX and graphic design projects',
            ],
            [
                'name' => 'Marketing',
                'color' => '#FFC107',
                'description' => 'Marketing and promotional projects',
            ],
            [
                'name' => 'Research',
                'color' => '#9C27B0',
                'description' => 'Research and analysis projects',
            ],
        ];

        foreach ($defaultCategories as $category) {
            ProjectCategory::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'color' => $category['color'],
                'description' => $category['description'],
            ]);
        }

        // Create additional random categories for testing
        ProjectCategory::factory()->count(5)->create();
    }
}
