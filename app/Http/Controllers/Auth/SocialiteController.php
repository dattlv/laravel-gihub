<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\SocialiteService;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    protected $socialiteService;

    public function __construct(SocialiteService $socialiteService)
    {
        $this->socialiteService = $socialiteService;
    }

    /**
     * Redirect to provider for authentication
     *
     * @param string $provider
     * @return mixed
     */
    public function redirectToProvider($provider)
    {
        if (!$this->socialiteService->isProviderSupported($provider)) {
            return redirect()->route('login')->with('error', 'Không hỗ trợ đăng nhập qua ' . $provider);
        }

        return Socialite::driver($provider)->redirect();
    }

    /**
     * Handle provider callback
     *
     * @param string $provider
     * @return mixed
     */
    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = $this->socialiteService->getSocialUser($provider);
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Đăng nhập qua ' . $provider . ' không thành công. Vui lòng thử lại.');
        }

        $user = $this->socialiteService->findOrCreateUser($socialUser, $provider);

        // Login user
        Auth::login($user, true);

        // Redirect to dashboard
        return redirect()->intended('dashboard');
    }
}
