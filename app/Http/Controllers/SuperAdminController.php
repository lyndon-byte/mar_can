<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
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

            $applicants = User::where('name','LIKE','%'.$request->filter.'%')
                ->orWhere('email','LIKE','%'.$request->filter.'%')
                ->orWhere('last_name','LIKE','%'.$request->filter.'%')
                ->orderBy('created_at')
                ->paginate(10);
        }else{

            return redirect()->route('all_applicants');
        }

        return Inertia::render('ApplicantsDataTableForAdmin',[

            'applicants_data' =>  $applicants

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

        return Inertia::render('EmployersDataTableForAdmin');

    }

    public function showAllJobListings(){

        return Inertia::render('JobListingsDataForAdmin');


    }

}
