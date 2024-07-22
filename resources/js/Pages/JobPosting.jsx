import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobPostForm from '@/Components/JobPostForm';
export default function JobPosting({ auth,job_data }) {
    return (
        
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Job post</h2>}
        >
            <Head title="Job post" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                        
                    <JobPostForm jobData={job_data}/>
                       
                    
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
