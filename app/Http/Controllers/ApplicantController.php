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

        $contact_information = $user->contactInformation()->get()->first();

        if($request->has('status')){

            $status = $request->status;
        }

        return Inertia::render('EmploymentProfile',[
 
            'resume' => $resume,
            'contact_information' => $contact_information,
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
}
