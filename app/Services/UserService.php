<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService
{
    /**
     * @var UserRepository
     */
    protected $repository;

    /**
     * UserService constructor.
     *
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Create a new user.
     *
     * @param array $data
     * @return User|null
     */
    public function createUser(array $data): ?User
    {
        $data['password'] = Hash::make($data['password']);

        return $this->repository->create($data);
    }

    /**
     * Update user profile.
     *
     * @param int $userId
     * @param array $data
     * @return User|null
     */
    public function updateProfile(int $userId, array $data): ?User
    {
        $user = $this->findById($userId);

        // Check if email is being changed
        if (isset($data['email']) && $data['email'] !== $user->email) {
            $data['email_verified_at'] = null;
        }

        // Hash password if it's being updated
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return $this->repository->update($userId, $data);
    }

    /**
     * Find a user by email.
     *
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return $this->repository->findByEmail($email);
    }

    /**
     * Find users by role.
     *
     * @param string $role
     * @return \Illuminate\Support\Collection
     */
    public function findByRole(string $role): \Illuminate\Support\Collection
    {
        return $this->repository->findByRole($role);
    }
}
