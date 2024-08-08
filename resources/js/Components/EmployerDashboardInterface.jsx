import React, { useState, useEffect ,useCallback} from 'react';
import { router } from '@inertiajs/react';
import { Badge,Button, Input,Dropdown,DropdownItem,DropdownTrigger,DropdownMenu} from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,useDisclosure} from "@nextui-org/react";
import { debounce } from 'lodash';




export default function EmployerDashboardInterface({jobs,userInfo}){

   const [isLoading,setIsLoading] = useState(false)

   const [isOpenModal,setIsOpenModal] = useState(false)

   const [infoModalText,setInfoModalText] = useState('')

   const [filter,setFilter] = useState('Status');

   const [searchQuery, setSearchQuery] = useState('');
    
   const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

   const handleSearch = useCallback(debounce((query) => {

        setSearchQuery(query);
        router.visit(route('filter_jobs', {filter: query}), {
            preserveScroll: true,
            preserveState: true
        });

    }, 100),[]);
    
   function handleInfoModalClose(){

       if(userInfo.role !== 'SuperAdmin'){

            router.get('/dashboard',{},{preserveState: true, preserveScroll:true, onSuccess: () => {setIsOpenModal(false)}})

       }else{

         setIsOpenModal(false)

       }
    
   }
   
   function handleRedirecToAddNewJobForm (){

        router.get('/add-new-job',{},{onStart: () => { setIsLoading(true) }, onSuccess: () => {setIsLoading(false)}});

   }    


   function handlePageChange(page){

      router.get('/dashboard',{page},{preserveScroll: true, preserveState: true})

   }

   

   function handleViewPostedJob(id){

     router.get('/view-posted-job',{id:id},{preserveScroll: true, preserveState: true})

   }

   function handleDeletePostedJob(id){

        router.post('/delete-posted-job',{id:id},{preserveScroll: true, preserveState: true, 
            
            onSuccess: () => { 

                setInfoModalText('posted job was deleted')
                setIsOpenModal(true)
            }
        
     })

   }

   function handleViewApplicants(id){

        router.get('/applicants',{id:id},{preserveScroll: true, preserveState: true})
   }


   function setStatusFilter(e){

      
        setFilter(e.anchorKey)
        router.get('/filter-jobs',{filter: e.anchorKey},{preserveState: true});
   }


    return (

        <>

          <Modal isDismissable={false} isOpen={isOpenModal} onClose={() => handleInfoModalClose()} >
            <ModalContent>
        
                <>
                <ModalHeader className="flex flex-col gap-1">Info</ModalHeader>
                <ModalBody>

                    <p> 
                        {infoModalText}
                    </p>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="light" onPress={() => handleInfoModalClose()}>
                    ok
                    </Button>
                
                </ModalFooter>
                </>
            
            </ModalContent>
          </Modal>

          
        
          <Table 
            aria-label="Example table with client side pagination"
            topContent={
                
               
                <>
                   <div className='flex gap-2 text-gray-500'>
                            
                               {
                                    userInfo.role !== 'SuperAdmin' && (
                                        
                                        <>
                                             <Chip variant="bordered" className='p-4'>
                                                Posted jobs: <span className="text-gray-700 font-bold text-md">{jobs.total}</span>
                                            </Chip>
                                        
                                            <Chip variant="bordered" className='p-4'>
                                                Applicants who applied to the posted jobs: <span className="text-gray-700 font-bold text-md">0</span>
                                            </Chip>
                                        
                                        </>
                                    )

                               }
                            
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <div className="flex justify-between gap-3 items-end">
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%]"
                            placeholder="Search by job title..."
                            startContent={

                                <i class="fa-solid fa-magnifying-glass"></i>
                            }
                            value={searchQuery}
                            onClear={() => setSearchQuery('')}
                            onValueChange={handleSearch}
                        />
                        <div className="flex gap-3">
                            <Dropdown>
                                <DropdownTrigger className="hidden sm:flex" radius="sm">
                                    <Button endContent={<i class="fa-solid fa-chevron-down"></i>} variant="flat">
                                        {filter}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    
                                    aria-label="Table Columns"
                                    closeOnSelect={false}
                                    
                                    selectionMode="single"
                                    onSelectionChange={setStatusFilter}
                                >
                                 
                                    <DropdownItem key="active">
                                        Active
                                    </DropdownItem>

                                    <DropdownItem key="in-active">
                                        In-Active
                                    </DropdownItem>
                                    
                                </DropdownMenu>
                            </Dropdown>
            
                            {
                                    userInfo.role !== 'SuperAdmin' && (
                                        
                                        <>
                                            <Tooltip content="Add new job post" className="bg-slate-900 text-white">
                                                <Button 

                                                    className="bg-slate-800 text-white"
                                                    radius="sm" 
                                                    endContent={<i class="fa-solid fa-plus"></i>}
                                                    isLoading={isLoading}
                                                    onPress={() => handleRedirecToAddNewJobForm()}

                                                >
                                                    Add New
                                                </Button>
                                            </Tooltip>
                                        
                                        </>
                                    )

                            }
                           
                        </div>
                        </div>
                        
                    </div>
                </>
             
            }
            bottomContent={
                <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    total={jobs.last_page}
                    initialPage={jobs.current_page}
                    onChange={handlePageChange}
                />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px] p-5",

            }}
            isStriped 
            >
            <TableHeader>

                <TableColumn key="JOB">JOB TITLE</TableColumn>
                <TableColumn key="DESCRIPTION">DESCRIPTION</TableColumn>
                <TableColumn key="LOCATION">LOCATION</TableColumn>
                <TableColumn key="SALARY">SALARY</TableColumn>
                <TableColumn key="EMPLOYMENT">EMPLOYMENT TYPE</TableColumn>
                <TableColumn key="START">START DATE</TableColumn>
                <TableColumn key="STATUS">STATUS</TableColumn>
                <TableColumn key="ACTIONS" className="">
                    <div className="flex justify-end pr-16">ACTIONS</div>
                </TableColumn>

             </TableHeader>
                <TableBody
                   
                    items={jobs.data}
                    emptyContent={

                        <p className='mt-5 text-center'>No posted job yet</p>
                    }
                >

                        {(job) => (

                             
                            <TableRow key={job.id}>
                                <TableCell>{job.job_title}</TableCell>
                                <TableCell>{job.job_description}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.salary}</TableCell>
                                <TableCell>{job.employment_type}</TableCell>
                                <TableCell>{job.start_date}</TableCell>
                                <TableCell>{job.status}</TableCell>
                                <TableCell >

                                        <div className="relative flex justify-end  items-center gap-2">

                                            
                                            <Badge content={job.new_applied_applicant_count} isInvisible={job.new_applied_applicant_count != 0 ? false : true} color="danger" >
                                                <Tooltip content="View applicants who applied" className="bg-slate-900 text-white">
                                                    <Button
                                                        variant="ghost"
                                                        className="border-0"
                                                        onPress={() => handleViewApplicants(job.id)}
                                                        isIconOnly
                                                    >
                                                    <i class="fa-solid fa-user"></i>
                                                    </Button>
                                                </Tooltip>
                                            </Badge>
                                        
                                        
                                            <Tooltip content="View All Details" className="bg-slate-900 text-white">
                                                <Button
                                                    variant="ghost"
                                                    className="border-0"
                                                    isIconOnly
                                                    onPress={() => handleViewPostedJob(job.id)}
                                                >
                                                    <i class="fa-solid fa-eye"></i>
                                                </Button>
                                            </Tooltip>

                                            <Tooltip content="Edit Details" className="bg-slate-900 text-white">
                                                <Button
                                                    variant="ghost"
                                                    className="border-0"
                                                    isIconOnly
                                                    onPress={() => handleViewPostedJob(job.id)}
                                                >
                                                <i class="fa-solid fa-pen-to-square"></i>
                                                </Button>
                                            </Tooltip>

                                            <Tooltip content="Delete" className="bg-slate-900 text-white">
                                                <Button
                                                    variant="ghost"
                                                    className="border-0"
                                                    color="danger"
                                                    isIconOnly
                                                    onPress={() => handleDeletePostedJob(job.id)}
                                                >
                                                    <i class="fa-solid fa-trash"></i>
                                                </Button>
                                            </Tooltip>
                                            
                                     </div>
                                    

                                    </TableCell>
                                </TableRow>
                            

                            )


                        }

                        
                       
                        
                   
                  
                </TableBody>

            </Table>
                
                                    
          
                
        </>
    )

}