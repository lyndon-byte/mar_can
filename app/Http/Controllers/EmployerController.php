<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
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
}
