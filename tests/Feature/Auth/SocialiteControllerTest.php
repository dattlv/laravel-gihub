<?php

namespace Tests\Feature\Auth;

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

    protected function setUp(): void
    {
        parent::setUp();
        $this->socialiteUser = new SocialiteUser();
        $this->socialiteUser->map([
            'id' => '123456',
            'name' => 'Test User',
            'email' => 'test@example.com',
            'avatar' => 'https://example.com/avatar.jpg'
        ]);
    }

    public function test_redirect_to_provider()
    {
        $provider = 'google';
        $response = $this->get("/auth/{$provider}");
        $response->assertStatus(302);
    }

    public function test_redirect_to_provider_with_unsupported_provider()
    {
        $provider = 'unsupported';
        $response = $this->get("/auth/{$provider}");
        $response->assertRedirect(route('login'));
        $response->assertSessionHas('error', 'Không hỗ trợ đăng nhập qua ' . $provider);
    }

    public function test_handle_provider_callback_with_new_user()
    {
        $provider = 'google';

        Socialite::shouldReceive('driver')
            ->with($provider)
            ->andReturn(Mockery::mock('Laravel\Socialite\Contracts\Provider')
            ->shouldReceive('user')
            ->andReturn($this->socialiteUser)
            ->getMock());

        $response = $this->get("/auth/{$provider}/callback");

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'provider' => $provider,
            'provider_id' => '123456'
        ]);

        $response->assertRedirect('/dashboard');
    }

    public function test_handle_provider_callback_with_existing_user()
    {
        $provider = 'google';
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'provider' => $provider,
            'provider_id' => '123456'
        ]);

        Socialite::shouldReceive('driver')
            ->with($provider)
            ->andReturn(Mockery::mock('Laravel\Socialite\Contracts\Provider')
            ->shouldReceive('user')
            ->andReturn($this->socialiteUser)
            ->getMock());

        $response = $this->get("/auth/{$provider}/callback");
        $response->assertRedirect('/dashboard');
    }

    public function test_handle_provider_callback_with_error()
    {
        $provider = 'google';

        Socialite::shouldReceive('driver')
            ->with($provider)
            ->andReturn(Mockery::mock('Laravel\Socialite\Contracts\Provider')
            ->shouldReceive('user')
            ->andThrow(new \Exception())
            ->getMock());

        $response = $this->get("/auth/{$provider}/callback");
        $response->assertRedirect(route('login'));
        $response->assertSessionHas('error', 'Đăng nhập qua ' . $provider . ' không thành công. Vui lòng thử lại.');
    }
}