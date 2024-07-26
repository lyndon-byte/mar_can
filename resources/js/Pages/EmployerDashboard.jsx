import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProfileCompletionBanner from '@/Components/ProfileCompletionBanner';
import EmployerDashboardInterface from '@/Components/EmployerDashboardInterface';
import { useState, useEffect } from 'react';
import {Button,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { Head, router } from '@inertiajs/react';

export default function EmployerDashboard({ auth,isOrgProfileExists,jobPostings}) {

    const [isOpenModal,setIsOpenModal] = useState(false)

    const [infoModalText,setInfoModalText] = useState('')

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();


    // function handleInfoModalClose(){

    //     router.get('/dashboard',{},{preserveState: true, preserveScroll:true, onSuccess: () => {setIsOpenModal(false)}})
        
    // }

    // useEffect(() => {

    //     if(status === 'job-saved'){

    //         setIsOpenModal(true) 
    //         setInfoModalText('new job was posted')
            

    //     }
    //     console.log(status)
    // },[status])

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
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            

                            { 
                            isOrgProfileExists ? (
                                
                                <>
                                        <EmployerDashboardInterface userInfo={auth.user} jobs={jobPostings} />
                                </>
                                

                            ) : (

                                <ProfileCompletionBanner role={auth.user.role} profile_name={auth.user.name}/>

                            )
                            
                            
                            }
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
