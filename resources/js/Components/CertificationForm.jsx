import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button , DatePicker , Tooltip } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";


export default function CertificationForm({certificates}) {

   
    const { data, setData, post, errors, processing } = useForm({

        cert_name: '',
        cert_code_reference: '',
        cert_provider: ''


    });

    const [isAddMode,setIsAddMode] = useState(false)


    function handleAddMode(){

        setIsAddMode(true)
        setData({

            cert_name: '',
            cert_code_reference: '',
            cert_provider: ''
        })
    }

    const submit = () => {
        
        post(route('add_certificate'),{preserveState: true, preserveScroll:true, onSuccess: () => {setIsAddMode(false)}});

    };

    return (
        <section>
            <header>
                <div className="text-lg font-medium text-gray-900">
                    Certifications
                    &nbsp;
                    {

                            isAddMode !== null && (
                            
                            
                                !isAddMode ? (

                                    <Tooltip content="Add educational background" className='bg-slate-800 text-white' radius='sm'>
                                        <Button
                                            className='border-0'
                                            variant='ghost'
                                            isIconOnly
                                            onPress={() => handleAddMode()}
                                        >
                                            <i class="fa-solid fa-plus"></i>
                                        </Button>
                                    </Tooltip>

                                ) : (
                                    
                                    <Tooltip content="View educational background" className='bg-slate-800 text-white' radius='sm'>
                                        <Button
                                            className='border-0'
                                            variant='ghost'
                                            isIconOnly
                                            onPress={() => setIsAddMode(false)}
                                        >
                                            <i class="fa-solid fa-eye"></i>
                                        </Button>
                                    </Tooltip>
                                )


                            
                        )

                    }
                </div>

                <p className="mt-1 text-sm text-gray-600">

                Certifications prove that you have specialized knowledge and skills in a particular area.

                </p>
            </header>

                {

                    certificates === null || isAddMode ? (

                        <>
                            
                            <div className="mt-3 grid grid-cols-3 gap-5">

                                <div>
                                    
                                    <InputLabel className='mt-2' htmlFor="certificate_name" value="Certificate Name" />

                                    <TextInput
                                        
                                        className="mt-1 block w-full"
                                        value={data.cert_name}
                                        onChange={(e) => setData('cert_name', e.target.value)}
                                        isInvalid={errors.cert_name ? true : false}
                                        errorMessage={errors.cert_name}
                                    />

                                </div>

                                
                                <div>
                                        <InputLabel  className='mt-2' htmlFor="certificate_id" value="Certificate ID (optional)" />

                                        <TextInput
                                        
                                            className="mt-1 block w-full"
                                            value={data.cert_code_reference}
                                            onChange={(e) => setData('cert_code_reference', e.target.value)}
                                            // isInvalid={errors.cert_code_reference ? true : false}
                                            // errorMessage={errors.cert_code_reference}
                                        />

                                        
                                </div>

                                <div>
                                        <InputLabel  className='mt-2' htmlFor="certificate_provider" value="Certificate Provider" />

                                        <TextInput
                                        
                                            className="mt-1 block w-full"
                                            value={data.cert_provider}
                                            onChange={(e) => setData('cert_provider', e.target.value)}
                                            isInvalid={errors.cert_provider ? true : false}
                                            errorMessage={errors.cert_provider}
                                        />

                                    
                                </div>

                                

                            </div>
                                    
                            <div className='grid justify-end'>
                                <Button 

                                    className='mt-10 max-w-sm text-white bg-slate-700' 
                                    radius='sm'  
                                    onPress={() => submit()}
                                    isLoading={processing}
                                >
                                    Save

                                </Button>
                            </div>
                                    
                        </>

                    ) : (

                        <>
                            
                            {

                                certificates.map((element) => (

                                    <>
                                        <div class="bg-white py-24 sm:py-32">
                                            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                                                
                                                <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                                    
                                                    <article class="flex max-w-xl flex-col items-start justify-between">
                                                        
                                                        <div class="group relative">
                                                        <h3 class="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                            
                                                           
                                                            {element.cert_name}
                                                            
                                                        </h3>
                                                        <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{element.cert_code_reference}</p>
                                                        </div>
                                                        <div class="relative mt-8 flex items-center gap-x-4">
                                                        
                                                        <div class="text-sm leading-6">
                                                          
                                                            <p class="text-gray-600">{element.cert_provider}</p>

                                                        </div>
                                                        </div>
                                                    </article>

                                                    
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                ))
                            }                        
                        </>

                    )


                }
                
                

                
        </section>
    );
}
