<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequiredCertifications extends Model
{
    use HasFactory;

    protected $fillable = [

        'required_certification_id',
        'certification',
      

    ];
}
