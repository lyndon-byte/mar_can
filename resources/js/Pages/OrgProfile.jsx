import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect , useState} from 'react';
import {Link, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,useDisclosure} from "@nextui-org/react";
import { router,Head } from '@inertiajs/react';

export default function OrgProfile({auth}) {

    

    return (
        <>

      

        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Organization Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            Organization forms will show here
                    </div>

                    

                </div>
            </div>
        </AuthenticatedLayout>
      
        </>
    );
}
