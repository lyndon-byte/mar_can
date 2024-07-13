<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantProfessionalSummary extends Model
{
    use HasFactory;

    protected $fillable = [

        'pro_summary_id',
        'summary'

    ];
}
