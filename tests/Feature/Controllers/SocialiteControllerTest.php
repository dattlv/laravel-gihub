<?php

namespace Tests\Feature\Controllers;

use App\Models\User;
use App\Services\SocialiteService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class SocialiteControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = Mockery::mock(SocialiteService::class);
        $this->app->instance(SocialiteService::class, $this->service);
    }

    public function test_redirect_to_provider()
    {
        $this->service->shouldReceive('isValidProvider')
            ->with('google')
            ->andReturn(true);

        Socialite::shouldReceive('driver->redirect')
            ->once()
            ->andReturn(redirect('https://google.com'));

        $response = $this->get('/auth/google?provider=google');
        $response->assertStatus(302);
        $response->assertRedirect('https://google.com');
    }

    public function test_redirect_to_provider_invalid()
    {
        $this->service->shouldReceive('isValidProvider')
            ->with('invalid')
            ->andReturn(false);

        $response = $this->get('/auth/invalid?provider=invalid');
        $response->assertStatus(302);
        $response->assertRedirect(route('home'));
    }

    public function test_handle_provider_callback()
    {
        $socialUser = Mockery::mock(SocialiteUser::class);
        $socialUser->shouldReceive('getId')->andReturn('123');
        $socialUser->shouldReceive('getEmail')->andReturn('test@example.com');
        $socialUser->shouldReceive('getName')->andReturn('Test User');
        $socialUser->shouldReceive('getAvatar')->andReturn('https://example.com/avatar.jpg');

        $this->service->shouldReceive('isValidProvider')
            ->with('google')
            ->andReturn(true);

        $this->service->shouldReceive('getSocialUser')
            ->with('google')
            ->andReturn($socialUser);

        $this->service->shouldReceive('validateSocialUser')
            ->with($socialUser)
            ->andReturn(true);

        $this->service->shouldReceive('findOrCreateUser')
            ->with($socialUser, 'google')
            ->andReturn(new User([
                'id' => 1,
                'name' => 'Test User',
                'email' => 'test@example.com'
            ]));

        $this->service->shouldReceive('loginUser')
            ->once()
            ->andReturn(true);

        $response = $this->get('/auth/google/callback?provider=google');
        $response->assertStatus(302);
        $response->assertRedirect(route('dashboard'));
    }

    public function test_handle_provider_callback_invalid_user()
    {
        $socialUser = Mockery::mock(SocialiteUser::class);
        $socialUser->shouldReceive('getId')->andReturn(null);
        $socialUser->shouldReceive('getEmail')->andReturn(null);

        $this->service->shouldReceive('isValidProvider')
            ->with('google')
            ->andReturn(true);

        $this->service->shouldReceive('getSocialUser')
            ->with('google')
            ->andReturn($socialUser);

        $this->service->shouldReceive('validateSocialUser')
            ->with($socialUser)
            ->andReturn(false);

        $response = $this->get('/auth/google/callback?provider=google');
        $response->assertStatus(302);
        $response->assertRedirect(route('login'));
        $response->assertSessionHas('error', 'Không thể lấy thông tin cần thiết từ google');
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
