<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
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
            //
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'due_date' => 'nullable|date',

        ];
    }
    public function messages(): array
    {
        return [
            //
            'title.required' => 'El campo título es obligatorio.',
            'title.max' => 'El título no puede tener más de 255 caracteres.',
            'due_date.date' => 'The due date must be a valid date.',
        ];
    }
}
