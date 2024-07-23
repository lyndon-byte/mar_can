<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\PostedJobs;
use App\Models\OrgIndustry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployerController extends Controller
{
    public function index(Request $request){

        $status = '';

        $org_info = null;

        $org_industry = null;

        $user = Auth::user();

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

    public function updateOrgProfileInfo(Request $request){

        

        $user = Auth::user();

        $request->validate([

            'company_name' => 'required',
            'street_address' => 'required',
            'city' => 'required',
            'province' => 'required',
            'country' => 'required'

        ]);

        
       
        if($request->industry !== null && $request->industry !== []){

            

            $user->orgIndustry()->delete();
           
                foreach($request->industry as $item){
        
                    $user->orgIndustry()->create([
        
                        'industry_name' => $item
                                
                ]);
        
            }
            


        }
       

        if($user->orgInformation()->exists()){

            $user->orgInformation()->update([

                'org_name' => $request->company_name,
                'org_overview' => $request->org_overview,
                'org_street' => $request->street_address,
                'org_city' => $request->city,
                'org_province' => $request->province,
                'org_country' => $request->country,
                'org_size' => $request->size,
            ]);

        }else{

            $user->orgInformation()->create([

                
                'org_name' => $request->company_name,
                'org_overview' => $request->org_overview,
                'org_street' => $request->street_address,
                'org_city' => $request->city,
                'org_province' => $request->province,
                'org_country' => $request->country,
                'org_size' => $request->size,


            ]);

        }

        return redirect()->route('org.profile',['status' => 'company-info-saved']);

        

    }

    public function deleteIndustry(Request $request){

        OrgIndustry::where('id',$request->id)->delete();

        return redirect()->route('org.profile',['status' => 'company-info-deleted']);
    }

    public function addNewJob(){

        return Inertia::render('JobPosting',[
            
            'job_data' => null

        ]);
    }

    public function saveNewJob(Request $request){

        
        $request->validate([

            'job_title' => 'required'

        ]);

       

        $start_date = '';

        if($request->start_date !== null){

            $start_date = $request->start_date['month'] . '/' . $request->start_date['day'] . '/' . $request->start_date['year'];
        }

        $user = Auth::user();

        $posted_jobs =  $user->postedJob()->create([

            'job_title' => $request->job_title,
            'job_description' => $request->job_description,
            'location' => $request->location,
            'salary' => $request->salary,
            'employment_type' => $request->employment_type,
            'start_date' => $start_date,
            'status' => 'active',


        ]);

        if($request->resposnsibility !== [] || $request->resposnsibility !== null){

            foreach($request->resposnsibility as $item){

                $posted_jobs->responsibilities()->create([

                    'responsibility' => $item['responsibility'],
                   
        
                ]);

            }
        }

        if($request->education !== [] || $request->education !== null){

            foreach($request->education as $item){

                $posted_jobs->requiredEducation()->create([

                    'education' => $item['education'],
                   
        
                ]);

            }
        }

        if($request->experiences !== [] || $request->experiences !== null){

            foreach($request->experiences as $item){

                $posted_jobs->requiredExperiences()->create([

                    'experience' => $item['experience'],
                   
        
                ]);

            }
        }

        if($request->skills !== [] || $request->skills !== null){

            foreach($request->skills as $item){

                $posted_jobs->requiredSkills()->create([

                    'skill' => $item['skill'],
                   
        
                ]);

            }
        }

        if($request->certifications !== [] || $request->certifications !== null){

            foreach($request->certifications as $item){

                $posted_jobs->requiredCertifications()->create([

                    'certification' => $item['certification'],
                   
        
                ]);

            }
        }

        if($request->benefits !== [] || $request->benefits !== null){

            foreach($request->benefits as $item){

                $posted_jobs->benefits()->create([

                    'benefit' => $item['benefit'],
                   
                ]);

            }
        }

        return redirect()->route('dashboard');
    }

    public function updateJob(Request $request){

       $request->validate([

            'job_title' => 'required'

        ]);

        $start_date = '';

        if($request->start_date !== null){

            $start_date = $request->start_date['month'] . '/' . $request->start_date['day'] . '/' . $request->start_date['year'];
        }

       

        $posted_jobs = PostedJobs::find($request->job_id);

        $posted_jobs->update([

            'job_title' => $request->job_title,
            'job_description' => $request->job_description,
            'location' => $request->location,
            'salary' => $request->salary,
            'employment_type' => $request->employment_type,
            'start_date' => $start_date,
            'status' => 'active',


        ]);

        if($request->resposnsibility !== [] || $request->resposnsibility !== null){

            $posted_jobs->responsibilities()->delete();

            foreach($request->resposnsibility as $item){

                $posted_jobs->responsibilities()->create([

                    'responsibility' => $item['responsibility'],
                   
        
                ]);

            }
        }

        if($request->education !== [] || $request->education !== null){

            $posted_jobs->requiredEducation()->delete();

            foreach($request->education as $item){

                $posted_jobs->requiredEducation()->create([

                    'education' => $item['education'],
                   
        
                ]);

            }
        }

        if($request->experiences !== [] || $request->experiences !== null){

            $posted_jobs->requiredExperiences()->delete();

            foreach($request->experiences as $item){

                $posted_jobs->requiredExperiences()->create([

                    'experience' => $item['experience'],
                   
        
                ]);

            }
        }

        if($request->skills !== [] || $request->skills !== null){

            $posted_jobs->requiredSkills()->delete();

            foreach($request->skills as $item){

                $posted_jobs->requiredSkills()->create([

                    'skill' => $item['skill'],
                   
        
                ]);

            }
        }

        if($request->certifications !== [] || $request->certifications !== null){

            $posted_jobs->requiredCertifications()->delete();
            
            foreach($request->certifications as $item){

                $posted_jobs->requiredCertifications()->create([

                    'certification' => $item['certification'],
                   
        
                ]);

            }
        }

        if($request->benefits !== [] || $request->benefits !== null){

            $posted_jobs->benefits()->delete();

            foreach($request->benefits as $item){

                $posted_jobs->benefits()->create([

                    'benefit' => $item['benefit'],
                   
                ]);

            }
        }
    
    }

    public function viewPostedJob(Request $request){

        // $job_data = PostedJobs::where('id',$request->id)->get()->first();

        $job_data = PostedJobs::with(['responsibilities','requiredEducation','requiredExperiences','requiredSkills','requiredCertifications','benefits'])->findOrFail($request->id);

        return Inertia::render('JobPosting',[
            
            'job_data' => $job_data

        ]);
       
    }

    public function deletePostedJob(Request $request){

       $posted_job = PostedJobs::find($request->id);

       $posted_job->responsibilities()->delete();

       $posted_job->requiredEducation()->delete();

       $posted_job->requiredExperiences()->delete();

       $posted_job->requiredSkills()->delete();

       $posted_job->requiredCertifications()->delete();

       $posted_job->benefits()->delete();

       $posted_job->delete();
    }

    public function filterJobs(Request $request){

        $user = Auth::user();

        $job_postings = PostedJobs::where('job_id', $user->id)
        ->where(function($query) use ($request) {
            $query->where('status', $request->filter)
                ->orWhere('job_title', 'LIKE', '%'.$request->filter.'%');
        })
        ->orderBy('updated_at', 'DESC')
        ->paginate(8);
        // $job_postings = PostedJobs::where('job_id',$user->id)->where('status',$request->filter)->orWhere('job_title','LIKE','%'.$request->filter.'%')->orderBy('created_at','DESC')->paginate(8);

        return Inertia::render('EmployerDashboard',[

            'isOrgProfileExists' => $user->orgInformation()->exists(),
            'jobPostings' =>  $job_postings
           
        ]);
    }
}
