import { useEffect,useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Checkbox, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({type=''}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name:'',
        email: '',
        password: '',
        role:type,
        password_confirmation: '',
    });

    const [isAgreed,setIsAgreed] = useState(false);

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const [isVisiblePasswordConfirmation, setIsVisiblePasswordConfirmation] = useState(false);

    const [isOpenWarningModal,setIsOpenWarningModal] = useState(false);

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();


    const toggleVisibilityForPassword = () => setIsVisiblePassword(!isVisiblePassword)

    const toggleVisibilityForPasswordConfirmation = () => setIsVisiblePasswordConfirmation(!isVisiblePasswordConfirmation)

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = () => {
     
        if(isAgreed){

            post(route('register'));

        }else{

            setIsOpenWarningModal(true)

        }
      

    };

    return (
        <GuestLayout>

            

            <Head title="Register" />

            <Modal isOpen={isOpenWarningModal} onClose={setIsOpenWarningModal}>
                <ModalContent>
               
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-lg"></ModalHeader>
                        <ModalBody>
                            <p> 
                                You must agree first to marcan's Terms of Service, User agreement and privacy policy.  
                            </p>
                        </ModalBody>
                        <ModalFooter>
                        
                            <Button className='bg-slate-900 text-white' radius='sm' onPress={() => setIsOpenWarningModal(false)}>
                                Ok
                            </Button>
                        </ModalFooter>
                    </>
                
                </ModalContent>
            </Modal>


            <div>
                
                           
                    <h3 className='text-3xl text-slate-500 mt-4'> { type == 'Applicant' ? 'Sign up to find a job' : 'Sign up to hire an applicant' }</h3>

                
            </div>
           
                <div className='grid grid-cols-2 gap-2 mt-10'>
                    <div>
                        <InputLabel htmlFor="first name" value="First Name" />

                        <TextInput

                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('first_name', e.target.value)}
                            isInvalid={errors.first_name ? true : false}
                            errorMessage={errors.first_name}
                            isClearable
                            onClear={() => setData('first_name','')}
                        />

                     
                    </div>
                    <div>
                        <InputLabel htmlFor="last name" value="Last Name" />

                        <TextInput

                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('last_name', e.target.value)}
                            isInvalid={errors.last_name ? true : false}
                            errorMessage={errors.last_name}
                            isClearable
                            onClear={() => setData('last_name','')}
                        />

                       
                    </div>
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        isInvalid={errors.email ? true : false}
                        errorMessage={errors.email}
                        isClearable
                        onClear={() => setData('email','')}
                    />

                    
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                        isInvalid={errors.password ? true : false}
                        errorMessage={errors.password}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibilityForPassword}>
                              {isVisiblePassword ? (
                                <i class="fa-solid fa-eye text-slate-600"></i>
                              ) : (
                                <i class="fa-solid fa-eye-slash text-slate-600"></i>
                              )}
                            </button>
                        }
                        type={isVisiblePassword ? 'text' : 'password'}
                    
                    />

                   
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        isInvalid={errors.password_confirmation ? true : false}
                        errorMessage={errors.password_confirmation}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibilityForPasswordConfirmation}>
                              {isVisiblePasswordConfirmation ? (
                                <i class="fa-solid fa-eye text-slate-600"></i>
                              ) : (
                                <i class="fa-solid fa-eye-slash text-slate-600"></i>
                              )}
                            </button>
                        }
                        type={isVisiblePasswordConfirmation ? 'text' : 'password'}
                    />

                   
                </div>
                <Checkbox isSelected={isAgreed} color='success' className='mt-5' radius='sm' onValueChange={setIsAgreed}>
                    Yes, I understand and agree to the <Link className='text-green-500'>Marcan's Terms of Service</Link> including the <Link className='text-green-500'>User Agreement</Link> and <Link className='text-green-500'>Privacy Policy</Link> .
                </Checkbox>
                
                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Already registered?
                    </Link>

                    <Button onClick={() => submit()} color='success' radius='sm'  className="ms-4 text-white"  isLoading={processing}>
                        Register
                    </Button>
                </div>
           
        </GuestLayout>
    );
}
