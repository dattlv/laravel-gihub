<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface BaseRepository
{
    /**
     * Get all records
     *
     * @param array $columns
     * @param array $relations
     * @return Collection
     */
    public function all(array $columns = ['*'], array $relations = []): Collection;

    /**
     * Get all records with pagination
     *
     * @param int $perPage
     * @param array $columns
     * @param array $relations
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 10, array $columns = ['*'], array $relations = []): LengthAwarePaginator;

    /**
     * Get record by id
     *
     * @param int $id
     * @param array $columns
     * @param array $relations
     * @param array $appends
     * @return Model|null
     */
    public function findById(
        int $id,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model;

    /**
     * Create new record
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model;

    /**
     * Update record
     *
     * @param int $id
     * @param array $data
     * @return Model
     */
    public function update(int $id, array $data): Model;

    /**
     * Delete record by id
     *
     * @param int $id
     * @return bool
     */
    public function deleteById(int $id): bool;

    /**
     * Check if record exists by id
     *
     * @param int $id
     * @return bool
     */
    public function exists(int $id): bool;
}
