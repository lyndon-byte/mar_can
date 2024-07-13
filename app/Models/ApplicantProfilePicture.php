<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfilePicture extends Model
{
    use HasFactory;

    protected $fillable = [

        'profile_pic_id',
        'url'

    ];
}
