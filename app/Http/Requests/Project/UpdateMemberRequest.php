<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMemberRequest extends FormRequest
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
            'role.required' => 'A role must be specified',
            'role.in' => 'Invalid role selected',
            'permissions.*.in' => 'Invalid permission specified'
        ];
    }
}
