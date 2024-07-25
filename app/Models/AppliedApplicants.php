<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppliedApplicants extends Model
{
    use HasFactory;

    protected $fillable = [

        'applicant_id',
        'user_id',
        'applicant_name',
        'status',
        'referrers_name'
    ];

    public function postedjob(){

        return $this->belongsTo(PostedJobs::class,'applicant_id');
    }

    public function applicantsAccount(){

        return $this->belongsTo(User::class,'user_id');
    }
}

