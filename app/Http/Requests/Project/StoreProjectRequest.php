<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'category_id' => ['required', 'integer', 'exists:project_categories,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after:start_date'],
            'status' => ['required', Rule::in(['planning', 'active', 'on_hold', 'completed', 'cancelled'])],
            'visibility' => ['required', Rule::in(['public', 'private', 'team'])],
            'priority' => ['required', Rule::in(['low', 'medium', 'high', 'urgent'])],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'settings' => ['nullable', 'array'],
            'settings.notifications' => ['nullable', 'boolean'],
            'settings.task_tracking' => ['nullable', 'boolean']
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
            'name.required' => 'A project name is required',
            'category_id.exists' => 'The selected category does not exist',
            'end_date.after' => 'The end date must be after the start date',
            'status.in' => 'Invalid project status selected',
            'visibility.in' => 'Invalid visibility option selected',
            'priority.in' => 'Invalid priority level selected'
        ];
    }
}
