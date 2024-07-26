import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect , useState} from 'react';
import {Link, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,useDisclosure} from "@nextui-org/react";
import OrgInformationForm from '@/Components/OrgInformationForm';
import { router,Head } from '@inertiajs/react';

export default function OrgProfile({auth,org_info_data,org_industry_data,status}) {

    
    const [isOpenModal,setIsOpenModal] = useState(false)

    const [infoModalText,setInfoModalText] = useState('')

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    function handleInfoModalClose(){

        router.get('/organization-profile',{},{preserveState: true, preserveScroll:true, onSuccess: () => {setIsOpenModal(false)}})
        
    }

    // useEffect(() => {

    //     if(status === 'company-info-saved'){

    //         setIsOpenModal(true) 
    //         setInfoModalText('Company information was saved')
    //     }

        
    //     else if(status === 'company-info-deleted'){

    //         setIsOpenModal(true) 
    //         setInfoModalText('Deleted!')
    //     }


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
                >
                    <Head title="Organization Profile" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            
                            
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                                <OrgInformationForm org_industry={org_industry_data} info={org_info_data}/>

                            </div>

                            

                        </div>
                    </div>
                </AuthenticatedLayout>


      
        </>
    );
}
