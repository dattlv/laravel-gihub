<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    protected $providers = [
        'google', 'facebook', 'github', 'gitlab'
    ];

    /**
     * Redirect to provider for authentication
     *
     * @param string $provider
     * @return mixed
     */
    public function redirectToProvider($provider)
    {
        if (!in_array($provider, $this->providers)) {
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
            $socialUser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Đăng nhập qua ' . $provider . ' không thành công. Vui lòng thử lại.');
        }

        // Check if user with this provider id exists
        $user = User::where('provider', $provider)
            ->where('provider_id', $socialUser->getId())
            ->first();

        // If user doesn't exist, check if email exists
        if (!$user) {
            $user = User::where('email', $socialUser->getEmail())->first();

            // If email exists, update provider details
            if ($user) {
                // Check if email has changed
                $emailChanged = $user->email !== $socialUser->getEmail();

                // Update user information
                $user->update([
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    // Set email_verified_at to null if email has changed
                    'email_verified_at' => $emailChanged ? null : $user->email_verified_at
                ]);

                // If the email was changed, we need to verify it
                if ($emailChanged) {
                    $user->sendEmailVerificationNotification();
                }
            } else {
                // Create new user
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'password' => Hash::make(Str::random(16)),
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    'role_id' => 3, // Regular user role
                    'email_verified_at' => now() // Social login verifies email
                ]);
            }
        }

        // Login user
        Auth::login($user, true);

        // Redirect to dashboard
        return redirect()->intended('dashboard');
    }
}
