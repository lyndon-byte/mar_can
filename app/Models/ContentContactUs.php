<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentContactUs extends Model
{
    use HasFactory;

    protected $fillable = [

        
        'email',
        'office_address',
        'phone_number'

    ];
}
