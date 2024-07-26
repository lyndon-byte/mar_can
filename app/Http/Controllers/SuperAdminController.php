<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\PostedJobs;
use Illuminate\Http\Request;

class SuperAdminController extends Controller
{
    public function showAllApplicants(){

        $applicants = User::where('role','Applicant')->orderBy('created_at')->paginate(10);

        return Inertia::render('ApplicantsDataTableForAdmin',[

            'applicants_data' =>  $applicants

        ]);
    }

    public function filterAllApplicants(Request $request){

        if($request->filter != ''){

            $applicants = User::where('role', 'Applicant')
            ->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->filter . '%')
                      ->orWhere('email', 'LIKE', '%' . $request->filter . '%')
                      ->orWhere('last_name', 'LIKE', '%' . $request->filter . '%');
            })
            ->orderBy('created_at')
            ->paginate(10);

        }else{

            return redirect()->route('all_applicants');
        }

        return Inertia::render('ApplicantsDataTableForAdmin',[

            'applicants_data' =>  $applicants

        ]);
    }

    public function viewSpecificApplcant(Request $request){

        $status = '';

        $user = User::find($request->id);

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
    
    public function deleteApplicant(Request $request){

        $user = User::find($request->id);

        $user->resume()->delete();

        $user->contactInformation()->delete();

        $user->professionalSummary()->delete();

        $user->workExperiences()->delete();

        $user->educationalBackground()->delete();

        $user->certifications()->delete();

        $user->awards()->delete();

        $user->characterReferences()->delete();

        $user->skills()->delete();

        $user->languages()->delete();

        $user->delete();

        return redirect()->route('all_applicants');
    }

    public function showAllEmployers(){

        $employers = User::where('role','Employer')->orderBy('created_at')->paginate(10);

        return Inertia::render('EmployersDataTableForAdmin',[

            'employers_data' => $employers

        ]);

    }

    public function filterAllEmployers(Request $request){

        if($request->filter != ''){

            $employers = User::where('role', 'Employer')
            ->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->filter . '%')
                      ->orWhere('email', 'LIKE', '%' . $request->filter . '%')
                      ->orWhere('last_name', 'LIKE', '%' . $request->filter . '%');
            })
            ->orderBy('created_at')
            ->paginate(10);

        }else{

            return redirect()->route('all_employers');
        }

        return Inertia::render('EmployersDataTableForAdmin',[

            'employers_data' =>  $employers

        ]);

    }

    public function deleteEmployer(Request $request){

        $user = User::find($request->id);

        $user->orgInformation()->delete();

        $user->orgIndustry()->delete();

        $user->postedJob()->delete();

        $user->delete();


    }

    public function viewSpecificEmployer(Request $request){

        $status = '';

        $org_info = null;

        $org_industry = null;

        $user = User::find($request->id);

        if($user->orgInformation()->exists()){

            $org_info = $user->orgInformation()->get()->first();
        }

        if($user->orgIndustry()->exists()){

            $org_industry = $user->orgIndustry()->get();

        }

        if($request->has('status')){

            $status = $request->status;
        }

        return Inertia::render('OrgProfile',[

            'org_info_data' => $org_info,
            'org_industry_data' => $org_industry,
            'status' => $status

        ]);

    }

    public function showAllJobListings(){

       

        $job_postings = PostedJobs::orderBy('updated_at', 'DESC')->paginate(8);
        
        // $job_postings = PostedJobs::where('job_id',$user->id)->where('status',$request->filter)->orWhere('job_title','LIKE','%'.$request->filter.'%')->orderBy('created_at','DESC')->paginate(8);

        return Inertia::render('EmployerDashboard',[

            'isOrgProfileExists' => true,
            'jobPostings' =>  $job_postings
           
        ]);


    }

}
