<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentJumbotron extends Model
{
    use HasFactory;

    protected $fillable = [

        'img_url',
        'brand',
        'slogan',
        'description'

    ];
}
