<?php

namespace Tests\Feature\Project;

use App\Models\User;
use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private array $projectData;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a test user
        $this->user = User::factory()->create();

        // Create a test category
        $category = \App\Models\ProjectCategory::factory()->create();

        // Sample project data
        $this->projectData = [
            'name' => 'Test Project',
            'description' => 'This is a test project',
            'category_id' => $category->id,
            'start_date' => now()->format('Y-m-d'),
            'end_date' => now()->addMonths(3)->format('Y-m-d'),
            'status' => 'active',
            'visibility' => 'private',
            'priority' => 'medium',
            'settings' => [
                'notifications' => true,
                'task_tracking' => true
            ]
        ];
    }

    /** @test */
    public function user_can_create_a_project()
    {
        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $this->projectData);

        $response->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'description',
                    'start_date',
                    'end_date',
                    'status',
                    'created_at',
                    'updated_at'
                ]
            ]);

        $this->assertDatabaseHas('projects', [
            'name' => $this->projectData['name'],
            'description' => $this->projectData['description'],
            'owner_id' => $this->user->id
        ]);
    }

    /** @test */
    public function user_can_view_project_list()
    {
        // Create some test projects
        Project::factory()->count(3)->create(['owner_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson(route('api.v1.projects.index'));

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'slug',
                        'description',
                        'category_id',
                        'owner_id',
                        'start_date',
                        'end_date',
                        'status',
                        'visibility',
                        'priority',
                        'settings',
                        'created_at',
                        'updated_at'
                    ]
                ],
                'meta' => [
                    'current_page',
                    'last_page',
                    'per_page',
                    'total'
                ]
            ]);
    }

    /** @test */
    public function user_can_view_project_details()
    {
        $project = Project::factory()->create(['owner_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->getJson(route('api.v1.projects.show', $project));

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'slug',
                    'description',
                    'category_id',
                    'owner_id',
                    'start_date',
                    'end_date',
                    'status',
                    'visibility',
                    'priority',
                    'settings',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    /** @test */
    public function user_can_update_project()
    {
        $project = Project::factory()->create(['owner_id' => $this->user->id]);

        $updatedData = [
            'name' => 'Updated Project Name',
            'description' => 'Updated project description',
            'status' => 'completed',
            'visibility' => 'public',
            'priority' => 'high',
            'settings' => [
                'notifications' => false,
                'task_tracking' => true
            ]
        ];

        $response = $this->actingAs($this->user)
            ->putJson(route('api.v1.projects.update', $project), $updatedData);

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'description',
                    'status',
                    'visibility',
                    'priority',
                    'settings'
                ]
            ])
            ->assertJsonPath('data.name', $updatedData['name'])
            ->assertJsonPath('data.description', $updatedData['description'])
            ->assertJsonPath('data.status', $updatedData['status'])
            ->assertJsonPath('data.visibility', $updatedData['visibility'])
            ->assertJsonPath('data.priority', $updatedData['priority'])
            ->assertJsonPath('data.settings', $updatedData['settings']);

        $this->assertDatabaseHas('projects', array_merge(
            ['id' => $project->id],
            collect($updatedData)->except('settings')->toArray()
        ));
    }

    /** @test */
    public function user_can_delete_project()
    {
        $project = Project::factory()->create(['owner_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->deleteJson(route('api.v1.projects.destroy', $project));

        $response->assertNoContent();
        $this->assertSoftDeleted('projects', ['id' => $project->id]);
    }

    /** @test */
    public function user_cannot_create_project_with_invalid_data()
    {
        $invalidData = [
            'name' => '', // required
            'description' => str_repeat('a', 1001), // max:1000
            'category_id' => 999, // exists:project_categories,id
            'start_date' => 'invalid-date', // date format
            'end_date' => now()->subDay()->format('Y-m-d'), // after:start_date
            'status' => 'invalid-status', // in:planning,active,on_hold,completed,cancelled
            'visibility' => 'invalid-visibility', // in:public,private,team
            'priority' => 'invalid-priority' // in:low,medium,high,urgent
        ];

        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $invalidData);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors([
                'name',
                'description',
                'category_id',
                'start_date',
                'status',
                'visibility',
                'priority'
            ]);

        // Test specific validation messages
        $responseData = $response->json();
        $this->assertEquals('A project name is required', $responseData['errors']['name'][0]);
        $this->assertEquals('The description field must not be greater than 1000 characters.', $responseData['errors']['description'][0]);
        $this->assertEquals('The selected category does not exist', $responseData['errors']['category_id'][0]);
        $this->assertEquals('The start date field must be a valid date.', $responseData['errors']['start_date'][0]);
        $this->assertEquals('Invalid project status selected', $responseData['errors']['status'][0]);
        $this->assertEquals('Invalid visibility option selected', $responseData['errors']['visibility'][0]);
        $this->assertEquals('Invalid priority level selected', $responseData['errors']['priority'][0]);
    }

    /** @test */
    public function user_cannot_create_project_with_end_date_before_start_date()
    {
        $invalidData = array_merge($this->projectData, [
            'start_date' => now()->format('Y-m-d'),
            'end_date' => now()->subDay()->format('Y-m-d')
        ]);

        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $invalidData);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['end_date'])
            ->assertJson([
                'errors' => [
                    'end_date' => ['The end date must be after the start date']
                ]
            ]);
    }

    /** @test */
    public function user_cannot_create_project_with_invalid_status_and_visibility()
    {
        $invalidData = array_merge($this->projectData, [
            'status' => 'invalid-status',
            'visibility' => 'invalid-visibility',
            'priority' => 'invalid-priority'
        ]);

        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $invalidData);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['status', 'visibility', 'priority'])
            ->assertJson([
                'errors' => [
                    'status' => ['Invalid project status selected'],
                    'visibility' => ['Invalid visibility option selected'],
                    'priority' => ['Invalid priority level selected']
                ]
            ]);
    }

    /** @test */
    public function user_cannot_create_project_with_invalid_settings()
    {
        $invalidData = array_merge($this->projectData, [
            'settings' => [
                'notifications' => 'not-boolean',
                'task_tracking' => 'not-boolean'
            ]
        ]);

        $response = $this->actingAs($this->user)
            ->postJson(route('api.v1.projects.store'), $invalidData);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors([
                'settings.notifications',
                'settings.task_tracking'
            ]);
    }

    /** @test */
    public function unauthorized_user_cannot_access_projects()
    {
        $project = Project::factory()->create(['owner_id' => $this->user->id]);

        $response = $this->getJson(route('api.v1.projects.show', $project));
        $response->assertUnauthorized();
    }
}
