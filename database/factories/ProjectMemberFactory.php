<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectMember>
 */
class ProjectMemberFactory extends Factory
{
    protected $model = ProjectMember::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),
            'user_id' => User::factory(),
            'role' => $this->faker->randomElement(['admin', 'member', 'guest']),
            'permissions' => [
                'view' => true,
                'create' => $this->faker->boolean(70),
                'update' => $this->faker->boolean(50),
                'delete' => $this->faker->boolean(30),
            ],
        ];
    }

    /**
     * Indicate that the member is an admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
            'permissions' => [
                'view' => true,
                'create' => true,
                'update' => true,
                'delete' => true,
            ],
        ]);
    }

    /**
     * Indicate that the member is a guest.
     */
    public function guest(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'guest',
            'permissions' => [
                'view' => true,
                'create' => false,
                'update' => false,
                'delete' => false,
            ],
        ]);
    }
}
