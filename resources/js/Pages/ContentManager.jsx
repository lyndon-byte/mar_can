import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminContainer from '@/Components/AdminContainer';
import { Head, router } from '@inertiajs/react';
import { Button, Divider,Tooltip } from '@nextui-org/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useEffect,useState } from 'react';
import { Link } from '@inertiajs/react';





export default function ContentManager({auth}){
    
    const [isEditMode,setIsEditMode] = useState(false)

    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleOpen = () => {


        onOpen()

    }

    const handleEditMode = () => {

        setIsEditMode(!isEditMode)

    }

    return (

        <>
             <Modal 
                size="full"
                isOpen={isOpen} 
                onClose={onClose} 
              
            >
                <ModalContent>
                
                    <>
                        <ModalHeader className="flex flex-col gap-1">Full Screen Preview</ModalHeader>
                        <ModalBody
                       
                        >

                            <iframe src="/" width="100%" height="100%" style={{border: "none"}} ></iframe>

                        </ModalBody>
                        <ModalFooter>
                            {/* <Button color="danger" variant="light" onPress={onClose}>
                            Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                            Action
                            </Button> */}
                        </ModalFooter>
                    </>
            
                </ModalContent>
            </Modal>
            
            <AuthenticatedLayout
                
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Content Manager</h2>}
            >
                <Head title="Content Manager" />

              
                        <div className="py-12">

                                    <div className="mx-auto sm:px-6 lg:px-8">
                                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    
                                            <div class="mb-10 mt-8 px-6">
                                                
                                                <h1 class="text-2xl font-bold text-gray-700">Good Day Admin</h1>
                                                <p class="text-gray-500 mt-2 mb-5">Here's an overview of  marcan's landing page</p>
                                                
                                               

                                                <Tooltip className='bg-slate-900 text-white' radius='sm' content="full screen view">
                                                                <Button 

                                                                    className='float-end mb-5 border-0'
                                                                    variant='ghost'
                                                                    isIconOnly
                                                                    onClick={handleOpen}
                                                                
                                                                >
                                                                    <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                                                                </Button>
                                                 </Tooltip>

                                                

                                               
                                                {

                                                    isEditMode ? (

                                                        <>
                                                            <Tooltip className='bg-slate-900 text-white' radius='sm' content="save">
                                                                <Button 

                                                                    className='float-end mb-5 border-0'
                                                                    variant='ghost'
                                                                    isIconOnly
                                                                    // onClick={handleOpen}
                                                                
                                                                >
                                                                    <i class="fa-solid fa-floppy-disk text-xl"></i>
                                                                </Button>
                                                            </Tooltip>
                                                            <p>edit mode</p>
                                                        </>
                                                    ): (
                                                        

                                                        
                                                        <>
                                                          
                                                          <Tooltip className='bg-slate-900 text-white' radius='sm' content="edit">
                                                                <Button 

                                                                    className='float-end mb-5 border-0'
                                                                    variant='ghost'
                                                                    isIconOnly
                                                                    onClick={handleEditMode}
                                                                
                                                                >
                                                                    <i class="fa-solid fa-pen"></i>
                                                                </Button>
                                                            </Tooltip>
                                                            <iframe src="/" width="100%" height="600px" style={{border: "none"}}></iframe>

                                                        </>
                                                      
                                                    )
                                                }

                                            </div>

                                            
                                                                           

                                        </div>
                                    </div>

                                        
                         </div>
                                


                 
               
                
            </AuthenticatedLayout>
        </>

        
    )


}