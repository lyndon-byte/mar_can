<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ContentVision;
use App\Models\ContentAboutUs;
use App\Models\ContentMission;
use App\Models\ContentContactUs;
use App\Models\ContentJumbotron;

class ContentController extends Controller
{
    public function index(){


        $jumbotron_data =  ContentJumbotron::get()->first();

        $about_us_data =  ContentAboutUs::get()->first();

        $mission_data = ContentMission::get()->first();

        $vision_data = ContentVision::get()->first();

        $contact_data = ContentContactUs::get()->first();
       
        return Inertia::render('ContentManager',[

            'jumbotron_data' => $jumbotron_data,
            'about_us_data' =>  $about_us_data,
            'mission_data' =>  $mission_data,
            'vision_data' =>  $vision_data,
            'contact_data' => $contact_data

        ]);

    }

    public function editJumbotron(Request $request){

        $filename = '';

        if($request->hasFile('img')){

            $file = $request->file('img');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('content_img'), $filename);
        }
        
        if(ContentJumbotron::exists()){

            $jumbotron = ContentJumbotron::get()->first();
            
            $jumbotron->img_url = $filename !== '' ? $filename : $jumbotron->img_url;

            $jumbotron->brand = $request->brand_name;
            $jumbotron->slogan = $request->slogan;
            $jumbotron->description = $request->tagline;

            $jumbotron->save();
            
          
        }else{

            ContentJumbotron::create([

                'img_url' => $filename,
                'brand' => $request->brand_name,
                'slogan' => $request->slogan,
                'description' => $request->tagline,

            ]);

        }
         

    }

    public function deleteJumbotronImg(){

        $jumbotron = ContentJumbotron::get()->first();
            
        $jumbotron->img_url = '';

        $jumbotron->save();

        return redirect()->route('manage_content');
    }

    public function editAbout(Request $request){


        $filename = '';

        if($request->hasFile('img')){

            $file = $request->file('img');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('content_img'), $filename);
        }
        
        if(ContentAboutUs::exists()){

            $about_us = ContentAboutUs::get()->first();
            
            $about_us->image_url = $filename !== '' ? $filename : $about_us->image_url;

            $about_us->title = $request->title;

            $about_us->description = $request->description;
           

            $about_us->save();
            
          
        }else{

            ContentAboutUs::create([

                'image_url' => $filename,
                'title' => $request->title,
                'description' => $request->description,

            ]);

        }


    }

    public function deleteAboutImg(){

        $about_us = ContentAboutUs::get()->first();
            
        $about_us->image_url = '';

        $about_us->save();

        return redirect()->route('manage_content');
    }

    public function editMission(Request $request){

        $filename = '';

        if($request->hasFile('img')){

            $file = $request->file('img');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('content_img'), $filename);
        }
        
        if(ContentMission::exists()){

            $mission = ContentMission::get()->first();
            
            $mission->image_url = $filename !== '' ? $filename : $mission->image_url;

            $mission->description = $request->description;
           
            $mission->save();
            
          
        }else{

            ContentMission::create([

                'image_url' => $filename,
                'description' => $request->description,

            ]);

        }

    }

    public function deleteMissionImg(){

        $mission = ContentMission::get()->first();
            
        $mission->image_url = '';

        $mission->save();

        return redirect()->route('manage_content');
    }

    public function editVision(Request $request){

        
        $filename = '';

        if($request->hasFile('img')){

            $file = $request->file('img');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('content_img'), $filename);
        }
        
        if(ContentVision::exists()){

            $vision = ContentVision::get()->first();
            
            $vision->image_url = $filename !== '' ? $filename : $vision->image_url;

            $vision->description = $request->description;
           
            $vision->save();
            
          
        }else{

            ContentVision::create([

                'image_url' => $filename,
                'description' => $request->description,

            ]);

        }

    }

    public function deleteVisionImg(){

        $vision = ContentVision::get()->first();
            
        $vision->image_url = '';

        $vision->save();

        return redirect()->route('manage_content');
    }
   

    public function editContact(Request $request){

        if(ContentContactUs::exists()){

            $contact = ContentContactUs::get()->first();
            
            $contact->email = $request->email;

            $contact->office_address = $request->office_address;

            $contact->phone_number = $request->phone_number;
           
            $contact->save();
            
          
        }else{

            ContentContactUs::create([

                'email' => $request->email,
                'office_address' => $request->office_address,
                'phone_number' => $request->phone_number,

            ]);

        }


    }
}
