<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create a test user
        $testUser = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
            ]
        );

        // Create some active projects
        Project::factory()
            ->count(5)
            ->active()
            ->create([
                'owner_id' => $testUser->id,
            ]);

        // Create some public projects
        Project::factory()
            ->count(3)
            ->public()
            ->create([
                'owner_id' => $testUser->id,
            ]);

        // Create projects with different statuses
        $statuses = ['planning', 'on_hold', 'completed', 'cancelled'];
        foreach ($statuses as $status) {
            Project::factory()
                ->count(2)
                ->create([
                    'owner_id' => $testUser->id,
                    'status' => $status,
                ]);
        }

        // Create some random projects
        Project::factory()
            ->count(5)
            ->create();
    }
}
