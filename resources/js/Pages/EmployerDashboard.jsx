import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProfileCompletionBanner from '@/Components/ProfileCompletionBanner';
import EmployerDashboardInterface from '@/Components/EmployerDashboardInterface';
import { Head } from '@inertiajs/react';

export default function EmployerDashboard({ auth ,isOrgProfileExists}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        

                        { 
                          isOrgProfileExists ? (
                              
                               <>
                                    <EmployerDashboardInterface />
                               </>
                             

                          ) : (

                               <ProfileCompletionBanner role={auth.user.role} profile_name={auth.user.name}/>

                          )
                        
                        
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
