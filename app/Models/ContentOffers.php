<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentOffers extends Model
{
    use HasFactory;

    protected $fillable = [

        'offer_name',
        'offer_description'
        
    ];
}
