<?php

namespace Tests\Unit\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\TestCase;

class UserServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $userRepositoryMock;
    protected $userService;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a mock of the UserRepository
        $this->userRepositoryMock = Mockery::mock(UserRepository::class);

        // Create the service with the mocked repository
        $this->userService = new UserService($this->userRepositoryMock);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_create_user_hashes_password()
    {
        // Arrange
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ];

        $hashedUserData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'hashed_password', // This will be a real hash in the actual test
        ];

        $user = new User($hashedUserData);

        // Expect the repository create method to be called with the userData including hashed password
        $this->userRepositoryMock->shouldReceive('create')
            ->once()
            ->andReturn($user);

        // Act
        $result = $this->userService->createUser($userData);

        // Assert
        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('Test User', $result->name);
        $this->assertEquals('test@example.com', $result->email);
    }

    public function test_find_by_email_returns_user()
    {
        // Arrange
        $email = 'test@example.com';
        $user = new User([
            'name' => 'Test User',
            'email' => $email,
        ]);

        // Expect the repository findByEmail method to be called with the email
        $this->userRepositoryMock->shouldReceive('findByEmail')
            ->once()
            ->with($email)
            ->andReturn($user);

        // Act
        $result = $this->userService->findByEmail($email);

        // Assert
        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals($email, $result->email);
    }

    public function test_find_by_role_returns_collection()
    {
        // Arrange
        $role = 'admin';
        $users = collect([
            new User(['name' => 'Admin 1', 'email' => 'admin1@example.com']),
            new User(['name' => 'Admin 2', 'email' => 'admin2@example.com']),
        ]);

        // Expect the repository findByRole method to be called with the role
        $this->userRepositoryMock->shouldReceive('findByRole')
            ->once()
            ->with($role)
            ->andReturn($users);

        // Act
        $result = $this->userService->findByRole($role);

        // Assert
        $this->assertEquals(2, $result->count());
        $this->assertEquals('Admin 1', $result[0]->name);
        $this->assertEquals('Admin 2', $result[1]->name);
    }
}
