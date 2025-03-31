<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
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
            return Socialite::driver($provider)->redirect();
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

            $socialUser = Socialite::driver($provider)->user();

            Log::info('Raw social user data:', [
                'provider' => $provider,
                'data' => json_encode($socialUser->user, JSON_PRETTY_PRINT)
            ]);

            // Get user details with fallbacks
            $email = $socialUser->getEmail();

            // Special handling for GitLab
            if ($provider === 'gitlab') {
                $userData = $socialUser->user;
                $name = $socialUser->getName()
                    ?? $socialUser->nickname
                    ?? ($userData['username'] ?? null)
                    ?? explode('@', $email)[0]
                    ?? 'GitLab User';
            } else {
                $name = $socialUser->getName()
                    ?? $socialUser->getNickname()
                    ?? explode('@', $email)[0]
                    ?? 'User';
            }

            if (empty($email)) {
                Log::error('No email provided by ' . $provider, [
                    'provider' => $provider,
                    'raw_data' => $socialUser->user
                ]);
                return redirect()->route('login')
                    ->with('error', 'Email address is required. Please ensure your ' . $provider . ' account has a verified email address.');
            }

            $user = User::updateOrCreate([
                'email' => $email,
            ], [
                'name' => $name,
                'password' => bcrypt(Str::random(16)),
                $provider.'_id' => $socialUser->getId(),
                $provider.'_token' => $socialUser->token,
                $provider.'_refresh_token' => $socialUser->refreshToken,
            ]);

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
