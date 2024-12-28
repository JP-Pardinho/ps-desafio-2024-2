<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBooksRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'min:3', 'max:100'],
            'description' => ['sometimes', 'min:3', 'max:100'],
            'price' => ['sometimes', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'],
            'amount' => ['sometimes', 'integer'],
            'image' => ['sometimes', 'image'],
            'categories_id' => ['sometimes'],
        ];
    }
}
