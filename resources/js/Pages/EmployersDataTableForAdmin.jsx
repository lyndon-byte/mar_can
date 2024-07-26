import React, { useState, useEffect ,useCallback} from 'react';
import { router, Head } from '@inertiajs/react';
import { Badge,Button, Input,Dropdown,DropdownItem,DropdownTrigger,DropdownMenu} from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,useDisclosure} from "@nextui-org/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { debounce } from 'lodash';




export default function EmployersDataTableForAdmin({auth,employers_data}){

   const [isLoading,setIsLoading] = useState(false)

   const [isOpenModal,setIsOpenModal] = useState(false)

   const [isOpenDeleteEmployerModal,setIsOpenDeleteEmployerModal] = useState(false)

   const [infoModalText,setInfoModalText] = useState('')

   const [employeeId,setEmployeeId] = useState('')

   const [filter,setFilter] = useState('Status');

   const [searchQuery, setSearchQuery] = useState('');
    
   const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

   const handleSearch = useCallback(debounce((query) => {

        setSearchQuery(query);
        router.visit(route('filter_all_employers', {filter: query}), {
            preserveScroll: true,
            preserveState: true
        });

    }, 100),[]);
    
//    function handleInfoModalClose(){

//         router.get('/dashboard',{},{preserveState: true, preserveScroll:true, onSuccess: () => {setIsOpenModal(false)}})
    
//    }
   
   function handleRedirecToAddNewJobForm (){

        router.get('/add-new-job',{},{onStart: () => { setIsLoading(true) }, onSuccess: () => {setIsLoading(false)}});

   }    


   function handlePageChange(page){

      router.get('/all-employers',{page},{preserveScroll: true, preserveState: true})

   }

   
   function handleViewPostedJob(id){

         router.get('/view-posted-job',{id:id},{preserveScroll: true, preserveState: true})

   }

   function handleDeleteEmployer(){

        router.post('/delete-employer',{id:employeeId},{preserveScroll: true, preserveState: true, 
            
            onSuccess: () => { 

               
                setIsOpenDeleteEmployerModal(false)
                
            }
        
     })

   }

   function handleSelectEmployerForDeletion(id){

        setEmployeeId(id)
        setIsOpenDeleteEmployerModal(true)
   }

   function handleViewEmployer(id){

        router.get('/view-specific-employer',{id:id},{preserveScroll: true, preserveState: true})
   }


   function formatDate(timestamp) {

        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;

  }


    return (

        <>

          <Modal isDismissable={false} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} >
            <ModalContent>
        
                <>
                <ModalHeader className="flex flex-col gap-1">Info</ModalHeader>
                <ModalBody>

                    <p> 
                        {infoModalText}
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


          <Modal isDismissable={false} isOpen={isOpenDeleteEmployerModal} onClose={() => setIsOpenDeleteEmployerModal(false)} >
            <ModalContent>
        
                <>
                <ModalHeader className="flex flex-col gap-1">Info</ModalHeader>
                <ModalBody>

                    <p> 
                        Do you want to delete this employer?
                    </p>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="default" className='bg-slate-800 text-white' radius='sm' onPress={() => handleDeleteEmployer()}>
                        Proceed
                    </Button>
                
                </ModalFooter>
                </>
            
            </ModalContent>
          </Modal>

         <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="All Employers" />

                <div className="py-12">

                    <div className="mx-auto sm:px-6 lg:px-8">

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        
        
                                <Table 
                                    aria-label="Example table with client side pagination"
                                    topContent={
                                        
                                    
                                        <>
                                            <div className='flex gap-2 text-gray-500'>
                                                    
                                                <Chip variant="bordered" className='p-4 text-md'>
                                                     Total Employers: <span className="text-gray-700 font-bold">{employers_data.total}</span>
                                                </Chip>
                                                    
                                            </div>
                                            <div className="flex flex-col gap-4 mb-2">

                                                <div className="flex justify-end gap-3 ">


                                                    <Input

                                                        isClearable
                                                        className="w-full sm:max-w-[44%]"
                                                        placeholder="Search employer using name or email..."
                                                        startContent={

                                                            <i class="fa-solid fa-magnifying-glass"></i>
                                                        }
                                                        value={searchQuery}
                                                        onClear={() => setSearchQuery('')}
                                                        onValueChange={handleSearch}
                                                        
                                                    />
                                                
                                                
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
                                            total={employers_data.last_page}
                                            initialPage={employers_data.current_page}
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

                                        <TableColumn key="ID">ID</TableColumn>
                                        <TableColumn key="FULL_NAME">Full Name</TableColumn>
                                        <TableColumn key="EMAIL">EMAIL</TableColumn>
                                        <TableColumn key="ROLE">ROLE</TableColumn>
                                        <TableColumn key="DATE">REGISTERED DATE</TableColumn>
                                        <TableColumn key="ACTIONS" className="">
                                            <div className="flex justify-end pr-16">ACTIONS</div>
                                        </TableColumn>

                                    </TableHeader>
                                        <TableBody
                                        
                                            items={employers_data.data}
                                            emptyContent={

                                                <p className='mt-5 text-center'>No applicants yet</p>
                                            }
                                        >

                                                {(item) => (

                                                    
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.id}</TableCell>
                                                        <TableCell>{item.name + " " + item.last_name}</TableCell>
                                                        <TableCell>{item.email}</TableCell>
                                                        <TableCell>{item.role}</TableCell>
                                                        <TableCell>{formatDate(item.created_at)}</TableCell>
                                                        <TableCell >

                                                                <div className="relative flex justify-end pr-5 items-center gap-2">
                                                                
                                                                
                                                                    <Tooltip content="View Organization profile" className="bg-slate-900 text-white">
                                                                        <Button
                                                                            variant="ghost"
                                                                            className="border-0"
                                                                            isIconOnly
                                                                            onPress={() => handleViewEmployer(item.id)}
                                                                        >
                                                                            <i class="fa-solid fa-eye"></i>
                                                                        </Button>
                                                                    </Tooltip>

                                                                    <Tooltip content="Edit Organization profile" className="bg-slate-900 text-white">
                                                                        <Button
                                                                            variant="ghost"
                                                                            className="border-0"
                                                                            isIconOnly
                                                                            onPress={() => handleViewEmployer(item.id)}
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
                                                                            onPress={() => handleSelectEmployerForDeletion(item.id)}
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
                
                                    
                                </div>
                            </div>
                        </div>
                        
                </AuthenticatedLayout>
                
        </>
    )

}