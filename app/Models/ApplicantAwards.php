<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantAwards extends Model
{
    use HasFactory;

    protected  $fillable = [

        'award_id',
        'award_name',
        'award_provider'

    ];
}
