<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use App\Repositories\SocialiteRepository;

class SocialiteService
{
    protected $providers = [
        'google', 'facebook', 'github', 'gitlab'
    ];

    protected $repository;

    public function __construct(SocialiteRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Check if provider is supported
     *
     * @param string $provider
     * @return bool
     */
    public function isProviderSupported(string $provider): bool
    {
        return in_array($provider, $this->providers);
    }

    /**
     * Get social user from provider
     *
     * @param string $provider
     * @return mixed
     */
    public function getSocialUser(string $provider)
    {
        return Socialite::driver($provider)->user();
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
        // Check if user with this provider id exists
        $user = $this->repository->findByProvider($provider, $socialUser->getId());

        if (!$user) {
            $user = User::where('email', $socialUser->getEmail())->first();

            if ($user) {
                $emailChanged = $user->email !== $socialUser->getEmail();

                $user->update([
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    'email_verified_at' => $emailChanged ? null : $user->email_verified_at
                ]);

                if ($emailChanged) {
                    $user->sendEmailVerificationNotification();
                }
            } else {
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'password' => Hash::make(Str::random(16)),
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    'role_id' => 3,
                    'email_verified_at' => now()
                ]);
            }
        }

        return $user;
    }
}