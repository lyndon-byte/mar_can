<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ApplicantResume;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class ApplicantController extends Controller
{
    //

    public function index(Request $request){

        $status = '';

        $user = Auth::user();

        $resume = $user->resume()->get()->first();

        if($request->has('status')){

            $status = $request->status;
        }

        return Inertia::render('EmploymentProfile',[
 
            'resume' => $resume,
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

    public function SaveOrUpdateEmploymentProfile(Request $request){



    }
}
