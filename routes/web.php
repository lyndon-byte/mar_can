<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApplicantController;

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

Route::get('/index', function () {


    $user = Auth::user();

    switch($user->role){

        case 'Applicant':

                return Inertia::render('ApplicantHome',[

                    'isProfileInformationExists' => $user->resume()->exists()

                ]);

            break;
            
        case 'Employer':

                return Inertia::render('EmployerDashboard');

            break;
        
        case 'Admin':
            
            break;
    }


    
})->middleware(['auth', 'verified'])->name('index');

Route::get('/employment-profile',[ApplicantController::class,'index'])->middleware(['auth', 'verified'])->name('employment.profile');

Route::post('/set-resume-file',[ApplicantController::class,'setResumeFile'])->middleware(['auth', 'verified'])->name('set_resume_file');

Route::post('/delete-resume',[ApplicantController::class,'deleteResume'])->middleware(['auth', 'verified'])->name('delete_resume');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
