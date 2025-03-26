<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteService
{
    protected $userRepository;
    protected $providers = ['google', 'facebook', 'github', 'gitlab'];

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Validate if the provider is supported
     *
     * @param string $provider
     * @return bool
     */
    public function isValidProvider(string $provider): bool
    {
        return in_array($provider, $this->providers);
    }

    /**
     * Get social user data from provider
     *
     * @param string $provider
     * @return object|null
     */
    public function getSocialUser(string $provider): ?object
    {
        try {
            return Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            Log::error('Failed to get social user', [
                'provider' => $provider,
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    /**
     * Validate social user data
     *
     * @param object $socialUser
     * @return bool
     */
    public function validateSocialUser(object $socialUser): bool
    {
        return $socialUser->getId() && $socialUser->getEmail();
    }

    /**
     * Find or create user from social data
     *
     * @param object $socialUser
     * @param string $provider
     * @return User
     */
    public function findOrCreateUser(object $socialUser, string $provider): User
    {
        // Find user by provider
        $user = $this->userRepository->findByProvider($provider, $socialUser->getId());

        if (!$user) {
            // Find user by email
            $user = $this->userRepository->findByEmail($socialUser->getEmail());

            if ($user) {
                // Update existing user with provider info
                $this->userRepository->updateProviderInfo($user, [
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                ]);
            } else {
                // Create new user
                $user = $this->userRepository->create([
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

        return $user;
    }

    /**
     * Login user
     *
     * @param User $user
     * @return void
     */
    public function loginUser(User $user): void
    {
        Auth::login($user, true);
        Log::info('User logged in via social provider', [
            'user_id' => $user->id,
            'provider' => $user->provider
        ]);
    }
}
