<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantCharacterReferences extends Model
{
    use HasFactory;

    protected $fillable = [

        'reference_id',
        'name',
        'contact_number',
        'job',
        'company'

    ];
}
