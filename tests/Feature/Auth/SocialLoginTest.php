<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Services\SocialLoginService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class SocialLoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @var \Mockery\MockInterface
     */
    protected $mock;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a mock of the Socialite facade
        $this->mock = Mockery::mock('Laravel\Socialite\Contracts\Factory');
        Socialite::swap($this->mock);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test that the redirect to provider method works.
     */
    public function test_social_login_redirect_works(): void
    {
        // Mock the provider driver
        $provider = 'github';
        $providerMock = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $providerMock->shouldReceive('redirect')->once()->andReturn(redirect('https://github.com/login/oauth/authorize'));

        $this->mock->shouldReceive('driver')->with($provider)->once()->andReturn($providerMock);

        // Test the redirect
        $response = $this->get(route('socialite.redirect', ['provider' => $provider]));

        $response->assertRedirect();
        $response->assertLocation('https://github.com/login/oauth/authorize');
    }

    /**
     * Test that the callback from provider successfully creates and authenticates a user.
     */
    public function test_social_login_callback_creates_and_authenticates_user(): void
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
        $providerMock->shouldReceive('user')->once()->andReturn($socialiteUser);

        $this->mock->shouldReceive('driver')->with($provider)->once()->andReturn($providerMock);

        // Test the callback
        $response = $this->get(route('socialite.callback', ['provider' => $provider]));

        // Assert the user was created
        $this->assertDatabaseHas('users', [
            'email' => $email,
            'name' => $name,
            $provider.'_id' => $providerId,
            $provider.'_token' => $token,
        ]);

        // Assert the user is authenticated
        $this->assertTrue(Auth::check());

        // Assert redirect to dashboard
        $response->assertRedirect('/dashboard');
    }

    /**
     * Test that the callback works with existing users.
     */
    public function test_social_login_callback_works_with_existing_user(): void
    {
        // Create a user
        $user = User::factory()->create([
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
            'name' => 'New Name',
            'email' => $user->email,
            'token' => $token,
            'refreshToken' => $refreshToken,
        ]);
        $socialiteUser->user = [
            'id' => $providerId,
            'name' => 'New Name',
            'email' => $user->email,
        ];

        // Mock the provider driver
        $providerMock = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $providerMock->shouldReceive('user')->once()->andReturn($socialiteUser);

        $this->mock->shouldReceive('driver')->with($provider)->once()->andReturn($providerMock);

        // Test the callback
        $response = $this->get(route('socialite.callback', ['provider' => $provider]));

        // Assert the user was updated
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => $user->email,
            'name' => 'New Name', // Name should be updated
            $provider.'_id' => $providerId,
            $provider.'_token' => $token,
        ]);

        // Assert the user is authenticated
        $this->assertTrue(Auth::check());

        // Assert redirect to dashboard
        $response->assertRedirect('/dashboard');
    }

    /**
     * Test that the callback handles errors.
     */
    public function test_social_login_callback_handles_errors(): void
    {
        // Mock the provider driver to throw an exception
        $provider = 'github';

        // Mock the provider driver
        $providerMock = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $providerMock->shouldReceive('user')->once()->andThrow(new \Exception('OAuth error'));

        $this->mock->shouldReceive('driver')->with($provider)->once()->andReturn($providerMock);

        // Test the callback
        $response = $this->get(route('socialite.callback', ['provider' => $provider]));

        // Assert redirect to login with error message
        $response->assertRedirect(route('login'));
        $response->assertSessionHas('error', 'Something went wrong with github login: OAuth error');
    }

    /**
     * Test that the callback handles missing email.
     */
    public function test_social_login_callback_handles_missing_email(): void
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
        $providerMock->shouldReceive('user')->once()->andReturn($socialiteUser);

        $this->mock->shouldReceive('driver')->with($provider)->once()->andReturn($providerMock);

        // Test the callback
        $response = $this->get(route('socialite.callback', ['provider' => $provider]));

        // Assert redirect to login with error message about missing email
        $response->assertRedirect(route('login'));
        $response->assertSessionHas('error');
    }
}
