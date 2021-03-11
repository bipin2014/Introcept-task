<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3|max:50',
            'gender' => 'required',
            'phone' => 'required|digits:10',
            'email' => 'required|email',
            'address' => 'required|min:5',
            'nationality' => 'required',
            'dob' => 'required|date',
            'education_background' => 'required',
            'contact_mode' => 'required',
        ];
    }
}
