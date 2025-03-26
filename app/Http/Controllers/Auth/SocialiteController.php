<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SocialiteLoginRequest;
use App\Services\SocialiteService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

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
     * @param SocialiteLoginRequest $request
     * @return RedirectResponse
     */
    public function redirectToProvider(SocialiteLoginRequest $request): RedirectResponse
    {
        $provider = $request->provider;

        if (!$this->socialiteService->isValidProvider($provider)) {
            Log::warning('Invalid social provider attempted', ['provider' => $provider]);
            return redirect()->route('login')->with('error', 'Không hỗ trợ đăng nhập qua ' . $provider);
        }

        return \Laravel\Socialite\Facades\Socialite::driver($provider)->redirect();
    }

    /**
     * Handle provider callback
     *
     * @param SocialiteLoginRequest $request
     * @return RedirectResponse
     */
    public function handleProviderCallback(SocialiteLoginRequest $request): RedirectResponse
    {
        $provider = $request->provider;

        // Get social user data
        $socialUser = $this->socialiteService->getSocialUser($provider);
        if (!$socialUser) {
            return redirect()->route('login')->with('error', 'Đăng nhập qua ' . $provider . ' không thành công. Vui lòng thử lại.');
        }

        // Validate social user data
        if (!$this->socialiteService->validateSocialUser($socialUser)) {
            Log::error('Missing required social data', [
                'provider' => $provider,
                'has_id' => (bool)$socialUser->getId(),
                'has_email' => (bool)$socialUser->getEmail()
            ]);
            return redirect()->route('login')->with('error', 'Không thể lấy thông tin cần thiết từ ' . $provider);
        }

        // Find or create user
        $user = $this->socialiteService->findOrCreateUser($socialUser, $provider);

        // Login user
        $this->socialiteService->loginUser($user);

        // Redirect to dashboard
        return redirect()->intended('dashboard');
    }
}
