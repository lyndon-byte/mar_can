<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostedJobs extends Model
{
    use HasFactory;

    protected $fillable = [

        'job_id',
        'job_title',
        'job_description',
        'location',
        'salary',
        'employment_type',
        'work_schedule',
        'new_applied_applicant_count',
        'start_date',
        'status',



        

    ];

    public function responsibilities(){

        return $this->hasMany(Responsibilities::class,'responsibility_id');

    }


    public function requiredEducation(){


        return $this->hasMany(RequiredEducation::class,'required_education_id');
    }

    public function requiredExperiences(){

        return $this->hasMany(RequiredExperiences::class,'required_experience_id');
        
    }

    public function requiredSkills(){

        return $this->hasMany(RequiredSkills::class,'required_skill_id');
    }

    public function requiredCertifications(){

        return $this->hasMany(RequiredCertifications::class,'required_certification_id');
        
    }

    public function benefits(){

        return $this->hasMany(Benefits::class,'benefit_id');
    }

    public function applicants(){

        return $this->hasMany(AppliedApplicants::class,'applicant_id');
    }

    public function user(){

        return $this->belongsTo(User::class,'job_id');
    }

   
}
