<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization will be handled by policies
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                'integer',
                'exists:users,id',
                Rule::unique('project_members')->where(function ($query) {
                    return $query->where('project_id', $this->route('project'));
                })
            ],
            'role' => ['required', Rule::in(['owner', 'admin', 'member', 'viewer'])],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', Rule::in([
                'view_project',
                'edit_project',
                'delete_project',
                'manage_members',
                'create_tasks',
                'edit_tasks',
                'delete_tasks',
                'comment'
            ])]
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'A user must be selected',
            'user_id.exists' => 'The selected user does not exist',
            'user_id.unique' => 'This user is already a member of the project',
            'role.required' => 'A role must be specified',
            'role.in' => 'Invalid role selected',
            'permissions.*.in' => 'Invalid permission specified'
        ];
    }
}
