<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all projects
        $projects = Project::all();

        // Create some test users if they don't exist
        $users = collect();
        for ($i = 1; $i <= 10; $i++) {
            $users->push(User::firstOrCreate(
                ['email' => "user{$i}@example.com"],
                [
                    'name' => "Test User {$i}",
                    'password' => bcrypt('password'),
                ]
            ));
        }

        // For each project
        $projects->each(function ($project) use ($users) {
            // Keep track of assigned users for this project
            $assignedUsers = collect([$project->owner_id]);

            // Add owner as admin
            ProjectMember::factory()->create([
                'project_id' => $project->id,
                'user_id' => $project->owner_id,
                'role' => 'owner',
                'permissions' => [
                    'view' => true,
                    'create' => true,
                    'update' => true,
                    'delete' => true,
                ],
            ]);

            // Helper function to get unassigned users
            $getUnassignedUser = function () use ($users, $assignedUsers) {
                $availableUsers = $users->whereNotIn('id', $assignedUsers);
                if ($availableUsers->isEmpty()) {
                    return null;
                }
                $user = $availableUsers->random();
                $assignedUsers->push($user->id);
                return $user->id;
            };

            // Add 1-2 admins
            for ($i = 0; $i < rand(1, 2); $i++) {
                if ($userId = $getUnassignedUser()) {
                    ProjectMember::factory()
                        ->admin()
                        ->create([
                            'project_id' => $project->id,
                            'user_id' => $userId,
                        ]);
                }
            }

            // Add 2-4 regular members
            for ($i = 0; $i < rand(2, 4); $i++) {
                if ($userId = $getUnassignedUser()) {
                    ProjectMember::factory()
                        ->create([
                            'project_id' => $project->id,
                            'user_id' => $userId,
                        ]);
                }
            }

            // Add 1-2 guests
            for ($i = 0; $i < rand(1, 2); $i++) {
                if ($userId = $getUnassignedUser()) {
                    ProjectMember::factory()
                        ->guest()
                        ->create([
                            'project_id' => $project->id,
                            'user_id' => $userId,
                        ]);
                }
            }
        });
    }
}
