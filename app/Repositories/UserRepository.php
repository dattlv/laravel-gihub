<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository
{
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * Find user by provider and provider ID
     *
     * @param string $provider
     * @param string $providerId
     * @return User|null
     */
    public function findByProvider(string $provider, string $providerId): ?User
    {
        return $this->model
            ->where('provider', $provider)
            ->where('provider_id', $providerId)
            ->first();
    }

    /**
     * Find user by email
     *
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return $this->model->where('email', $email)->first();
    }

    /**
     * Update user's provider information
     *
     * @param User $user
     * @param array $data
     * @return bool
     */
    public function updateProviderInfo(User $user, array $data): bool
    {
        return $user->update($data);
    }

    /**
     * Create new user
     *
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        return $this->model->create($data);
    }

    /**
     * Find users who match a specific role.
     *
     * @param string $role
     * @return \Illuminate\Support\Collection
     */
    public function findByRole(string $role): \Illuminate\Support\Collection
    {
        return $this->model->where('role', $role)->get();
    }
}
