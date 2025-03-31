<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\SocialLoginService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * The social login service instance.
     *
     * @var \App\Services\SocialLoginService
     */
    protected $socialLoginService;

    /**
     * Create a new controller instance.
     *
     * @param \App\Services\SocialLoginService $socialLoginService
     * @return void
     */
    public function __construct(SocialLoginService $socialLoginService)
    {
        $this->socialLoginService = $socialLoginService;
    }

    /**
     * Redirect the user to the provider authentication page.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirect($provider)
    {
        try {
            Log::info('Starting OAuth redirect for provider: ' . $provider);
            return $this->socialLoginService->getDriver($provider)->redirect();
        } catch (Exception $e) {
            Log::error('OAuth redirect failed for ' . $provider, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->route('login')
                ->with('error', 'Could not connect to ' . $provider . ': ' . $e->getMessage());
        }
    }

    /**
     * Obtain the user information from the provider.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback($provider)
    {
        try {
            Log::info('Starting OAuth callback for provider: ' . $provider);

            // Handle the social login through service
            $user = $this->socialLoginService->handleProviderCallback($provider);

            // Login the user
            Auth::login($user);

            return redirect()->intended('/dashboard');
        } catch (Exception $e) {
            Log::error('OAuth callback failed for ' . $provider, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'provider' => $provider
            ]);

            return redirect()->route('login')
                ->with('error', 'Something went wrong with ' . $provider . ' login: ' . $e->getMessage());
        }
    }
}
