<?php

namespace Tests\Unit\Services\Project;

use App\Events\Project\ProjectCreated;
use App\Events\Project\ProjectDeleted;
use App\Events\Project\ProjectUpdated;
use App\Models\Project;
use App\Models\User;
use App\Repositories\Contracts\ProjectRepository;
use App\Repositories\Contracts\ProjectMemberRepository;
use App\Services\Project\ProjectService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;
use Mockery\MockInterface;
use Illuminate\Database\Eloquent\Collection;
use App\Models\ProjectMember;
use Mockery;

/**
 * @property-read ProjectService $projectService
 * @property-read \Mockery\MockInterface&\App\Repositories\Contracts\ProjectRepository $projectRepository
 * @property-read \Mockery\MockInterface&\App\Repositories\Contracts\ProjectMemberRepository $memberRepository
 */
class ProjectServiceTest extends TestCase
{
    use RefreshDatabase;

    private ProjectService $projectService;
    private $projectRepository;
    private $memberRepository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->projectRepository = $this->mock(ProjectRepository::class);
        $this->memberRepository = $this->mock(ProjectMemberRepository::class);

        $this->projectService = new ProjectService(
            $this->projectRepository,
            $this->memberRepository
        );

        // Fake events
        Event::fake([
            ProjectCreated::class,
            ProjectUpdated::class,
            ProjectDeleted::class
        ]);
    }

    /** @test */
    public function it_can_create_a_project()
    {
        // Arrange
        $owner = User::factory()->create();
        $projectData = [
            'name' => 'Test Project',
            'description' => 'Test Description',
            'category_id' => 1,
            'status' => 'active',
            'visibility' => 'private'
        ];

        $expectedProject = new Project($projectData);
        $expectedProject->id = 1;
        $expectedProject->owner_id = $owner->id;

        // Expect repository calls
        $this->projectRepository
            ->expects('create')
            ->withArgs(function ($data) use ($projectData, $owner) {
                return $data['name'] === $projectData['name'] &&
                       $data['slug'] === 'test-project' &&
                       $data['owner_id'] === $owner->id;
            })
            ->andReturn($expectedProject);

        $this->memberRepository
            ->expects('create')
            ->withArgs(function ($data) use ($expectedProject, $owner) {
                return $data['project_id'] === $expectedProject->id &&
                       $data['user_id'] === $owner->id &&
                       $data['role'] === 'owner';
            })
            ->andReturn(new ProjectMember());

        // Act
        $project = $this->projectService->createProject($projectData, $owner->id);

        // Assert
        $this->assertEquals($expectedProject, $project);
        Event::assertDispatched(ProjectCreated::class, function ($event) use ($expectedProject) {
            return $event->project->id === $expectedProject->id;
        });
    }

    /** @test */
    public function it_can_update_a_project()
    {
        // Arrange
        $project = new Project([
            'name' => 'Original Name',
            'description' => 'Original Description'
        ]);
        $project->id = 1;

        $updateData = [
            'name' => 'Updated Name',
            'description' => 'Updated Description'
        ];

        $updatedProject = new Project($updateData);
        $updatedProject->id = $project->id;

        // Expect repository call
        $this->projectRepository
            ->expects('update')
            ->withArgs(function ($id, $data) use ($project, $updateData) {
                return $id === $project->id &&
                       $data['name'] === $updateData['name'] &&
                       $data['slug'] === 'updated-name';
            })
            ->andReturn($updatedProject);

        // Act
        $result = $this->projectService->updateProject($project->id, $updateData);

        // Assert
        $this->assertEquals($updatedProject, $result);
        Event::assertDispatched(ProjectUpdated::class, function ($event) use ($updatedProject) {
            return $event->project->id === $updatedProject->id;
        });
    }

    /** @test */
    public function it_can_delete_a_project()
    {
        // Arrange
        $project = new Project(['name' => 'Project to Delete']);
        $project->id = 1;

        $member1 = new ProjectMember();
        $member1->id = 1;
        $member1->project_id = $project->id;
        $member1->user_id = 1;
        $member1->role = 'owner';

        $member2 = new ProjectMember();
        $member2->id = 2;
        $member2->project_id = $project->id;
        $member2->user_id = 2;
        $member2->role = 'member';

        $members = new Collection([$member1, $member2]);

        // Expect repository calls
        $this->projectRepository
            ->expects('findById')
            ->with($project->id)
            ->andReturn($project);

        $this->memberRepository
            ->expects('getByProjectId')
            ->with($project->id)
            ->andReturn($members);

        $this->memberRepository
            ->expects('deleteById')
            ->with(1)
            ->once()
            ->andReturn(true);

        $this->memberRepository
            ->expects('deleteById')
            ->with(2)
            ->once()
            ->andReturn(true);

        $this->projectRepository
            ->expects('deleteById')
            ->with($project->id)
            ->andReturn(true);

        // Act
        $result = $this->projectService->deleteProject($project->id);

        // Assert
        $this->assertTrue($result);
        Event::assertDispatched(ProjectDeleted::class, function ($event) use ($project) {
            return $event->project->id === $project->id;
        });
    }

    /** @test */
    public function it_can_archive_a_project()
    {
        // Arrange
        $project = new Project(['name' => 'Active Project', 'status' => 'active']);
        $project->id = 1;

        $archivedProject = new Project(['name' => 'Active Project', 'status' => 'cancelled']);
        $archivedProject->id = $project->id;

        // Expect repository calls
        $this->projectRepository
            ->expects('archive')
            ->with($project->id)
            ->andReturn($archivedProject);

        // Act
        $result = $this->projectService->archiveProject($project->id);

        // Assert
        $this->assertEquals('cancelled', $result->status);
        Event::assertDispatched(ProjectUpdated::class, function ($event) use ($archivedProject) {
            return $event->project->id === $archivedProject->id &&
                   $event->changes['status'] === 'cancelled';
        });
    }

    /** @test */
    public function it_can_restore_a_project()
    {
        // Arrange
        $project = new Project(['name' => 'Archived Project', 'status' => 'cancelled']);
        $project->id = 1;

        $restoredProject = new Project(['name' => 'Archived Project', 'status' => 'active']);
        $restoredProject->id = $project->id;

        // Expect repository calls
        $this->projectRepository
            ->expects('restore')
            ->with($project->id)
            ->andReturn($restoredProject);

        // Act
        $result = $this->projectService->restoreProject($project->id);

        // Assert
        $this->assertEquals('active', $result->status);
        Event::assertDispatched(ProjectUpdated::class, function ($event) use ($restoredProject) {
            return $event->project->id === $restoredProject->id &&
                   $event->changes['status'] === 'active';
        });
    }

    /** @test */
    public function it_can_get_projects_by_status()
    {
        // Arrange
        $status = 'active';
        $projects = new Collection([
            new Project(['status' => $status]),
            new Project(['status' => $status])
        ]);

        // Expect repository call
        $this->projectRepository
            ->expects('getByStatus')
            ->with($status)
            ->andReturn($projects);

        // Act
        $result = $this->projectService->getProjectsByStatus($status);

        // Assert
        $this->assertCount(2, $result);
        $this->assertTrue($result->every(fn ($project) => $project->status === $status));
    }

    /** @test */
    public function it_can_get_projects_by_visibility()
    {
        // Arrange
        $visibility = 'public';
        $projects = new Collection([
            new Project(['visibility' => $visibility]),
            new Project(['visibility' => $visibility])
        ]);

        // Expect repository call
        $this->projectRepository
            ->expects('getByVisibility')
            ->with($visibility)
            ->andReturn($projects);

        // Act
        $result = $this->projectService->getProjectsByVisibility($visibility);

        // Assert
        $this->assertCount(2, $result);
        $this->assertTrue($result->every(fn ($project) => $project->visibility === $visibility));
    }

    /** @test */
    public function it_can_get_projects_for_member()
    {
        // Arrange
        $userId = 1;
        $projects = new Collection([
            new Project(['name' => 'Project 1']),
            new Project(['name' => 'Project 2'])
        ]);

        // Expect repository call
        $this->projectRepository
            ->expects('getProjectsForMember')
            ->with($userId)
            ->andReturn($projects);

        // Act
        $result = $this->projectService->getProjectsForMember($userId);

        // Assert
        $this->assertCount(2, $result);
    }
}
