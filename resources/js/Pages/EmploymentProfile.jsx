import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ResumePicker from '@/Components/ResumePicker';
import SavedResume from '@/Components/SavedResume';
import { Link, Button } from "@nextui-org/react";
import { useEffect , useState} from 'react';
import ContactInformationForm from '@/Components/ContactInformationForm';
import ProfessionalSummaryForm from '@/Components/ProfessionalSummaryForm';
import WorkExperienceForm from '@/Components/WorkExperienceForm';
import SkillsForm from '@/Components/SkillsForm';
import EducationalBackgroundFrom from '@/Components/EducationalBackgroundFrom';
import SpokenLanguagesForm from '@/Components/SpokenLanguagesForm';
import CertificationForm from '@/Components/CertificationForm';
import AwardsForm from '@/Components/AwardsForm';
import CharacterReferencesForm from '@/Components/CharacterReferencesForm';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,useDisclosure} from "@nextui-org/react";


export default function EmploymentProfile({status,auth,resume}) {

 const [isOpenModal,setIsOpenModal] = useState(false)

  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();


    useEffect(() => {

      

        if(status === 'resume-saved'){

            setIsOpenModal(true) 
        }

    },[status])

    return (
        <>

        <Modal isOpen={isOpenModal} onClose={setIsOpenModal} >
            <ModalContent>
        
                <>
                <ModalHeader className="flex flex-col gap-1">Info</ModalHeader>
                <ModalBody>
                    <p> 
                        Resume was saved
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
        >
            <Head title="Employment Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        {

                            resume !== null ? (

                                <SavedResume fileName={resume.file_name}/>
                                
                        
                            ): (

                                <ResumePicker/>
                            )

                        }

                     


                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <ContactInformationForm user={auth.user} />

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <ProfessionalSummaryForm/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <WorkExperienceForm/>

                    </div>

                    
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <EducationalBackgroundFrom/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <CertificationForm/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <AwardsForm/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <SkillsForm/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <SpokenLanguagesForm/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <CharacterReferencesForm/>

                    </div>

                    

                </div>
            </div>
        </AuthenticatedLayout>
      
        </>
    );
}
