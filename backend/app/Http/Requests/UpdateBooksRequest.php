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
            'author' => ['sometimes', 'min:3', 'max:100'],
            'price' => ['sometimes', 'numeric'],
            'amount' => ['sometimes', 'integer'],
            'image' => ['sometimes', 'image'],
            'categories_id' => ['sometimes'],
        ];
    }
}
