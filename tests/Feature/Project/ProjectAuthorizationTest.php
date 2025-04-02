<?php

namespace Tests\Feature\Project;

use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    private User $owner;
    private User $admin;
    private User $member;
    private User $nonMember;
    private Project $project;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test users with different roles
        $this->owner = User::factory()->create();
        $this->admin = User::factory()->create();
        $this->member = User::factory()->create();
        $this->nonMember = User::factory()->create();

        // Create a test project
        $this->project = Project::factory()->create([
            'owner_id' => $this->owner->id
        ]);

        // Add members with different roles
        $this->project->members()->attach([
            $this->admin->id => ['role' => 'admin'],
            $this->member->id => ['role' => 'member']
        ]);
    }

    /** @test */
    public function owner_can_perform_all_actions()
    {
        $this->actingAs($this->owner);

        // View project
        $response = $this->getJson("/api/v1/projects/{$this->project->id}");
        $response->assertOk();

        // Update project
        $response = $this->putJson("/api/v1/projects/{$this->project->id}", [
            'name' => 'Updated Name'
        ]);
        $response->assertOk();

        // Manage members
        $response = $this->postJson("/api/v1/projects/{$this->project->id}/members", [
            'user_id' => User::factory()->create()->id,
            'role' => 'member'
        ]);
        $response->assertCreated();

        // Delete project should be last
        $response = $this->deleteJson("/api/v1/projects/{$this->project->id}");
        $response->assertNoContent();
    }

    /** @test */
    public function admin_can_manage_project_but_cannot_delete()
    {
        $this->actingAs($this->admin);

        // View project
        $response = $this->getJson("/api/v1/projects/{$this->project->id}");
        $response->assertOk();

        // Update project
        $response = $this->putJson("/api/v1/projects/{$this->project->id}", [
            'name' => 'Updated Name'
        ]);
        $response->assertOk();

        // Cannot delete project
        $response = $this->deleteJson("/api/v1/projects/{$this->project->id}");
        $response->assertForbidden();

        // Can manage members
        $response = $this->postJson("/api/v1/projects/{$this->project->id}/members", [
            'user_id' => User::factory()->create()->id,
            'role' => 'member'
        ]);

        $response->assertCreated();
    }

    /** @test */
    public function member_can_view_but_cannot_modify_project()
    {
        $this->actingAs($this->member);

        // Can view project
        $response = $this->getJson("/api/v1/projects/{$this->project->id}");
        $response->assertOk();

        // Cannot update project
        $response = $this->putJson("/api/v1/projects/{$this->project->id}", [
            'name' => 'Updated Name'
        ]);
        $response->assertForbidden();

        // Cannot delete project
        $response = $this->deleteJson("/api/v1/projects/{$this->project->id}");
        $response->assertForbidden();

        // Cannot manage members
        $response = $this->postJson("/api/v1/projects/{$this->project->id}/members", [
            'user_id' => User::factory()->create()->id,
            'role' => 'member'
        ]);
        $response->assertForbidden();
    }

    /** @test */
    public function non_member_cannot_access_project()
    {
        $this->actingAs($this->nonMember);

        // Cannot view project
        $response = $this->getJson("/api/v1/projects/{$this->project->id}");
        $response->assertForbidden();

        // Cannot update project
        $response = $this->putJson("/api/v1/projects/{$this->project->id}", [
            'name' => 'Updated Name'
        ]);
        $response->assertForbidden();

        // Cannot delete project
        $response = $this->deleteJson("/api/v1/projects/{$this->project->id}");
        $response->assertForbidden();

        // Cannot manage members
        $response = $this->postJson("/api/v1/projects/{$this->project->id}/members", [
            'user_id' => User::factory()->create()->id,
            'role' => 'member'
        ]);
        $response->assertForbidden();
    }

    /** @test */
    public function admin_cannot_modify_owner_role()
    {
        $this->actingAs($this->admin);

        $response = $this->putJson("/api/v1/projects/{$this->project->id}/members/{$this->owner->id}", [
            'role' => 'member'
        ]);

        $response->assertForbidden();
    }

    /** @test */
    public function member_cannot_modify_roles()
    {
        $this->actingAs($this->member);

        $response = $this->putJson("/api/v1/projects/{$this->project->id}/members/{$this->admin->id}", [
            'role' => 'member'
        ]);

        $response->assertForbidden();
    }

    /** @test */
    public function owner_can_transfer_ownership()
    {
        $this->actingAs($this->owner);
        $newOwner = User::factory()->create();

        $response = $this->postJson("/api/v1/projects/{$this->project->id}/transfer-ownership", [
            'user_id' => $newOwner->id
        ]);

        $response->assertOk();
        $this->assertEquals($newOwner->id, $this->project->fresh()->owner_id);
    }
}
