<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequiredExperiences extends Model
{
    use HasFactory;

    protected $fillable = [

        'required_experience_id',
        'experience',
       

    ];
}
