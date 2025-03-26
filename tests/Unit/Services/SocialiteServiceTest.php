<?php

namespace Tests\Unit\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\SocialiteService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class SocialiteServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $service;
    protected $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = Mockery::mock(UserRepository::class);
        $this->service = new SocialiteService($this->repository);
    }

    public function test_is_valid_provider()
    {
        $this->assertTrue($this->service->isValidProvider('google'));
        $this->assertTrue($this->service->isValidProvider('facebook'));
        $this->assertTrue($this->service->isValidProvider('github'));
        $this->assertTrue($this->service->isValidProvider('gitlab'));
        $this->assertFalse($this->service->isValidProvider('invalid'));
    }

    public function test_get_social_user()
    {
        $mockUser = Mockery::mock(SocialiteUser::class);
        $mockUser->shouldReceive('getId')->andReturn('123');
        $mockUser->shouldReceive('getEmail')->andReturn('test@example.com');
        $mockUser->shouldReceive('getName')->andReturn('Test User');
        $mockUser->shouldReceive('getAvatar')->andReturn('https://example.com/avatar.jpg');

        Socialite::shouldReceive('driver->user')
            ->once()
            ->andReturn($mockUser);

        $user = $this->service->getSocialUser('google');
        $this->assertEquals($mockUser, $user);
    }

    public function test_validate_social_user()
    {
        $validUser = Mockery::mock(SocialiteUser::class);
        $validUser->shouldReceive('getId')->andReturn('123');
        $validUser->shouldReceive('getEmail')->andReturn('test@example.com');

        $invalidUser = Mockery::mock(SocialiteUser::class);
        $invalidUser->shouldReceive('getId')->andReturn(null);
        $invalidUser->shouldReceive('getEmail')->andReturn(null);

        $this->assertTrue($this->service->validateSocialUser($validUser));
        $this->assertFalse($this->service->validateSocialUser($invalidUser));
    }

    public function test_find_or_create_user_existing()
    {
        $socialUser = Mockery::mock(SocialiteUser::class);
        $socialUser->shouldReceive('getId')->andReturn('123');
        $socialUser->shouldReceive('getEmail')->andReturn('test@example.com');
        $socialUser->shouldReceive('getName')->andReturn('Test User');
        $socialUser->shouldReceive('getAvatar')->andReturn('https://example.com/avatar.jpg');

        $existingUser = new User([
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@example.com'
        ]);

        $this->repository->shouldReceive('findByProvider')
            ->once()
            ->with('google', '123')
            ->andReturn($existingUser);

        $user = $this->service->findOrCreateUser($socialUser, 'google');
        $this->assertEquals($existingUser, $user);
    }

    public function test_find_or_create_user_new()
    {
        $socialUser = Mockery::mock(SocialiteUser::class);
        $socialUser->shouldReceive('getId')->andReturn('123');
        $socialUser->shouldReceive('getEmail')->andReturn('test@example.com');
        $socialUser->shouldReceive('getName')->andReturn('Test User');
        $socialUser->shouldReceive('getAvatar')->andReturn('https://example.com/avatar.jpg');

        $this->repository->shouldReceive('findByProvider')
            ->once()
            ->with('google', '123')
            ->andReturn(null);

        $this->repository->shouldReceive('findByEmail')
            ->once()
            ->with('test@example.com')
            ->andReturn(null);

        $newUser = new User([
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@example.com'
        ]);

        $this->repository->shouldReceive('create')
            ->once()
            ->andReturn($newUser);

        $user = $this->service->findOrCreateUser($socialUser, 'google');
        $this->assertEquals($newUser, $user);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
