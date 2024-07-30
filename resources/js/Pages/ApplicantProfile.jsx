import React, { useEffect, useState} from "react";
import {Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,useDisclosure} from "@nextui-org/react";
import { Badge, Input,Dropdown,DropdownItem,DropdownTrigger,DropdownMenu} from "@nextui-org/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,router } from '@inertiajs/react'

export default function ApplicantProfile({auth,applicants_data,current_status}){

    const [isOpenModal,setIsOpenModal] = useState(false)

    const [infoModalText,setInfoModalText] = useState('')

    const [status,setStatus] = useState(current_status);



    useEffect(() => {

        console.log(applicants_data)

    },[])

    
    //  function handleInfoModalClose(){

    //     router.get('/applied-jobs',{},{preserveState: true, preserveScroll:true, onSuccess: () => {setIsOpenModal(false)}})
    
    //  }

    //  function handleDeleteAppliedJob(id,applied_job_id){

    //     router.post('/delete-applied-job',{id:id,applied_job_id:applied_job_id},{preserveScroll: true, preserveState: true, 
            
    //         onSuccess: () => { 

    //             setInfoModalText('application was cancelled and deleted')
    //             setIsOpenModal(true)
    //         }
        
    //     })

    // }


//     function handleViewApplicant(id){

//         router.get('/view-applicant',{id:id},{preserveScroll: true, preserveState: true})
//     }

   function setApplicationStatus(e){

      
        setStatus(e.anchorKey)
        router.post('/set-application-status',{status: e.anchorKey,id: applicants_data.id});
    }

    return (

        <>

        <Modal isDismissable={false} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} >
            <ModalContent>
        
                <>
                <ModalHeader className="flex flex-col gap-1">Info</ModalHeader>
                <ModalBody>

                    <p> 
                        If you are interested with this applicant, kindly contact the marcan admin through this email: test_email@marcan.org
                    </p>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="light" onPress={() => setIsOpenModal(false)}>
                    ok
                    </Button>
                
                </ModalFooter>
                </>
            
            </ModalContent>
          </Modal>

            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
            >
                <Head title="Applicant's Profile" />
                 
                <div className="py-12">
                    
                    <div className="mx-auto sm:px-6 lg:px-8">

                      <div className="p-4 sm:p-8 sm:rounded-lg">
                            
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                        <header>
                                            <div className="text-lg font-medium text-gray-900">


                                                Employment profile details
                                                <Dropdown>
                                                    <DropdownTrigger className="sm:flex float-end" radius="sm">
                                                        <Button endContent={<i class="fa-solid fa-chevron-down"></i>} variant="flat">
                                                            {status}
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        
                                                        aria-label="Table Columns"
                                                        closeOnSelect={false}
                                                        
                                                        selectionMode="single"
                                                        onSelectionChange={setApplicationStatus}
                                                    >
                                                    
                                                        <DropdownItem key="pending">
                                                            Pending
                                                        </DropdownItem>

                                                        <DropdownItem key="on-going">
                                                            On-going
                                                        </DropdownItem>

                                                        <DropdownItem key="successfull">
                                                            Successfull
                                                        </DropdownItem>

                                                        <DropdownItem key="rejected">
                                                            Rejected
                                                        </DropdownItem>
                                                        
                                                    </DropdownMenu>
                                                </Dropdown>
                                            
                                            </div>
                                            
                                           
                                        </header>

                                        <div className='p-4'>
                                        
                                            <div class="mt-6 border-t border-gray-100">
                                                <dl class="divide-y divide-gray-100">

                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants_data.contact_information.full_name}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Phone number</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                                                            
                                                           {

                                                            auth.user.role !== 'SuperAdmin' ? (
                                                                <>
                                                                     Hidden &nbsp;
                                                                    <Tooltip content="show" className="bg-slate-800 text-white">
                                                                        <Button onPress={() => setIsOpenModal(true)} isIconOnly variant="ghost" className="border-0"><i class="fa-solid fa-eye"></i></Button>
                                                                    </Tooltip>
                                                                </>
                                                               
                                                            ): (

                                                                <span className="text-gray-800">
                                                                      {applicants_data.contact_information.phone_number}
                                                                </span>
                                                              
                                                            )

                                                           }
                                                            
                                                        
                                                        </dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">

                                                        {

                                                            auth.user.role !== 'SuperAdmin' ? (
                                                                <>
                                                                     Hidden &nbsp;
                                                                     <Tooltip content="show" className="bg-slate-800 text-white">
                                                                        <Button onPress={() => setIsOpenModal(true)} isIconOnly variant="ghost" className="border-0"><i class="fa-solid fa-eye"></i></Button>
                                                                     </Tooltip>
                                                                </>
                                                            
                                                            ): (

                                                                <span className="text-gray-800">

                                                                    {applicants_data.contact_information.email_address}

                                                                </span>
                                                            
                                                            )

                                                        }

                                                            
                                                          
                                                            
                                                        
                                                        </dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Street Address</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants_data.contact_information.street_address}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">City</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants_data.contact_information.city}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">State</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants_data.contact_information.state}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Zip Code</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants_data.contact_information.postal_code}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Country</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants_data.contact_information.country}</dd>
                                                    </div>
                                                    
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Professional Summary</dt>
                                                        {

                                                            applicants_data.professional_summary !== null ?  (

                                                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants_data.professional_summary.summary}</dd>
                                                            
                                                            ): (

                                                                <p className='text-gray-400'>No data provided</p>

                                                            )
                                                         }
                                                       
                                                    </div>
                                                   

                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Work Experiences</dt>
                                                        {

                                                            applicants_data.work_experiences.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                                applicants_data.work_experiences.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 min-w-0  gap-2">
                                                                                                
                                                                                                <span class="truncate text-lg font-medium">{item.job_title}</span>
                                                                                                <br />
                                                                                                <span class="truncate font-medium">{item.company_name}</span>.
                                                                                                <br />
                                                                                                <span class="truncate ">{item.employment_dates}</span>
                                                                                                <br />
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
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Skills</dt>
                                                        {

                                                            applicants_data.skills.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                                applicants_data.skills.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                
                                                                                                <span class="truncate font-medium">{item.skill_name}</span>
                                                                                        
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
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Educational Background</dt>
                                                        {

                                                                applicants_data.educational_background.length !== 0 ?  (

                                                                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                            {

                                                                                applicants_data.educational_background.map((item) => (
                                                                                    
                                                                                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                            <div class="flex w-0 flex-1 items-center">
                                                                                                <i class="fa-solid fa-star-of-life"></i>
                                                                                                <div class="ml-4 min-w-0 flex-1 gap-2">
                                                                                                    
                                                                                                    
                                                                                                    <span class="truncate text-lg font-medium">{item.degree}</span>
                                                                                                    <br />
                                                                                                    <span class="truncate font-medium">{item.school_name}</span>.
                                                                                                    <br />
                                                                                                    <span class="truncate ">{item.graduation_date}</span>
                                                                                                    <br />
                                                                                            
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
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Spoken Languages</dt>
                                                        {

                                                            applicants_data.languages.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                                applicants_data.languages.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                
                                                                                                <span class="truncate font-medium">{item.language}</span>
                                                                                        
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
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Certifications</dt>
                                                        {

                                                            applicants_data.certifications.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                            applicants_data.certifications.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                
                                                                                                <span class="truncate font-medium">{item.cert_name}</span>
                                                                                        
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
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Awards</dt>
                                                        {

                                                            applicants_data.awards.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                            applicants_data.awards.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 min-w-0 flex-1 gap-2">
                                                                                                
                                                                                                <span class="truncate text-lg font-medium">{item.award_name}</span>
                                                                                                <br/>
                                                                                                <span class="truncate">{item.award_provider}</span>
                                                                                        
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

                                                    {/* <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Character References</dt>
                                                        {

                                                            applicants_data.character_references.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                                applicants_data.character_references.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 min-w-0  gap-2">
                                                                                                
                                                                                                <span class="truncate text-lg font-medium">{item.name}</span>
                                                                                                <br />
                                                                                                <span class="truncate font-medium">{item.contact_number}</span>.
                                                                                                <br />
                                                                                                <span class="truncate ">{item.employment_dates}</span>
                                                                                                <br />
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
                                                    </div> */}
                                                </dl>
                                            
                                            </div>
                                            
                                        </div>
                                    </div>      
                         </div>

                    </div>

                </div>
           </AuthenticatedLayout>
        </>
    )

}