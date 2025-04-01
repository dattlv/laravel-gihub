<?php

namespace Tests\Unit\Services;

use App\Models\User;
use App\Services\SocialLoginService;
use Exception;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class SocialLoginServiceTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var \Mockery\MockInterface
     */
    protected $mockSocialite;

    /**
     * @var SocialLoginService
     */
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a mock of the Socialite facade
        $this->mockSocialite = Mockery::mock('Laravel\Socialite\Contracts\Factory');
        Socialite::swap($this->mockSocialite);

        // Create service instance
        $this->service = new SocialLoginService();
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test getDriver method
     */
    public function test_get_driver_method(): void
    {
        // Mock the provider driver
        $provider = 'github';
        $providerMock = Mockery::mock('Laravel\Socialite\Contracts\Provider');

        $this->mockSocialite->shouldReceive('driver')
            ->with($provider)
            ->once()
            ->andReturn($providerMock);

        $result = $this->service->getDriver($provider);

        $this->assertSame($providerMock, $result);
    }

    /**
     * Test handleProviderCallback method creates a new user
     */
    public function test_handle_provider_callback_creates_new_user(): void
    {
        // Mock the provider driver
        $provider = 'github';
        $email = 'test@example.com';
        $name = 'Test User';
        $providerId = '12345';
        $token = 'test-token';
        $refreshToken = 'test-refresh-token';

        // Create a mock Socialite user
        $socialiteUser = new SocialiteUser();
        $socialiteUser->map([
            'id' => $providerId,
            'name' => $name,
            'email' => $email,
            'token' => $token,
            'refreshToken' => $refreshToken,
        ]);
        $socialiteUser->user = [
            'id' => $providerId,
            'name' => $name,
            'email' => $email,
        ];

        // Mock the provider driver
        $providerMock = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $providerMock->shouldReceive('user')
            ->once()
            ->andReturn($socialiteUser);

        $this->mockSocialite->shouldReceive('driver')
            ->with($provider)
            ->once()
            ->andReturn($providerMock);

        // Call the service method
        $user = $this->service->handleProviderCallback($provider);

        // Assert a user was created
        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($email, $user->email);
        $this->assertEquals($name, $user->name);
        $this->assertEquals($providerId, $user->{$provider.'_id'});
        $this->assertEquals($token, $user->{$provider.'_token'});
        $this->assertEquals($refreshToken, $user->{$provider.'_refresh_token'});

        // Assert the user exists in the database
        $this->assertDatabaseHas('users', [
            'email' => $email,
            'name' => $name,
            $provider.'_id' => $providerId,
        ]);
    }

    /**
     * Test handleProviderCallback method updates an existing user
     */
    public function test_handle_provider_callback_updates_existing_user(): void
    {
        // Create a user
        $existingUser = User::factory()->create([
            'email' => 'existing@example.com',
            'name' => 'Existing User',
        ]);

        // Mock the provider driver
        $provider = 'github';
        $providerId = '12345';
        $token = 'test-token';
        $refreshToken = 'test-refresh-token';

        // Create a mock Socialite user with the same email as existing user
        $socialiteUser = new SocialiteUser();
        $socialiteUser->map([
            'id' => $providerId,
            'name' => 'Updated Name',
            'email' => $existingUser->email,
            'token' => $token,
            'refreshToken' => $refreshToken,
        ]);
        $socialiteUser->user = [
            'id' => $providerId,
            'name' => 'Updated Name',
            'email' => $existingUser->email,
        ];

        // Mock the provider driver
        $providerMock = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $providerMock->shouldReceive('user')
            ->once()
            ->andReturn($socialiteUser);

        $this->mockSocialite->shouldReceive('driver')
            ->with($provider)
            ->once()
            ->andReturn($providerMock);

        // Call the service method
        $user = $this->service->handleProviderCallback($provider);

        // Assert the user was updated
        $this->assertEquals($existingUser->id, $user->id);
        $this->assertEquals($existingUser->email, $user->email);
        $this->assertEquals('Updated Name', $user->name);
        $this->assertEquals($providerId, $user->{$provider.'_id'});

        // Assert the user was updated in the database
        $this->assertDatabaseHas('users', [
            'id' => $existingUser->id,
            'email' => $existingUser->email,
            'name' => 'Updated Name',
            $provider.'_id' => $providerId,
        ]);
    }

    /**
     * Test handleProviderCallback throws exception for missing email
     */
    public function test_handle_provider_callback_throws_exception_for_missing_email(): void
    {
        // Mock the provider driver
        $provider = 'github';
        $name = 'Test User';
        $providerId = '12345';

        // Create a mock Socialite user without email
        $socialiteUser = new SocialiteUser();
        $socialiteUser->map([
            'id' => $providerId,
            'name' => $name,
            // No email
            'token' => 'test-token',
        ]);
        $socialiteUser->user = [
            'id' => $providerId,
            'name' => $name,
            // No email
        ];

        // Mock the provider driver
        $providerMock = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $providerMock->shouldReceive('user')
            ->once()
            ->andReturn($socialiteUser);

        $this->mockSocialite->shouldReceive('driver')
            ->with($provider)
            ->once()
            ->andReturn($providerMock);

        // Expect an exception
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Email address is required');

        // Call the service method
        $this->service->handleProviderCallback($provider);
    }

    /**
     * Test find or create user method
     */
    public function test_find_or_create_user_method(): void
    {
        // Provider data
        $provider = 'github';
        $email = 'new@example.com';
        $name = 'New User';
        $providerId = '12345';
        $token = 'test-token';
        $refreshToken = 'test-refresh-token';

        $userData = [
            'email' => $email,
            'name' => $name,
            'provider_id' => $providerId,
            'token' => $token,
            'refresh_token' => $refreshToken,
        ];

        // Create a mock Socialite user
        $socialiteUser = Mockery::mock('Laravel\Socialite\Contracts\User');

        // Use reflection to call protected method
        $method = new \ReflectionMethod(SocialLoginService::class, 'findOrCreateUser');
        $method->setAccessible(true);

        // Call the protected method
        $user = $method->invoke($this->service, $provider, $userData, $socialiteUser);

        // Assert a user was created
        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($email, $user->email);
        $this->assertEquals($name, $user->name);
        $this->assertEquals($providerId, $user->{$provider.'_id'});

        // Now test with an existing user
        $existingUser = User::factory()->create([
            'email' => 'existing@example.com',
            'name' => 'Existing User',
        ]);

        $userData['email'] = $existingUser->email;
        $userData['name'] = 'Updated Name';

        // Call the protected method again
        $updatedUser = $method->invoke($this->service, $provider, $userData, $socialiteUser);

        // Assert the user was updated
        $this->assertEquals($existingUser->id, $updatedUser->id);
        $this->assertEquals('Updated Name', $updatedUser->name);
    }
}
