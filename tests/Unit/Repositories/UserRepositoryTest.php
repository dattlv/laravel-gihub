<?php

namespace Tests\Unit\Repositories;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $userRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->userRepository = new UserRepository(new User());
    }

    public function test_create_user()
    {
        // Arrange
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ];

        // Act
        $user = $this->userRepository->create($userData);

        // Assert
        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('Test User', $user->name);
        $this->assertEquals('test@example.com', $user->email);

        // Check the user was saved to the database
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'name' => 'Test User',
        ]);
    }

    public function test_find_by_id()
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $foundUser = $this->userRepository->findById($user->id);

        // Assert
        $this->assertInstanceOf(User::class, $foundUser);
        $this->assertEquals($user->id, $foundUser->id);
    }

    public function test_find_by_email()
    {
        // Arrange
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        // Act
        $foundUser = $this->userRepository->findByEmail('test@example.com');

        // Assert
        $this->assertInstanceOf(User::class, $foundUser);
        $this->assertEquals($user->id, $foundUser->id);
        $this->assertEquals('test@example.com', $foundUser->email);
    }

    public function test_find_by_provider()
    {
        // Arrange
        $user = User::factory()->create([
            'provider' => 'google',
            'provider_id' => '123'
        ]);

        // Act
        $foundUser = $this->userRepository->findByProvider('google', '123');

        // Assert
        $this->assertInstanceOf(User::class, $foundUser);
        $this->assertEquals($user->id, $foundUser->id);
        $this->assertEquals('google', $foundUser->provider);
        $this->assertEquals('123', $foundUser->provider_id);
    }

    public function test_update_user()
    {
        // Arrange
        $user = User::factory()->create();
        $updateData = [
            'name' => 'Updated Name',
        ];

        // Act
        $updatedUser = $this->userRepository->update($user->id, $updateData);

        // Assert
        $this->assertEquals('Updated Name', $updatedUser->name);

        // Check the database was updated
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
        ]);
    }

    public function test_update_provider_info()
    {
        // Arrange
        $user = User::factory()->create();
        $providerData = [
            'provider' => 'google',
            'provider_id' => '123',
            'avatar' => 'https://example.com/avatar.jpg'
        ];

        // Act
        $result = $this->userRepository->updateProviderInfo($user, $providerData);

        // Assert
        $this->assertTrue($result);
        $this->assertEquals('google', $user->fresh()->provider);
        $this->assertEquals('123', $user->fresh()->provider_id);
        $this->assertEquals('https://example.com/avatar.jpg', $user->fresh()->avatar);
    }

    public function test_delete_user()
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $result = $this->userRepository->deleteById($user->id);

        // Assert
        $this->assertTrue($result);

        // Check the user was deleted from the database
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }

    public function test_find_by_role()
    {
        // Arrange
        User::factory()->create(['role' => 'admin']);
        User::factory()->create(['role' => 'user']);

        // Act
        $admins = $this->userRepository->findByRole('admin');

        // Assert
        $this->assertEquals(1, $admins->count());
        $this->assertEquals('admin', $admins->first()->role);
    }

    public function test_paginate()
    {
        // Arrange
        User::factory()->count(20)->create();

        // Act
        $paginated = $this->userRepository->paginate(10);

        // Assert
        $this->assertEquals(10, $paginated->perPage());
        $this->assertEquals(2, $paginated->lastPage());
        $this->assertEquals(20, $paginated->total());
    }
}
