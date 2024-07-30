import React, { useEffect, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@nextui-org/react";
import {Head,router,useForm} from '@inertiajs/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,Link,useDisclosure} from "@nextui-org/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";


export default function JobApplicationForm({auth,jobData}){

    const [isOpenModal,setIsOpenModal] = useState(false)

    const [isOpenErrorModal,setIsOpenErrorModal] = useState(false)

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    const { data,setData,post,errors, processing } = useForm({

        id: jobData.id,
        referrers_name: '',
        contact: ''
    });

    function handleApplyToJob(){

        post(route('apply_to_job'))

    }

    useEffect(() => {

        console.log(jobData)

    },[])


    return (

        <>  

            <Modal isDismissable={false} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} >
                <ModalContent>
            
                    <>
                    <ModalHeader className="flex flex-col gap-1">Question</ModalHeader>
                    <ModalBody>

                        <p className="mb-2"> 

                            Did someone refer you? If so, please provide your referrer's name. If not, you can leave it blank.


                        </p>

                       
                        
                    </ModalBody>
                    <ModalFooter>

                        <Button color="default" className="bg-slate-800 text-white" radius="sm" isLoading={processing} onPress={() => handleApplyToJob()}>
                            proceed to application
                        </Button>
                    
                    </ModalFooter>
                    </>
                
                </ModalContent>
            </Modal>


            <Modal isDismissable={false} isOpen={errors.contact ? true : false} >
                <ModalContent>
            
                    <>
                    <ModalHeader className="flex flex-col gap-1">Info</ModalHeader>
                    <ModalBody>

                        <p className="mb-2"> 

                            {errors.contact}


                        </p>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button
                                
                                href="/employment-profile"
                                as={Link}
                                showAnchorIcon
                                variant="solid"
                                className='mt-4 text-white bg-slate-700'
                                radius='sm'

                                >
                                Fill Out Your Profile

                        </Button>
                    
                    </ModalFooter>
                    </>
                
                </ModalContent>
            </Modal>


            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
            >
                <Head title="Job Application" />
                
                <div className="py-12">
                    
                    <div className="mx-auto sm:px-6 lg:px-8">
                        

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                           

                           
                        

                    <div className='p-4'>

                        <div class="mt-6 border-t border-gray-100">
                            <dl class="divide-y divide-gray-100">
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Company</dt>
                                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.user.org_information.org_name}</dd>
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Job Title</dt>
                                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.job_title}</dd>
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Job Description</dt>
                                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.job_description}</dd>
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Location</dt>
                                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.location}</dd>
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Salary</dt>
                                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><i class="fa-solid fa-dollar-sign"></i> {jobData.salary}</dd>
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Employment Type</dt>
                                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.employment_type}</dd>
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Start Date</dt>
                                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.start_date}</dd>
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.status}</dd>
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Responsibilities</dt>
                                            {

                                                    jobData.responsibilities.length !== 0 ?  (

                                                        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                {

                                                                    jobData.responsibilities.map((item) => (
                                                                        
                                                                            <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                <div class="flex w-0 flex-1 items-center">
                                                                                    <i class="fa-solid fa-star-of-life"></i>
                                                                                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                        
                                                                                        <span class="truncate font-medium">{item.responsibility}</span>
                                                                                
                                                                                    </div>
                                                                                </div>

                                                                            </li>
                                                                        
                                                                                    
                                                                    ))
                                                                }
                                                                
                                                            </ul>
                                                        </dd>

                                                    ) : (

                                                        <>
                                                            <p className='text-gray-400'>No data provided</p>
                                                        </>

                                                    )


                                        }
                                        </div>

                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Required Education</dt>
                                            {

                                                jobData.required_education.length !== 0 ?  (

                                                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                            {

                                                                jobData.required_education.map((item) => (
                                                                    
                                                                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                            <div class="flex w-0 flex-1 items-center">
                                                                                <i class="fa-solid fa-star-of-life"></i>
                                                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                    
                                                                                    <span class="truncate font-medium">{item.education}</span>
                                                                            
                                                                                </div>
                                                                            </div>

                                                                        </li>
                                                                    
                                                                                
                                                                ))
                                                            }
                                                            
                                                        </ul>
                                                    </dd>

                                                ) : (

                                                    <>
                                                        <p className='text-gray-400'>No data provided</p>
                                                    </>

                                                )


                                            }
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Required Experiences</dt>
                                            {

                                                jobData.required_experiences.length !== 0 ?  (

                                                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                            {

                                                                jobData.required_experiences.map((item) => (
                                                                    
                                                                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                            <div class="flex w-0 flex-1 items-center">
                                                                                <i class="fa-solid fa-star-of-life"></i>
                                                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                    
                                                                                    <span class="truncate font-medium">{item.experience}</span>
                                                                            
                                                                                </div>
                                                                            </div>

                                                                        </li>
                                                                    
                                                                                
                                                                ))
                                                            }
                                                            
                                                        </ul>
                                                    </dd>

                                                ) : (

                                                    <>
                                                        <p className='text-gray-400'>No data provided</p>
                                                    </>

                                                )


                                            }
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Required Skills</dt>
                                            {

                                                    jobData.required_skills.length !== 0 ?  (

                                                        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                {

                                                                    jobData.required_skills.map((item) => (
                                                                        
                                                                            <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                <div class="flex w-0 flex-1 items-center">
                                                                                    <i class="fa-solid fa-star-of-life"></i>
                                                                                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                        
                                                                                        <span class="truncate font-medium">{item.skill}</span>
                                                                                
                                                                                    </div>
                                                                                </div>

                                                                            </li>
                                                                        
                                                                                    
                                                                    ))
                                                                }
                                                                
                                                            </ul>
                                                        </dd>

                                                    ) : (

                                                        <>
                                                            <p className='text-gray-400'>No data provided</p>
                                                        </>

                                                    )


                                            }
                                        </div>
                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Required Certifications</dt>
                                            {

                                                jobData.required_certifications.length !== 0 ?  (

                                                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                            {

                                                                jobData.required_certifications.map((item) => (
                                                                    
                                                                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                            <div class="flex w-0 flex-1 items-center">
                                                                                <i class="fa-solid fa-star-of-life"></i>
                                                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                    
                                                                                    <span class="truncate font-medium">{item.certification}</span>
                                                                            
                                                                                </div>
                                                                            </div>

                                                                        </li>
                                                                    
                                                                                
                                                                ))
                                                            }
                                                            
                                                        </ul>
                                                    </dd>

                                                ) : (

                                                    <>
                                                        <p className='text-gray-400'>No data provided</p>
                                                    </>

                                                )


                                            }
                                        </div>

                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt class="text-sm font-medium leading-6 text-gray-900">Benefits</dt>
                                            {

                                                jobData.benefits.length !== 0 ?  (

                                                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                            {

                                                                jobData.benefits.map((item) => (
                                                                    
                                                                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                            <div class="flex w-0 flex-1 items-center">
                                                                                <i class="fa-solid fa-star-of-life"></i>
                                                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                    
                                                                                    <span class="truncate font-medium">{item.benefit}</span>
                                                                            
                                                                                </div>
                                                                            </div>

                                                                        </li>
                                                                    
                                                                                
                                                                ))
                                                            }
                                                            
                                                        </ul>
                                                    </dd>

                                                ) : (

                                                    <>
                                                        <p className='text-gray-400'>No data provided</p>
                                                    </>

                                                )


                                            }
                                        </div>
                                        <div className="flex justify-end gap-2">
                                             
                                           

                                                <TextInput

                                                        className="block max-w-sm mt-10"
                                                        value={data.referrers_name}
                                                        onChange={(e) => setData('referrers_name', e.target.value)}
                                                        placeholder="Referrer's name (optional)"
                                                    
                                                />

                                                <Button 
                                                    className="mb-5 bg-slate-800 text-white mt-10" 
                                                    radius="sm" 
                                                    onPress={() => handleApplyToJob()}
                                                    isLoading={processing}
                                                >
                                                    Apply now<i class="fa-solid fa-paper-plane"></i>
                                                    
                                                </Button> 


                                        </div>  
                                    </dl>

                                    
                                
                                </div>

                               
                                
                            </div>
                                         

                        </div>  
                       
                        
                    </div>
                    
                </div>

               
            </AuthenticatedLayout>

                          
        
        </>
    )
}