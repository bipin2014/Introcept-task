<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    public function array_to_object_array($arrayData)
    {
        return [
            'name' => $arrayData[0],
            'gender' => $arrayData[1],
            'phone' => $arrayData[2],
            'email' => $arrayData[3],
            'address' => $arrayData[4],
            'nationality' => $arrayData[5],
            'dob' => $arrayData[6],
            'education_background' => $arrayData[7],
            'contact_mode' => $arrayData[8],
        ];
    }

    public function array_object_to_array($objectData)
    {
        return [
            $objectData->name,
            $objectData->gender,
            $objectData->phone,
            $objectData->email,
            $objectData->address,
            $objectData->nationality,
            $objectData->dob,
            $objectData->education_background,
            $objectData->contact_mode,
        ];
    }
}
