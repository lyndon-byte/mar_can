import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminContainer from '@/Components/AdminContainer';
import { Head, router } from '@inertiajs/react';
import { Button, Divider } from '@nextui-org/react';
import { useEffect,useState } from 'react';
import { Link } from '@inertiajs/react';
import LineChart from '@/Components/LineChart';

export default function SuperAdminDashboard({auth,applicants_data_count,employers_data_count,joblistings_data_count}){
    
   

    return (

        <AuthenticatedLayout
                
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Dashboard" />

              


                        <div className="py-12">

                                    <div className="mx-auto sm:px-6 lg:px-8">
                                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    
                                            <div class="mb-10 mt-8 px-6">
                                                <h1 class="text-2xl font-bold text-gray-700">Good Day Admin</h1>
                                                <p class="text-gray-500 mt-2">Here's an overview of  marcan's data</p>
                                                
                                            </div>

                                            
                                            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full px-6 mb-10">

                                            
                                            
                                                <div class="bg-white rounded-lg border p-6">
                                                    <i class="fa-solid text-3xl mt-1 fa-user text-success-500 float-end"></i>
                                                    <h2 class="text-3xl font-semibold text-gray-700">{applicants_data_count}</h2>
                                                    <p class="text-gray-500 mt-2">Total number of applicants</p>
                                                
                                                    <Divider className='mt-4'/>

                                                                <Button
                                                        
                                                                        href="/all-applicants"
                                                                        as={Link}
                                                                        variant="solid"
                                                                        className='mt-5 float-end text-white bg-slate-700'
                                                                        radius='sm'

                                                                        >
                                                                        View <i class="fa-solid fa-eye"></i>

                                                                </Button>
                                                                
                                                </div>
                                            
                                                <div class="bg-white rounded-lg border p-6">
                                                    <i class="fa-solid text-3xl mt-1 float-end text-success-500 fa-briefcase"></i>
                                                    <h2 class="text-3xl font-semibold text-gray-700">{employers_data_count}</h2>
                                                    <p class="text-gray-500 mt-2">Total number of employers</p>
                                                    <Divider className='mt-4'/>

                                                                <Button

                                                                        href="/all-employers"
                                                                        as={Link}
                                                                        variant="solid"
                                                                        className='mt-5 float-end text-white bg-slate-700'
                                                                        radius='sm'

                                                                        >
                                                                        View<i class="fa-solid fa-eye"></i>

                                                                </Button>

                                                </div>
                                                
                                                <div class="bg-white rounded-lg border p-6">
                                                    <i class="fa-solid fa-list text-3xl mt-1 float-end text-success-500"></i>
                                                    <h2 class="text-3xl font-semibold text-gray-700">{joblistings_data_count}</h2>
                                                    <p class="text-gray-500 mt-2">Total number of job listings</p>

                                                    <Divider className='mt-4'/>

                                                                    <Button

                                                                            href="/all-job-listings"
                                                                            as={Link}
                                                                            variant="solid"
                                                                            className='mt-5 float-end text-white bg-slate-700'
                                                                            radius='sm'

                                                                            >
                                                                            View<i class="fa-solid fa-eye"></i>

                                                                    </Button>

                                                </div>

                                                <div class="bg-white rounded-lg border p-6 md:col-span-2">
                                               
                                                    <i class="fa-solid fa-calendar-days text-3xl mt-1 float-end text-success-500"></i>
                                                    <h2 class="text-3xl font-semibold text-gray-700">88</h2>
                                                    <p class="text-gray-500 mt-2">Scheduled Interviews</p>

                                                    <Divider  className='mt-4 bg-success-500'/>

                                                                    <Button

                                                                            href=""
                                                                            as={Link}
                                                                            variant="solid"
                                                                            className='mt-28 float-end text-white bg-slate-700'
                                                                            radius='sm'

                                                                            >
                                                                            View<i class="fa-solid fa-eye"></i>

                                                                    </Button>

                                                </div>

                                                <div class="bg-white rounded-lg border p-6">

                                                    <LineChart/>                                                   

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                 </div>        


                 
               
                
        </AuthenticatedLayout>
    )


}