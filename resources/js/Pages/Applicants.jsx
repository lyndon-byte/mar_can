import React, { useEffect, useState} from "react";
import {Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,useDisclosure} from "@nextui-org/react";
import { Badge, Input,Dropdown,DropdownItem,DropdownTrigger,DropdownMenu} from "@nextui-org/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,router } from '@inertiajs/react'

export default function Applicants({auth,applicants_data}){

    const [isOpenModal,setIsOpenModal] = useState(false)

    const [infoModalText,setInfoModalText] = useState('')

    const [filter,setFilter] = useState('Status');


    useEffect(() => {

        console.log(applicants_data.data[0].applicants)

    },[])

    function handlePageChange(page){

        router.get('/applicants',{page},{preserveScroll: true, preserveState: true})
  
     }

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


    function handleViewApplicant(id){

        router.get('/view-employment-profile',{id:id},{preserveScroll: true, preserveState: true})
    }

//    function setStatusFilter(e){

      
//         setFilter(e.anchorKey)
//         router.get('/filter-applied-jobs',{filter: e.anchorKey},{preserveState: true});
//     }

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

            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
            >
                <Head title="Applicants" />
                 
                <div className="py-12">
                    
                    <div className="mx-auto sm:px-6 lg:px-8">

                        <div className="p-4 sm:p-8  sm:rounded-lg">
                        <Table 
                            aria-label="Example table with client side pagination"
                            topContent={
                                
                            
                                <>
                                <div className='flex gap-2 text-gray-500'>
                                            
                                                <Chip variant="bordered" className='p-4'>
                                                 { applicants_data.data.job_title }  Applicants: <span className="text-gray-700 font-bold text-md">{applicants_data.total}</span>
                                                </Chip>
                                            
                                            
                                            
                                    </div>
                                    <div className="flex flex-col gap-4 mb-2">
                                        <div className="flex justify-end gap-3 items-end">
                                            {/* <Input
                                                isClearable
                                                className="w-full sm:max-w-[44%]"
                                                placeholder="Search by job title..."
                                                startContent={

                                                    <i class="fa-solid fa-magnifying-glass"></i>
                                                }
                                                value={searchQuery}
                                                onClear={() => setSearchQuery('')}
                                                onValueChange={handleSearch}
                                            /> */}
                                            <div className="flex  gap-3">
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
                                                        // onSelectionChange={setStatusFilter}
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
                                
                                            
                                                {/* <Tooltip content="Add new job post" className="bg-slate-900 text-white">
                                                    <Button 

                                                        className="bg-slate-800 text-white"
                                                        radius="sm" 
                                                        endContent={<i class="fa-solid fa-plus"></i>}
                                                        isLoading={isLoading}
                                                        onPress={() => handleRedirecToAddNewJobForm()}

                                                    >
                                                        Add New
                                                    </Button>
                                                </Tooltip> */}
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
                                    total={applicants_data.last_page}
                                    initialPage={applicants_data.current_page}
                                    onChange={handlePageChange}
                                />
                                </div>
                            }
                            classNames={{
                                wrapper: "min-h-[222px] p-10",

                            }}
                            isStriped 
                            >
                            <TableHeader>

                                <TableColumn key="FULL_NAME">Name</TableColumn>
                                <TableColumn key="APPLYING">APPLYING FOR</TableColumn>
                                <TableColumn key="STATUS">STATUS</TableColumn>
                                <TableColumn key="ACTIONS" className="">
                                    <div className="flex justify-end ">ACTION</div>
                                </TableColumn>

                            </TableHeader>
                                <TableBody
                                
                                    // items={applicants_data.data}
                                    emptyContent={

                                        <p className='mt-5 text-center'>No applied job yet</p>
                                    }
                                >

                                        {applicants_data.data.map((item,index) => (

                                            
                                            <TableRow >

                                                <TableCell>{item.applicants[index].applicant_name}</TableCell>
                                                <TableCell>{item.job_title}</TableCell>
                                               
                                                <TableCell>
                                                    
                                                    
                                                    {item.applicants[index].status}
                                                            
                                                
                                                    
                                                </TableCell>
                                                <TableCell >

                                                        <div className="relative flex justify-end  items-center ">

                                                            
                                                            

                                                            <Tooltip content="View Details" className="bg-slate-900 text-white">
                                                                <Button
                                                                    variant="ghost"
                                                                    className="border-0"
                                                                   
                                                                    isIconOnly
                                                                    onPress={() => handleViewApplicant(item.applicants[index].user_id)}
                                                                >
                                                                    <i class="fa-solid fa-eye"></i>
                                                                </Button>
                                                            </Tooltip>
                                                            
                                                        </div>
                                                    

                                                    </TableCell>
                                                </TableRow>
                                            

                                            ))


                                        }

                                        
                                    
                                        
                                
                                
                                </TableBody>

                            </Table>
                         </div>

                    </div>

                </div>
           </AuthenticatedLayout>
        </>
    )

}