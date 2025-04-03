<?php

namespace Tests\Feature\Project;

use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

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

    #[Test]
    public function owner_can_perform_all_actions()
    {
        $this->actingAs($this->owner);

        // View project
        $response = $this->getJson(route('api.v1.projects.show', $this->project));
        $response->assertOk();

        // Update project
        $response = $this->putJson(route('api.v1.projects.update', $this->project), [
            'name' => 'Updated Name'
        ]);
        $response->assertOk();

        // Manage members
        $response = $this->postJson(route('api.v1.projects.members.store', $this->project), [
            'user_id' => User::factory()->create()->id,
            'role' => 'member'
        ]);
        $response->assertCreated();

        // Delete project should be last
        $response = $this->deleteJson(route('api.v1.projects.destroy', $this->project));
        $response->assertNoContent();
    }

    #[Test]
    public function admin_can_manage_project_but_cannot_delete()
    {
        $this->actingAs($this->admin);

        // View project
        $response = $this->getJson(route('api.v1.projects.show', $this->project));
        $response->assertOk();

        // Update project
        $response = $this->putJson(route('api.v1.projects.update', $this->project), [
            'name' => 'Updated Name'
        ]);
        $response->assertOk();

        // Cannot delete project
        $response = $this->deleteJson(route('api.v1.projects.destroy', $this->project));
        $response->assertForbidden();

        // Can manage members
        $response = $this->postJson(route('api.v1.projects.members.store', $this->project), [
            'user_id' => User::factory()->create()->id,
            'role' => 'member'
        ]);

        $response->assertCreated();
    }

    #[Test]
    public function member_can_view_but_cannot_modify_project()
    {
        $this->actingAs($this->member);

        // Can view project
        $response = $this->getJson(route('api.v1.projects.show', $this->project));
        $response->assertOk();

        // Cannot update project
        $response = $this->putJson(route('api.v1.projects.update', $this->project), [
            'name' => 'Updated Name'
        ]);
        $response->assertForbidden();

        // Cannot delete project
        $response = $this->deleteJson(route('api.v1.projects.destroy', $this->project));
        $response->assertForbidden();

        // Cannot manage members
        $response = $this->postJson(route('api.v1.projects.members.store', $this->project), [
            'user_id' => User::factory()->create()->id,
            'role' => 'member'
        ]);
        $response->assertForbidden();
    }

    #[Test]
    public function non_member_cannot_access_project()
    {
        $this->actingAs($this->nonMember);

        // Cannot view project
        $response = $this->getJson(route('api.v1.projects.show', $this->project));
        $response->assertForbidden();

        // Cannot update project
        $response = $this->putJson(route('api.v1.projects.update', $this->project), [
            'name' => 'Updated Name'
        ]);
        $response->assertForbidden();

        // Cannot delete project
        $response = $this->deleteJson(route('api.v1.projects.destroy', $this->project));
        $response->assertForbidden();

        // Cannot manage members
        $response = $this->postJson(route('api.v1.projects.members.store', $this->project), [
            'user_id' => User::factory()->create()->id,
            'role' => 'member'
        ]);
        $response->assertForbidden();
    }

    #[Test]
    public function admin_cannot_modify_owner_role()
    {
        $this->actingAs($this->admin);

        $response = $this->putJson(route('api.v1.projects.members.update', [
            'project' => $this->project,
            'userId' => $this->owner->id
        ]), [
            'role' => 'member'
        ]);

        $response->assertForbidden();
    }

    #[Test]
    public function member_cannot_modify_roles()
    {
        $this->actingAs($this->member);

        $response = $this->putJson(route('api.v1.projects.members.update', [
            'project' => $this->project,
            'userId' => $this->admin->id
        ]), [
            'role' => 'member'
        ]);

        $response->assertForbidden();
    }

    #[Test]
    public function owner_can_transfer_ownership()
    {
        $this->actingAs($this->owner);
        $newOwner = User::factory()->create();

        $response = $this->postJson(route('api.v1.projects.transfer-ownership', $this->project), [
            'user_id' => $newOwner->id
        ]);

        $response->assertOk();
        $this->assertEquals($newOwner->id, $this->project->fresh()->owner_id);
    }

    #[Test]
    public function it_validates_project_update_data()
    {
        $this->actingAs($this->owner);

        $response = $this->putJson(route('api.v1.projects.update', $this->project), [
            'name' => '' // empty name should fail validation
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    #[Test]
    public function it_returns_404_for_non_existent_project()
    {
        $this->actingAs($this->owner);
        $nonExistentId = 99999;

        $response = $this->getJson(route('api.v1.projects.show', $nonExistentId));
        $response->assertNotFound();
    }

    #[Test]
    public function owner_cannot_transfer_ownership_to_non_existent_user()
    {
        $this->actingAs($this->owner);
        $nonExistentUserId = 99999;

        $response = $this->postJson(route('api.v1.projects.transfer-ownership', $this->project), [
            'user_id' => $nonExistentUserId
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['user_id']);
    }

    #[Test]
    public function it_validates_member_role_when_adding_member()
    {
        $this->actingAs($this->owner);
        $newUser = User::factory()->create();

        $response = $this->postJson(route('api.v1.projects.members.store', $this->project), [
            'user_id' => $newUser->id,
            'role' => 'invalid_role'
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['role']);
    }
}
