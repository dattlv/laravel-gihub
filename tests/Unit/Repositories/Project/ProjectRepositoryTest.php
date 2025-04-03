<?php

namespace Tests\Unit\Repositories\Project;

use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\ProjectMember;
use App\Models\User;
use App\Repositories\Eloquent\ProjectRepositoryEloquent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class ProjectRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private ProjectRepositoryEloquent $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new ProjectRepositoryEloquent(new Project());
    }

    #[Test]
    public function it_can_get_projects_by_owner_id()
    {
        // Arrange
        $owner = User::factory()->create();
        $projects = Project::factory()->count(3)->create(['owner_id' => $owner->id]);
        Project::factory()->count(2)->create(); // Other projects

        // Act
        $result = $this->repository->getByOwnerId($owner->id);

        // Assert
        $this->assertCount(3, $result);
        $this->assertTrue($result->every(fn ($project) => $project->owner_id === $owner->id));
    }

    #[Test]
    public function it_can_get_projects_by_category_id()
    {
        // Arrange
        $category = ProjectCategory::factory()->create();
        $projects = Project::factory()->count(3)->create(['category_id' => $category->id]);
        Project::factory()->count(2)->create(); // Other projects

        // Act
        $result = $this->repository->getByCategoryId($category->id);

        // Assert
        $this->assertCount(3, $result);
        $this->assertTrue($result->every(fn ($project) => $project->category_id === $category->id));
    }

    #[Test]
    public function it_can_get_projects_by_status()
    {
        // Arrange
        $activeStatus = 'active';
        $projects = Project::factory()->count(3)->create(['status' => $activeStatus]);
        Project::factory()->count(2)->create(['status' => 'completed']); // Other projects

        // Act
        $result = $this->repository->getByStatus($activeStatus);

        // Assert
        $this->assertCount(3, $result);
        $this->assertTrue($result->every(fn ($project) => $project->status === $activeStatus));
    }

    #[Test]
    public function it_can_get_projects_by_visibility()
    {
        // Arrange
        $visibility = 'public';
        $projects = Project::factory()->count(3)->create(['visibility' => $visibility]);
        Project::factory()->count(2)->create(['visibility' => 'private']); // Other projects

        // Act
        $result = $this->repository->getByVisibility($visibility);

        // Assert
        $this->assertCount(3, $result);
        $this->assertTrue($result->every(fn ($project) => $project->visibility === $visibility));
    }

    #[Test]
    public function it_can_archive_a_project()
    {
        // Arrange
        $project = Project::factory()->create(['status' => 'active']);

        // Act
        $result = $this->repository->archive($project->id);

        // Assert
        $this->assertEquals('cancelled', $result->status);
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'status' => 'cancelled'
        ]);
    }

    #[Test]
    public function it_can_restore_a_project()
    {
        // Arrange
        $project = Project::factory()->create(['status' => 'cancelled']);

        // Act
        $result = $this->repository->restore($project->id);

        // Assert
        $this->assertEquals('active', $result->status);
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'status' => 'active'
        ]);
    }

    #[Test]
    public function it_can_get_projects_for_member()
    {
        // Arrange
        $user = User::factory()->create();
        $projects = Project::factory()
            ->count(3)
            ->create()
            ->each(function ($project) use ($user) {
                $project->members()->attach($user->id, [
                    'role' => 'member',
                    'permissions' => json_encode(['view' => true]),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            });

        // Act
        $result = $this->repository->getProjectsForMember($user->id);

        // Assert
        $this->assertCount(3, $result);

        foreach ($result as $project) {
            $this->assertNotNull($project->members);
            $this->assertTrue($project->members->contains(function ($member) use ($user) {
                return $member->pivot->user_id === $user->id;
            }));
        }
    }
}
