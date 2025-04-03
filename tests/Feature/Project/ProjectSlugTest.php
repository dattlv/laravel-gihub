<?php

namespace Tests\Feature\Project;

use App\Models\User;
use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class ProjectSlugTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private array $projectData;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $category = ProjectCategory::factory()->create();

        $this->projectData = [
            'name' => 'Test Project',
            'description' => 'This is a test project',
            'category_id' => $category->id,
            'start_date' => now()->format('Y-m-d'),
            'end_date' => now()->addMonths(3)->format('Y-m-d'),
            'status' => 'active',
            'visibility' => 'private',
            'priority' => 'medium',
        ];
    }

    #[Test]
    public function project_slug_is_automatically_generated_from_name()
    {
        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $this->projectData);

        $response->assertCreated();
        $this->assertDatabaseHas('projects', [
            'name' => 'Test Project',
            'slug' => 'test-project'
        ]);
    }

    #[Test]
    public function project_slug_must_be_unique()
    {
        // Create first project
        $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $this->projectData);

        // Try to create second project with same name
        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $this->projectData);

        $response->assertCreated();

        // Second project should have a different slug
        $this->assertDatabaseHas('projects', [
            'name' => 'Test Project',
            'slug' => 'test-project-2'
        ]);
    }

    #[Test]
    public function project_slug_remains_unchanged_when_updating_other_fields()
    {
        // Create project
        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $this->projectData);

        $project = Project::find($response->json('data.id'));

        // Update project without changing name
        $updateResponse = $this->actingAs($this->user)
            ->putJson(route('api.v1.projects.update', $project), [
                'description' => 'Updated description',
                'status' => 'completed'
            ]);

        $updateResponse->assertOk();
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'slug' => 'test-project',
            'description' => 'Updated description',
            'status' => 'completed'
        ]);
    }

    #[Test]
    public function project_slug_is_updated_when_name_changes()
    {
        // Create project
        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $this->projectData);

        $project = Project::find($response->json('data.id'));

        // Update project name
        $updateResponse = $this->actingAs($this->user)
            ->putJson(route('api.v1.projects.update', $project), [
                'name' => 'New Project Name'
            ]);

        $updateResponse->assertOk();
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'name' => 'New Project Name',
            'slug' => 'new-project-name'
        ]);
    }

    #[Test]
    public function project_slug_remains_unique_after_name_update()
    {
        // Create first project
        $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), [
                ...$this->projectData,
                'name' => 'Project One'
            ]);

        // Create second project
        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), [
                ...$this->projectData,
                'name' => 'Project Two'
            ]);

        $projectTwo = Project::find($response->json('data.id'));

        // Try to update second project's name to match first project
        $updateResponse = $this->actingAs($this->user)
            ->putJson(route('api.v1.projects.update', $projectTwo), [
                'name' => 'Project One'
            ]);

        $updateResponse->assertOk();
        $this->assertDatabaseHas('projects', [
            'id' => $projectTwo->id,
            'name' => 'Project One',
            'slug' => 'project-one-2'
        ]);
    }
}
