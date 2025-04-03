<?php

namespace Tests\Feature\Project;

use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class ProjectMemberTest extends TestCase
{
    use RefreshDatabase;

    private User $owner;
    private User $member;
    private Project $project;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test users
        $this->owner = User::factory()->create();
        $this->member = User::factory()->create();

        // Create a test project
        $this->project = Project::factory()->create([
            'owner_id' => $this->owner->id
        ]);
    }

    #[Test]
    public function project_owner_can_add_member()
    {
        $memberData = [
            'user_id' => $this->member->id,
            'role' => 'member'
        ];

        $response = $this->actingAs($this->owner)
            ->postJson(route('api.v1.projects.members.store', $this->project), $memberData);

        $response->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'user' => [
                        'id',
                        'name',
                        'email'
                    ],
                    'role',
                    'joined_at'
                ]
            ]);

        $this->assertDatabaseHas('project_members', [
            'project_id' => $this->project->id,
            'user_id' => $this->member->id,
            'role' => 'member'
        ]);
    }

    #[Test]
    public function project_owner_can_view_member_list()
    {
        // Add some members to the project
        $members = User::factory()->count(3)->create();
        foreach ($members as $member) {
            $this->project->members()->attach($member->id, ['role' => 'member']);
        }

        $response = $this->actingAs($this->owner)
            ->getJson(route('api.v1.projects.members.index', $this->project));

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'user' => [
                            'id',
                            'name',
                            'email'
                        ],
                        'role',
                        'joined_at'
                    ]
                ]
            ]);
    }

    #[Test]
    public function project_owner_can_update_member_role()
    {
        // Add member to project
        $this->project->members()->attach($this->member->id, ['role' => 'member']);

        $updateData = [
            'role' => 'admin'
        ];

        $response = $this->actingAs($this->owner)
            ->putJson(route('api.v1.projects.members.update', [
                'project' => $this->project,
                'userId' => $this->member->id
            ]), $updateData);

        $response->assertOk()
            ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('project_members', [
            'project_id' => $this->project->id,
            'user_id' => $this->member->id,
            'role' => 'admin'
        ]);
    }

    #[Test]
    public function project_owner_can_remove_member()
    {
        // Add member to project
        $this->project->members()->attach($this->member->id, ['role' => 'member']);

        $response = $this->actingAs($this->owner)
            ->deleteJson(route('api.v1.projects.members.destroy', [
                'project' => $this->project,
                'userId' => $this->member->id
            ]));

        $response->assertNoContent();

        $this->assertDatabaseMissing('project_members', [
            'project_id' => $this->project->id,
            'user_id' => $this->member->id
        ]);
    }

    #[Test]
    public function non_owner_cannot_manage_project_members()
    {
        $randomUser = User::factory()->create();
        $memberData = [
            'user_id' => $this->member->id,
            'role' => 'member'
        ];

        $response = $this->actingAs($randomUser)
            ->postJson(route('api.v1.projects.members.store', $this->project), $memberData);

        $response->assertForbidden();
    }

    #[Test]
    public function cannot_add_same_member_twice()
    {
        // Add member first time
        $this->project->members()->attach($this->member->id, ['role' => 'member']);

        $memberData = [
            'user_id' => $this->member->id,
            'role' => 'member'
        ];

        $response = $this->actingAs($this->owner)
            ->postJson(route('api.v1.projects.members.store', $this->project), $memberData);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['user_id']);
    }

    #[Test]
    public function cannot_add_member_with_invalid_role()
    {
        $memberData = [
            'user_id' => $this->member->id,
            'role' => 'invalid_role'
        ];

        $response = $this->actingAs($this->owner)
            ->postJson(route('api.v1.projects.members.store', $this->project), $memberData);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['role']);
    }
}
