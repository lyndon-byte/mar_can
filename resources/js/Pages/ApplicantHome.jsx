import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProfileCompletionBanner from '@/Components/ProfileCompletionBanner';
import JobListings from '@/Components/JobListings';
import { Link, Button } from "@nextui-org/react";

export default function ApplicantHome({ auth,isProfileInformationExists,isResumeExists ,jobData}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                   
                        { 
                        
                          isProfileInformationExists || isResumeExists  ? (
                              
                                <JobListings postedJobs={jobData}/>
                             

                          ) : (

                               <ProfileCompletionBanner role={auth.user.role} profile_name={auth.user.name}/>

                          )
                        
                        
                        }
                        
                        
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
