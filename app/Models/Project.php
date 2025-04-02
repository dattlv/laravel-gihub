<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category_id',
        'owner_id',
        'start_date',
        'end_date',
        'status',
        'visibility',
        'settings',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'settings' => 'array',
    ];

    /**
     * Get the category that owns the project.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class);
    }

    /**
     * Get the owner of the project.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the members of the project.
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_members')
            ->withPivot(['role', 'permissions'])
            ->withTimestamps();
    }

    /**
     * Get the project members records.
     */
    public function projectMembers(): HasMany
    {
        return $this->hasMany(ProjectMember::class);
    }
}
