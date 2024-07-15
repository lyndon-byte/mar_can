<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ApplicantResume;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\ApplicantWorkExperiences;
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

        if($user->workExperiences()->exists()){

            $work_exp = $user->workExperiences()->get();
        }

        if($user->educationalBackground()->exists()){

            $educational_background = $user->educationalBackground()->get();
        }

        if($user->certifications()->exists()){

            $certificates = $user->certifications()->get();
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
            'cert_provider' => $request->provider,

        ]);

        return redirect()->route('employment.profile',['status' => 'certificate-added']);


    }
}
