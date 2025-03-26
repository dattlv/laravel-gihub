<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SocialiteLoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'provider' => 'required|string|in:google,facebook,github,gitlab'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'provider.in' => 'Provider không được hỗ trợ.'
        ];
    }
}
