import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Button , Tooltip} from '@nextui-org/react';

export default function ContactInformationForm({info}) {

    const [isEditMode,setIsEditMode] = useState(false)
   
    const { data, setData, post, errors, processing } = useForm({

        full_name: '',
        email: '',
        phone_number: '',
        street_address: '',
        city: '',
        state: '',
        postal_code:'',
        country: ''
        
    });

    function handleEditMode(){

        setIsEditMode(true)
        setData({

            full_name : info.full_name,
            email: info.email_address,
            phone_number: info.phone_number,
            street_address: info.street_address,
            city: info.city,
            state: info.state,
            postal_code: info.postal_code,
            country: info.country
        })
    }

    const submit = () => {

        post(route('update_contact_information'),{preserveScroll:true, preserveState:true, onSuccess: () => {setIsEditMode(false)}});

    };

    return (
        <section>
            <header>
                <div className="text-lg font-medium text-gray-900">
                    Personal Information 
                    &nbsp;
                    {

                        info !== null && (
                            
                            <Tooltip content="Edit personal information" className='bg-slate-800 text-white' radius='sm'>
                                <Button
                                    className='border-0'
                                    variant='ghost'
                                    isIconOnly
                                    onPress={() => handleEditMode()}
                                >
                                    <i class="fa-solid fa-pen"></i>
                                </Button>
                            </Tooltip>
                        )

                    }
                  
                </div>
                
                <p className="mt-1 text-sm text-gray-600">
                     Some informations here provides a way for potential employers to reach you easily for interviews, job offers, and follow-up questions
                </p>

            </header>
            {

                info === null || isEditMode ? (

                        <div className="mt-3 grid sm:grid-cols-2 grid-cols-1 gap-10">
                            <div>
                                <div>
                                    
                                    <InputLabel className='mt-2' htmlFor="full_name" value="Full Name" />

                                    <TextInput
                                    
                                        className="mt-1 block w-full"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        isInvalid={errors.full_name ? true : false}
                                        errorMessage={errors.full_name}
                                    />
                                

                                </div>

                                
                                <div>
                                        <InputLabel  className='mt-2' htmlFor="email_address" value="Email Address" />

                                        <TextInput
                                            
                                            className="mt-1 block w-full"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            isInvalid={errors.email ? true : false}
                                            errorMessage={errors.email}
                                        
                                        />

                                        
                                </div>

                                <div>
                                    <InputLabel className='mt-2' htmlFor="phone_number" value="Phone Number" />

                                    <TextInput

                                        className="mt-1 block w-full"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        isInvalid={errors.phone_number ? true : false}
                                        errorMessage={errors.phone_number}
                                    />

                                
                                </div>


                    

                            </div>
                        <div>
                            <div>
                                <InputLabel className='mt-2' htmlFor="street_address" value="Street Address" />

                                <TextInput

                                    
                                    className="mt-1 block w-full"
                                    value={data.street_address}
                                    onChange={(e) => setData('street_address', e.target.value)}
                                    isInvalid={errors.street_address ? true : false}
                                    errorMessage={errors.street_address}
                                    
                                />

                                

                            </div>

                            <div>

                                <InputLabel className='mt-2' htmlFor="city" value="City" />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    isInvalid={errors.city ? true : false}
                                    errorMessage={errors.city}
                                
                                />

                            
                            </div>

                            <div className='grid sm:grid-cols-3 grid-cols-1 gap-4'>
                                <div>
                                    <InputLabel className='mt-2' htmlFor="state" value="Province or State" />

                                        <TextInput
                                        
                                            className="mt-1 block w-full"
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                            isInvalid={errors.state ? true : false}
                                            errorMessage={errors.state}
                                        />

                                </div>
                                <div>
                                    <InputLabel className='mt-2' htmlFor="postal_code" value="Postal Code" />

                                        <TextInput
                                            
                                            className="mt-1 block w-full"
                                            value={data.postal_code}
                                            onChange={(e) => setData('postal_code', e.target.value)}
                                            isInvalid={errors.postal_code ? true : false}
                                            errorMessage={errors.postal_code}
                                        />

                                        
                                </div>

                                <div>
                                        <InputLabel className='mt-2' htmlFor="country" value="Country" />

                                        <TextInput
                                        
                                            className="mt-1 block w-full"
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            isInvalid={errors.country ? true : false}
                                            errorMessage={errors.country}
                                        />

                                </div>

                                
                            </div>

                            <Button 

                                className='float-end mt-10 text-white bg-slate-700' 
                                radius='sm'  
                                onPress={() => submit()} 
                                isLoading={processing}                    
                            >
                                Save 

                            </Button>
                            
                        </div>
                    </div>
                    

                ): (

                    <div className='p-4'>
                      
                        <div class="mt-6 border-t border-gray-100">
                            <dl class="divide-y divide-gray-100">

                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.full_name}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Phone number</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.phone_number}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.email_address}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Street Address</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.street_address}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">City</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.city}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">State</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.state}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Postal Code</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.postal_code}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Country</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.country}</dd>
                                </div>
                                
                              
                                
                            </dl>
                           
                        </div>
                        
                    </div>
                    
                )

            }
            
        </section>
    );
}
