<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantEducationalBackGround extends Model
{
    use HasFactory;

    protected $fillable = [

        'educational_background_id',
        'degree',
        'school_name',
        'graduation_date',
        
    ];
}
