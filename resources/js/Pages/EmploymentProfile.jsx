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
import { router } from '@inertiajs/react';

export default function EmploymentProfile({
    
        status,auth,
        resume,
        contact_information,
        proSummaryData,
        work_exp_data,
        educational_background_data,
        certificates_data,
        award_data,
        character_reference_data,
        skill_data,
        language_data

    }) {

    const [isOpenModal,setIsOpenModal] = useState(false)

    const [infoModalText,setInfoModalText] = useState('')

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    function handleInfoModalClose(){

        router.get('/employment-profile',{},{preserveState: true, preserveScroll:true, onSuccess: () => {setIsOpenModal(false)}})
        
    }

    useEffect(() => {

       

        if(status === 'resume-saved'){

            setIsOpenModal(true) 
            setInfoModalText('resume was saved')
           

        }
        
        else if(status === 'personal-info-saved'){

            setIsOpenModal(true) 
            setInfoModalText('personal information was saved')
            

        }

        else if (status === 'pro-summary-info-saved'){

            setIsOpenModal(true) 
            setInfoModalText('professional summary was saved')
        }

        else if (status === 'work-experience-saved'){

            setIsOpenModal(true) 
            setInfoModalText('work experience was saved')
        }

        else if (status === 'work-experience-deleted'){

            setIsOpenModal(true) 
            setInfoModalText('work experience was deleted')
        }

        else if (status === 'educational-background-deleted'){

            setIsOpenModal(true) 
            setInfoModalText('educational background was deleted')
        }

        else if (status === 'certificate-added'){

            setIsOpenModal(true) 
            setInfoModalText('certificate was added')

        }

        else if (status === 'certificate-deleted'){

            setIsOpenModal(true) 
            setInfoModalText('certificate was deleted')

        }

        else if (status === 'award-added'){

            setIsOpenModal(true) 
            setInfoModalText('award was added')

        }

        else if (status === 'award-deleted'){

            setIsOpenModal(true) 
            setInfoModalText('award was deleted')

        }
        
        else if (status === 'character-reference-added'){

            setIsOpenModal(true) 
            setInfoModalText('character reference was added')

        }
        
        else if (status === 'character-reference-deleted'){

            setIsOpenModal(true) 
            setInfoModalText('character reference was deleted')

        }

        else if (status === 'skill-added'){

            setIsOpenModal(true) 
            setInfoModalText('Skills was added')

        }

        else if (status === 'skill-deleted'){

            setIsOpenModal(true) 
            setInfoModalText('skill was deleted')

        }

        else if (status === 'language-added'){

            setIsOpenModal(true) 
            setInfoModalText('languages was added')

        }

        else if (status === 'language-deleted'){

            setIsOpenModal(true) 
            setInfoModalText('language was deleted')

        }
        

        

    },[status])

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

                        <ContactInformationForm info={contact_information}/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <ProfessionalSummaryForm proSummary={proSummaryData}/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <WorkExperienceForm work_exp={work_exp_data}/>

                    </div>

                    
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <EducationalBackgroundFrom educational_background={educational_background_data}/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <CertificationForm certificates={certificates_data}/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <AwardsForm awards={award_data}/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <SkillsForm skills={skill_data}/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <SpokenLanguagesForm languages={language_data}/>

                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                        <CharacterReferencesForm character_reference={character_reference_data}/>

                    </div>

                    

                </div>
            </div>
        </AuthenticatedLayout>
      
        </>
    );
}
