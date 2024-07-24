<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\PostedJobs;
use Illuminate\Http\Request;
use App\Models\ApplicantAwards;
use App\Models\ApplicantResume;
use App\Models\ApplicantSkills;
use Illuminate\Support\Facades\Auth;
use App\Models\ApplicantCertifications;
use Illuminate\Support\Facades\Storage;
use App\Models\ApplicantSpokenLanguages;
use App\Models\ApplicantWorkExperiences;
use App\Models\ApplicantCharacterReferences;
use App\Models\ApplicantEducationalBackGround;


class ApplicantController extends Controller
{
    //

    public function index(Request $request){

        $status = '';

        $user = Auth::user();

        $resume = $user->resume()->get()->first();

        $contact_information = $user->contactInformation()->get()->first();

        $pro_summary = $user->professionalSummary()->get()->first();

        $work_exp = null;

        $educational_background = null;

        $certificates = null;

        $award = null;

        $skill = null;

        $character_referemce = null;

        $language = null;

        if($user->workExperiences()->exists()){

            $work_exp = $user->workExperiences()->get();
        }

        if($user->educationalBackground()->exists()){

            $educational_background = $user->educationalBackground()->get();
        }

        if($user->certifications()->exists()){

            $certificates = $user->certifications()->get();
        }

        if($user->awards()->exists()){

            $award = $user->awards()->get();
        }

        if($user->characterReferences()->exists()){

            $character_referemce = $user->characterReferences()->get();
        }

        if($user->skills()->exists()){

            $skill = $user->skills()->get();
        }

        if($user->languages()->exists()){

            $language = $user->languages()->get();
        }

        if($request->has('status')){

            $status = $request->status;
        }

        return Inertia::render('EmploymentProfile',[
 
            'resume' => $resume,
            'contact_information' => $contact_information,
            'proSummaryData' => $pro_summary,
            'work_exp_data' => $work_exp,
            'educational_background_data' => $educational_background, 
            'certificates_data' => $certificates,
            'character_reference_data' => $character_referemce,
            'award_data' => $award,
            'skill_data' => $skill,
            'language_data' => $language,
            'status' => $status,
            
        ]);
    }

    public function setResumeFile(Request $request){

        $user = Auth::user();

        $file = $request->file('pdf');
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('pdfs'), $filename);

        if($user->resume()->exists()){

            $user->resume()->update([

                'file_name' => $filename
            ]);

        }else{

            $user->resume()->create([

                'file_name' => $filename
            ]);

        }

      

        return redirect()->route('employment.profile',['status' => 'resume-saved']);
        
    }

    public function deleteResume()
    {
       

        $user_id = Auth::user()->id;

        ApplicantResume::where('resume_id',$user_id)->delete();

        return redirect()->route('employment.profile');

    }

    public function updateContactInformation(Request $request){

        $user = Auth::user();

        $request->validate([

            'full_name' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
            'street_address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'postal_code' => 'required',
            'country' => 'required',

        ]);


        if($user->contactInformation()->exists()){

            $user->contactInformation()->update([

                'full_name' => $request->full_name,
                'email_address' => $request->email,
                'phone_number' =>  $request->phone_number,
                'street_address' => $request->street_address,
                'city' => $request->city,
                'state' => $request->state,
                'postal_code' => $request->postal_code,
                'country' => $request->country,
            ]);

        }else{

            $user->contactInformation()->create([

                'full_name' => $request->full_name,
                'email_address' => $request->email,
                'phone_number' =>  $request->phone_number,
                'street_address' => $request->street_address,
                'city' => $request->city,
                'state' => $request->state,
                'postal_code' => $request->postal_code,
                'country' => $request->country,
            ]);

        }

        return redirect()->route('employment.profile',['status' => 'personal-info-saved']);
    }

    public function updateProfessionalSummary(Request $request){

        
        $user = Auth::user();

        $request->validate([

            'summary' => 'required'
        ]);

        if($user->professionalSummary()->exists()){

            $user->professionalSummary()->update([

                'summary' => $request->summary,
             
            ]);

        }else{

            $user->professionalSummary()->create([

                'summary' => $request->summary,
                
               
            ]);

        }

        return redirect()->route('employment.profile',['status' => 'pro-summary-info-saved']);
    }

    public function addWorkExperience(Request $request){

       

        $user = Auth::user();


        $request->validate([

            'job_title' => 'required',
            'company_name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
           

        ]);


        $start_date_month = $request->start_date['month'];

        $start_date_day = $request->start_date['day'];

        $start_date_year = $request->start_date['year'];

        $end_date_month = $request->end_date['month'];

        $end_date_day = $request->end_date['day'];

        $end_date_year = $request->end_date['year'];

        $user->workExperiences()->create([

            'job_title' => $request->job_title,
            'company_name' => $request->company_name,
            'employment_dates' => $start_date_month . ' / ' . $start_date_day . ' / ' . $start_date_year . ' - ' . $end_date_month . ' / ' . $end_date_day . ' / ' . $end_date_year
 
        ]);

        return redirect()->route('employment.profile',['status' => 'work-experience-saved']);

    }


    public function deleteWorkExperience(Request $request){

        ApplicantWorkExperiences::where('id',$request->id)->delete();

        return redirect()->route('employment.profile',['status' => 'work-experience-deleted']);
    }

    public function addEducationalBackground(Request $request){


        $user = Auth::user();

        $request->validate([

            'degree' => 'required',
            'school_name' => 'required',
            'graduation_date' => 'required',

        ]);

        
        $graduation_date_month = $request->graduation_date['month'];

        $graduation_date_day = $request->graduation_date['day'];

        $graduation_date_year = $request->graduation_date['year'];

        

        $user->educationalBackground()->create([

            'degree' => $request->degree,
            'school_name' => $request->school_name,
            'graduation_date' => $graduation_date_month . ' / ' . $graduation_date_day . ' / ' . $graduation_date_year

        ]);

        return redirect()->route('employment.profile',['status' => 'educational-background-added']);

    }

    public function deleteEducationalBackground(Request $request){

        ApplicantEducationalBackGround::where('id',$request->id)->delete();

        return redirect()->route('employment.profile',['status' => 'educational-background-deleted']);

    }

    public function addCertificate(Request $request){

        $user = Auth::user();

        $request->validate([

            'cert_name' => 'required',
            'cert_provider' => 'required',

        ]);

        $user->certifications()->create([

            'cert_name' => $request->cert_name,
            'cert_code_reference' => $request->cert_code_reference,
            'cert_provider' => $request->cert_provider,

        ]);

        return redirect()->route('employment.profile',['status' => 'certificate-added']);


    }

    public function deleteCertificate(Request $request){

        ApplicantCertifications::where('id',$request->id)->delete();

        return redirect()->route('employment.profile',['status' => 'certificate-deleted']);
    }

    public function addAward(Request $request){


        $user = Auth::user();

        $request->validate([

            'award_name' => 'required',
            'award_provider' => 'required',

        ]);

        $user->awards()->create([

            'award_name' => $request->award_name,
            'award_provider' => $request->award_provider,
            

        ]);

        return redirect()->route('employment.profile',['status' => 'award-added']);


    }

    public function deleteAward(Request $request){

        ApplicantAwards::where('id',$request->id)->delete();

        return redirect()->route('employment.profile',['status' => 'award-deleted']);
    }

    public function addCharacterReference(Request $request){


        $user = Auth::user();

        $request->validate([

            'name' => 'required',
            'contact_number' => 'required',
            'job' => 'required',
            'company' => 'required',

        ]);

        $user->characterReferences()->create([

            'name' => $request->name,
            'contact_number' => $request->contact_number,
            'job' => $request->job,
            'company' => $request->company,

        ]);

        return redirect()->route('employment.profile',['status' => 'character-reference-added']);


    }

    public function deleteCharacterReference(Request $request){

        ApplicantCharacterReferences::where('id',$request->id)->delete();

        return redirect()->route('employment.profile',['status' => 'character-reference-deleted']);
    }

    public function addSkill(Request $request){

        $user = Auth::user();

        $request->validate([

            'skill_name' => 'required',
            
        ]);

        foreach($request->skill_name as $skill){

            $user->skills()->create([

                'skill_name' => $skill,
              
    
            ]);
        }

        return redirect()->route('employment.profile',['status' => 'skill-added']);
    }

    public function deleteSkill(Request $request){

        ApplicantSkills::where('id',$request->id)->delete();

        return redirect()->route('employment.profile',['status' => 'skill-deleted']);
    }


    public function addLanguage(Request $request){


        $user = Auth::user();

        $request->validate([

            'language' => 'required',
            
        ]);

        foreach($request->language as $language){

            $user->languages()->create([

                'language' => $language,
              
    
            ]);
        }

        return redirect()->route('employment.profile',['status' => 'language-added']);


    }

    public function deleteLanguage(Request $request){

        ApplicantSpokenLanguages::where('id',$request->id)->delete();

        return redirect()->route('employment.profile',['status' => 'language-deleted']);

    }

    public function viewPostedJobFullDetails(Request $request){

        $job_data = PostedJobs::with(['user.orgInformation','responsibilities','requiredEducation','requiredExperiences','requiredSkills','requiredCertifications','benefits'])->findOrFail($request->id);

        return Inertia::render('JobApplicationForm',[
            
            'jobData' => $job_data

        ]);

    }
}
