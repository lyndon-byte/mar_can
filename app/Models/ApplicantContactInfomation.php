<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantContactInfomation extends Model
{
    use HasFactory;

    protected $fillable = [

        'contact_id',
        'full_name',
        'phone_number',
        'email_address',
        'street_address',
        'city',
        'state',
        'postal_code',
        'country',
      

    ];

}
