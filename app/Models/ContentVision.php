<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentVision extends Model
{
    use HasFactory;

    protected $fillable = [

        
        'image_url',
        'description'

    ];
}
