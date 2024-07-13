<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantCertifications extends Model
{
    use HasFactory;

    protected $fillable = [

        'cert_id',
        'cert_name',
        'cert_code_reference',
        'cert_provider'

    ];
}
