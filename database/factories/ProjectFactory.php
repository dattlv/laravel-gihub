<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);
        $startDate = $this->faker->dateTimeBetween('-1 month', '+1 month');

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph(),
            'category_id' => ProjectCategory::factory(),
            'owner_id' => User::factory(),
            'start_date' => $startDate,
            'end_date' => $this->faker->dateTimeBetween($startDate, '+6 months'),
            'status' => $this->faker->randomElement(['planning', 'active', 'on_hold', 'completed', 'cancelled']),
            'visibility' => $this->faker->randomElement(['public', 'private', 'team']),
            'settings' => [
                'notifications_enabled' => $this->faker->boolean(),
                'theme' => $this->faker->randomElement(['light', 'dark']),
                'tags' => $this->faker->words(3),
            ],
        ];
    }

    /**
     * Indicate that the project is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the project is public.
     */
    public function public(): static
    {
        return $this->state(fn (array $attributes) => [
            'visibility' => 'public',
        ]);
    }
}
