<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentTestimonials extends Model
{
    use HasFactory;

    protected $fillable = [

        'avatar_img',
        'full_name',
        'testimony',
        'job',
        'workplace'
    ];
}
