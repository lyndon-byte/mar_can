<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\PostedJobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\SuperAdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/nestor-aprechio',function(){

    return Inertia::render('Biography');

});

Route::get('/select-account-type',function(){

    return Inertia::render('AccountRegistrationType');

})->name('select_account_type');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {


    $user = Auth::user();

    // job posting per employer

    $job_postings = PostedJobs::where('job_id',$user->id)->orderBy('updated_at','DESC')->paginate(8);

   // show all job posting for all applicant

    $job_data = PostedJobs::with(['user.orgInformation','requiredExperiences','requiredSkills'])->orderBy('created_at','DESC')->paginate(8);

    // show counts for all data for super admin dashboard



    switch($user->role){

        case 'Applicant':

                return Inertia::render('ApplicantHome',[

                    'isResumeExists' => $user->resume()->exists(),
                    'isProfileInformationExists' => $user->contactInformation()->exists(),
                    'jobData' => $job_data

                ]);

            break;
            
        case 'Employer':

                return Inertia::render('EmployerDashboard',[

                    'isOrgProfileExists' => $user->orgInformation()->exists(),
                    'jobPostings' =>  $job_postings
                   
                ]);

            break;
        
        case 'SuperAdmin':

              return Inertia::render('SuperAdminDashboard',[

                  'applicants_data_count' =>  User::where('role','Applicant')->count(),
                  'employers_data_count' => User::where('role','Employer')->count(),
                  'joblistings_data_count' => PostedJobs::count(),
                   
              ]);
            
            break;
    }


    
})->middleware(['auth', 'verified'])->name('dashboard');


// Applicant Routes


Route::group(['middleware' => ['role:Applicant']], function () {
   

    Route::get('/employment-profile',[ApplicantController::class,'index'])->middleware(['auth', 'verified'])->name('employment.profile');

    Route::post('/set-resume-file',[ApplicantController::class,'setResumeFile'])->middleware(['auth', 'verified'])->name('set_resume_file');
    
    Route::post('/delete-resume',[ApplicantController::class,'deleteResume'])->middleware(['auth', 'verified'])->name('delete_resume');
    
    Route::post('/update-contact-information',[ApplicantController::class,'updateContactInformation'])->middleware(['auth', 'verified'])->name('update_contact_information');
    
    Route::post('/update-professional-summary',[ApplicantController::class,'updateProfessionalSummary'])->middleware(['auth', 'verified'])->name('update_professional_summary');
    
    Route::post('/add-work-experience',[ApplicantController::class,'addWorkExperience'])->middleware(['auth', 'verified'])->name('add_work_experience');
    
    Route::post('/delete-work-experience',[ApplicantController::class,'deleteWorkExperience'])->middleware(['auth', 'verified'])->name('delete_work_experience');
    
    Route::post('/add-educational-background',[ApplicantController::class,'addEducationalBackground'])->middleware(['auth', 'verified'])->name('add_educational_background');
    
    Route::post('/delete-educational-background',[ApplicantController::class,'deleteEducationalBackground'])->middleware(['auth', 'verified'])->name('delete_educational_background');
    
    Route::post('/add-certificate',[ApplicantController::class,'addCertificate'])->middleware(['auth', 'verified'])->name('add_certificate');
    
    Route::post('/delete-certificate',[ApplicantController::class,'deleteCertificate'])->middleware(['auth', 'verified'])->name('delete_certificate');
    
    Route::post('/add-award',[ApplicantController::class,'addAward'])->middleware(['auth', 'verified'])->name('add_award');
    
    Route::post('/delete-award',[ApplicantController::class,'deleteAward'])->middleware(['auth', 'verified'])->name('delete_award');
    
    Route::post('/add-character-reference',[ApplicantController::class,'addCharacterReference'])->middleware(['auth', 'verified'])->name('add_character_reference');
    
    Route::post('/delete-character-reference',[ApplicantController::class,'deleteCharacterReference'])->middleware(['auth', 'verified'])->name('delete_character_reference');
    
    Route::post('/add-skill',[ApplicantController::class,'addSkill'])->middleware(['auth', 'verified'])->name('add_skill');
    
    Route::post('/delete-skill',[ApplicantController::class,'deleteSkill'])->middleware(['auth', 'verified'])->name('delete_skill');
    
    Route::post('/add-language',[ApplicantController::class,'addLanguage'])->middleware(['auth', 'verified'])->name('add_language');
    
    Route::post('/delete-language',[ApplicantController::class,'deleteLanguage'])->middleware(['auth', 'verified'])->name('delete_language');

    Route::get('/view-posted-job-full-details',[ApplicantController::class,'viewPostedJobFullDetails'])->middleware(['auth', 'verified'])->name('view_posted_job_full_details');

    Route::post('/apply-to-job',[ApplicantController::class,'applyToJob'])->middleware(['auth', 'verified'])->name('apply_to_job');

    Route::get('/applied-jobs',[ApplicantController::class,'appliedJobs'])->middleware(['auth', 'verified'])->name('applied_jobs');

    Route::post('/delete-applied-job',[ApplicantController::class,'deleteAppliedjob'])->middleware(['auth', 'verified'])->name('delete_applied_job');

    Route::get('/filter-applied-jobs',[ApplicantController::class,'filterAppliedJobs'])->middleware(['auth', 'verified'])->name('filter_applied_jobs');

    

});


//End of Applicant Routes


// Employer Routes

Route::group(['middleware' => ['role:Employer']], function () {


    Route::get('/organization-profile',[EmployerController::class,'index'])->middleware(['auth', 'verified'])->name('org.profile');
    
    Route::post('/update-org-profile-info',[EmployerController::class,'updateOrgProfileInfo'])->middleware(['auth', 'verified'])->name('update_org_profile_info');
   
    Route::post('/delete-industry',[EmployerController::class,'deleteIndustry'])->middleware(['auth', 'verified'])->name('delete_industry');
   
    Route::get('/add-new-job',[EmployerController::class,'addNewJob'])->middleware(['auth', 'verified'])->name('add_new_job');

    Route::post('/save-new-job',[EmployerController::class,'saveNewJob'])->middleware(['auth', 'verified'])->name('save_new_job');

    Route::post('/update-job',[EmployerController::class,'updateJob'])->middleware(['auth', 'verified'])->name('update_job');

    Route::post('/delete-posted-job',[EmployerController::class,'deletePostedJob'])->middleware(['auth', 'verified'])->name('delete_posted_job');

    Route::get('/view-posted-job',[EmployerController::class,'viewPostedJob'])->middleware(['auth', 'verified'])->name('view_posted_job');

    Route::get('/filter-jobs',[EmployerController::class,'filterJobs'])->middleware(['auth', 'verified'])->name('filter_jobs');
  
    Route::get('/applicants',[EmployerController::class,'applicants'])->middleware(['auth', 'verified'])->name('applicants');

    Route::get('/view-employment-profile',[EmployerController::class,'viewEmploymentProfile'])->middleware(['auth', 'verified'])->name('view_employment_profile');

    Route::post('/set-application-status',[EmployerController::class,'setApplicationStatus'])->middleware(['auth', 'verified'])->name('set_application_status');

});


Route::group(['middleware' => ['role:SuperAdmin']], function () {


    Route::get('/all-applicants',[SuperAdminController::class,'showAllApplicants'])->middleware(['auth', 'verified'])->name('all_applicants');

    Route::get('/filter-all-applicants',[SuperAdminController::class,'filterAllApplicants'])->middleware(['auth', 'verified'])->name('filter_all_applicants');
    
    Route::get('/view-specific-applicant',[SuperAdminController::class,'viewSpecificApplcant'])->middleware(['auth', 'verified']);
    
    Route::post('/delete-applicant',[SuperAdminController::class,'deleteApplicant'])->middleware(['auth', 'verified']);

    Route::get('/all-employers',[SuperAdminController::class,'showAllEmployers'])->middleware(['auth', 'verified'])->name('all_employers');

    Route::post('/delete-employer',[SuperAdminController::class,'deleteEmployer'])->middleware(['auth', 'verified']);

    Route::get('/filter-all-employers',[SuperAdminController::class,'filterAllEmployers'])->middleware(['auth', 'verified'])->name('filter_all_employers');

    Route::get('/view-specific-employer',[SuperAdminController::class,'viewSpecificEmployer'])->middleware(['auth', 'verified']);

    Route::get('/all-job-listings',[SuperAdminController::class,'showAllJobListings'])->middleware(['auth', 'verified'])->name('all_jobs');

    Route::get('/manage-content',[ContentController::class,'index'])->middleware(['auth', 'verified'])->name('manage_content');
    
    Route::post('/edit-jumbotron',[ContentController::class,'editJumbotron'])->middleware(['auth', 'verified'])->name('edit_jumbotron');

    Route::post('/delete-jumbotron-img',[ContentController::class,'deleteJumbotronImg'])->middleware(['auth', 'verified'])->name('delete_jumbotron_img');

    Route::post('/edit-about',[ContentController::class,'editAbout'])->middleware(['auth', 'verified'])->name('edit_about');

    Route::post('/delete-about-img',[ContentController::class,'deleteAboutImg'])->middleware(['auth', 'verified'])->name('delete_about_img');

    Route::post('/edit-mission',[ContentController::class,'editMission'])->middleware(['auth', 'verified'])->name('edit_mission');

    Route::post('/delete-mission-img',[ContentController::class,'deleteMissionImg'])->middleware(['auth', 'verified'])->name('delete_mission_img');

    Route::post('/edit-vision',[ContentController::class,'editVision'])->middleware(['auth', 'verified'])->name('edit_vision');

    Route::post('/delete-vision-img',[ContentController::class,'deleteVisionImg'])->middleware(['auth', 'verified'])->name('delete_vision_img');

    Route::post('/edit-contact',[ContentController::class,'editContact'])->middleware(['auth', 'verified'])->name('edit_contact');



});


//messaging route

Route::get('/messaging',[MessageController::class,'index'])->middleware(['auth', 'verified'])->name('messaging');
Route::get('/get-specific-thread-messages',[MessageController::class,'getSpecificThreadMessages'])->middleware(['auth', 'verified'])->name('get_specific_thread_messages');
Route::post('/send-message',[MessageController::class,'sendMessage'])->middleware(['auth', 'verified'])->name('send_message'); 
Route::post('/delete-thread',[MessageController::class,'deleteThread'])->middleware(['auth', 'verified'])->name('delete_thread'); 
Route::post('/archive-thread',[MessageController::class,'archiveThread'])->middleware(['auth', 'verified'])->name('archive_thread');
Route::post('/unarchive-thread',[MessageController::class,'unArchiveThread'])->middleware(['auth', 'verified'])->name('unarchive_thread'); 
Route::get('/get-archive-thread',[MessageController::class,'showArchivedThread'])->middleware(['auth', 'verified'])->name('get_archive_thread');
Route::get('/search-thread',[MessageController::class,'searchThread'])->middleware(['auth', 'verified'])->name('search_thread');



// End of Employer Routes


Route::get('/test-route',function(){

    return 'hello world';

})->middleware(['auth', 'verified','role:Employer']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
