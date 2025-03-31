<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginService
{
    /**
     * Get a driver instance for the specified provider.
     *
     * @param string $provider
     * @return \Laravel\Socialite\Contracts\Provider
     */
    public function getDriver(string $provider)
    {
        return Socialite::driver($provider);
    }

    /**
     * Handle the user authentication with social provider.
     *
     * @param string $provider
     * @return \App\Models\User
     * @throws \Exception
     */
    public function handleProviderCallback(string $provider)
    {
        $socialUser = $this->getDriver($provider)->user();

        Log::info('OAuth user data received', [
            'provider' => $provider,
            'data' => json_encode($socialUser->user, JSON_PRETTY_PRINT)
        ]);

        // Get and validate user details
        $userData = $this->extractUserData($provider, $socialUser);

        // Create or update user
        return $this->findOrCreateUser($provider, $userData, $socialUser);
    }

    /**
     * Extract user data from social provider response.
     *
     * @param string $provider
     * @param \Laravel\Socialite\Contracts\User $socialUser
     * @return array
     * @throws \Exception
     */
    protected function extractUserData(string $provider, $socialUser)
    {
        $email = $socialUser->getEmail();

        // Handle provider-specific data extraction
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
            throw new Exception('Email address is required. Please ensure your ' . $provider . ' account has a verified email address.');
        }

        return [
            'email' => $email,
            'name' => $name,
            'provider_id' => $socialUser->getId(),
            'token' => $socialUser->token,
            'refresh_token' => $socialUser->refreshToken,
        ];
    }

    /**
     * Create a new user or update existing one.
     *
     * @param string $provider
     * @param array $userData
     * @param \Laravel\Socialite\Contracts\User $socialUser
     * @return \App\Models\User
     */
    protected function findOrCreateUser(string $provider, array $userData, $socialUser)
    {
        $user = User::updateOrCreate(
            ['email' => $userData['email']],
            [
                'name' => $userData['name'],
                'password' => bcrypt(Str::random(16)),
                $provider.'_id' => $userData['provider_id'],
                $provider.'_token' => $userData['token'],
                $provider.'_refresh_token' => $userData['refresh_token'],
            ]
        );

        Log::info('User authenticated via ' . $provider, [
            'user_id' => $user->id,
            'email' => $user->email
        ]);

        return $user;
    }
}
