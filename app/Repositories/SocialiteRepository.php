<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class SocialiteRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * Find user by provider and provider_id
     *
     * @param string $provider
     * @param string $providerId
     * @return Model|null
     */
    public function findByProvider(string $provider, string $providerId): ?Model
    {
        return $this->model
            ->where('provider', $provider)
            ->where('provider_id', $providerId)
            ->first();
    }

    /**
     * Create user from social data
     *
     * @param array $data
     * @return Model
     */
    public function createFromSocial(array $data): Model
    {
        return $this->model->create($data);
    }
}