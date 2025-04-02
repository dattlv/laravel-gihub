<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'visibility' => $this->visibility,
            'priority' => $this->priority,
            'start_date' => $this->start_date?->format('Y-m-d'),
            'end_date' => $this->end_date?->format('Y-m-d'),
            'category' => new ProjectCategoryResource($this->whenLoaded('category')),
            'owner' => new UserResource($this->whenLoaded('owner')),
            'members_count' => $this->whenCounted('members'),
            'members' => ProjectMemberResource::collection($this->whenLoaded('members')),
            'tags' => $this->tags,
            'settings' => $this->settings,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}
