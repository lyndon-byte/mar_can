<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantWorkExperiences extends Model
{
    use HasFactory;

    protected $fillable = [

        'work_exp_id',
        'job_title',
        'company_name',
        'location',
        'employment_dates',
    ];
}
