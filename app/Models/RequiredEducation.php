<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequiredEducation extends Model
{
    use HasFactory;

    protected $fillable = [

        'required_education_id',
        'education',
        

    ];
}
