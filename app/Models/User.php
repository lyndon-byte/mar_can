<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'role',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [

        'email_verified_at' => 'datetime',
    ];

    public function resume(){

        return $this->hasOne(ApplicantResume::class,'resume_id');
    }

    public function contactInformation(){

        return $this->hasOne(ApplicantContactInfomation::class,'contact_id');
    }

    
    public function professionalSummary(){

        return $this->hasOne(ApplicantProfessionalSummary::class,'pro_summary_id');
    }

    public function workExperiences(){

        return $this->hasMany(ApplicantWorkExperiences::class,'work_exp_id');
    }

    public function educationalBackground(){

        return $this->hasMany(ApplicantEducationalBackGround::class,'educational_background_id');
    }

    public function certifications(){

        return $this->hasMany(ApplicantCertifications::class,'cert_id');
    }

    public function awards(){

        return $this->hasMany(ApplicantAwards::class,'award_id');
    }

    public function characterReferences(){

        return $this->hasMany(ApplicantCharacterReferences::class,'reference_id');
        
    }

    public function skills(){

        return $this->hasMany(ApplicantSkills::class,'skill_id');

    }


    public function languages(){

        return $this->hasMany(ApplicantSpokenLanguages::class,'language_id');

    }


    // Employer Related tables

    public function orgInformation(){

        return $this->hasOne(OrgInformation::class,'org_id');

    }

    public function orgIndustry(){

        return $this->hasOne(OrgIndustry::class,'org_industry_id');
    
    }
    
    public function postedJob(){

        return $this->hasMany(PostedJobs::class,'job_id');
    
    }

    public function messageThread(){

        return $this->hasMany(MessageThread::class,'thread_id');

    }
    

}
