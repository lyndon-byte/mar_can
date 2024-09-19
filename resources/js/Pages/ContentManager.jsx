import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Button,Tooltip } from '@nextui-org/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Editor from '@/Components/Editor';
import { useEffect,useState } from 'react';






export default function ContentManager({auth,jumbotron_data,about_us_data,mission_data,vision_data,contact_data,offer_data,milestone_data,testimonial_data}){
    
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
                                                            <Tooltip className='bg-slate-900 text-white' radius='sm' content="Done Editing">
                                                                <Button 

                                                                    className='float-end mb-5 border-0'
                                                                    variant='ghost'
                                                                    isIconOnly
                                                                    onClick={handleEditMode}
                                                                    color="success"
                                                                >
                                                                    <i class="fa-solid fa-check text-xl"></i>
                                                                </Button>
                                                            </Tooltip>
                                                            <Editor 

                                                                    jumbotron={jumbotron_data} 
                                                                    about={about_us_data} 
                                                                    mission={mission_data} 
                                                                    vision={vision_data} 
                                                                    contact={contact_data}
                                                                    offer={offer_data}
                                                                    testimonials={testimonial_data}
                                                                    milestone={milestone_data}

                                                            ></Editor>
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