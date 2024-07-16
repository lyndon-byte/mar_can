import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage , router} from '@inertiajs/react';
import { Button , DatePicker, Tooltip } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";


export default function CharacterReferencesForm({character_reference}) {

   
    const { data, setData, post, errors, processing } = useForm({

        name: '',
        contact_number: '',
        job: '',
        company: ''

    });


    const [isAddMode,setIsAddMode] = useState(false)

    function handleAddMode(){

        setIsAddMode(true)
        setData({

            degree: '',
            school_name: ''
        })

    }

    function handleDeleteCharacterReference(id){

        router.post('/delete-character-reference',{id:id},{preserveState:true,preserveScroll:true})
    }

    const submit = () => {

          post(route('add_character_reference'),{preserveState: true, preserveScroll:true, onSuccess: () => {setIsAddMode(false)}});

    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Character References
                    &nbsp;
                    {

                        character_reference !== null && (
                            
                            
                                !isAddMode ? (

                                    <Tooltip content="Add character reference" className='bg-slate-800 text-white' radius='sm'>
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
                                    
                                    <Tooltip content="View character reference" className='bg-slate-800 text-white' radius='sm'>
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
                </h2>

                <p className="mt-1 text-sm text-gray-600">

                    References can vouch for your honesty, integrity, and ethical behavior, which are critical traits for any professional.

                </p>
                
            </header>

            {

                character_reference === null || isAddMode ? ( 

                    <>

                        <div className="mt-3 grid grid-cols-3 gap-5">

                                <div>
                                        <InputLabel  className='mt-2' htmlFor="name" value="Name" />

                                        <TextInput
                                        
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            isInvalid={errors.name ? true : false}
                                            errorMessage={errors.name}

                                        />

                                    
                                </div>


                                <div>

                                        <InputLabel  className='mt-2' htmlFor="number" value="Contact Number" />

                                        <TextInput

                                        
                                            className="mt-1 block w-full"
                                            value={data.contact_number}
                                            onChange={(e) => setData('contact_number', e.target.value)}
                                            isInvalid={errors.contact_number ? true : false}
                                            errorMessage={errors.contact_number}
                                        />
                                
                                    
                                </div>

                                <div>
                                    
                                    <InputLabel className='mt-2' htmlFor="job_title" value="Job title" />

                                    <TextInput
                                        
                                        className="mt-1 block w-full"
                                        value={data.job}
                                        onChange={(e) => setData('job', e.target.value)}
                                        isInvalid={errors.job ? true : false}
                                        errorMessage={errors.job}
                                        
                                    />

                                </div>


                                <div>

                                    <InputLabel className='mt-2' htmlFor="company name" value="Company Name" />

                                    <TextInput
                                    
                                        className="mt-1 block w-full"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        isInvalid={errors.company ? true : false}
                                        errorMessage={errors.company}
                                        
                                    />

                                </div>

                                </div>
                                    
                                <div className='grid justify-end'>
                                <Button 

                                    className='mt-10 max-w-sm text-white bg-slate-700' 
                                    radius='sm'             
                                    isLoading={processing}
                                    onPress={() => submit()}          
                                >
                                    Save

                                </Button>
                        </div>
                    
                    </>

                ) : (

                    <>
                        {

                            character_reference.map((element,index) => (



                                <div class="mt-6 p-5 border-t border-gray-100">
                                    <dl class="divide-y divide-gray-100">

                                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                
                                            <dt class="text-sm font-medium leading-6 text-gray-900">
                                        
                                                &nbsp;
                                            
                                                {index + 1 + '.'}
                                            
                                            </dt>
                                            <dd class="mt-1 sm:mt-0">
                                                <span className='leading-6 font-bold text-gray-700'>
                                                    {element.name} 
                                                </span>
                                                <br></br>
                                                <span className='leading-6 text-gray-700'>
                                                    {element.contact_number} 
                                                </span>
                                                <br></br>
                                                <span className='text-slate-700 '>
                                                    {element.job}
                                                </span>
                                                <br></br>
                                                <span className='text-gray-500 '>
                                                    {element.company}
                                                </span>
                                                

                                            </dd>
                                            <dd class="mt-1 sm:mt-0">

                                                <Tooltip content="Delete this character reference" className='bg-slate-800 text-white' radius='sm'>
                                                    <Button
                                                        className='border-0'
                                                        variant='ghost'
                                                        isIconOnly
                                                        color='danger'
                                                        onPress={() => handleDeleteCharacterReference(element.id)}
                                                    >
                                                        <i class="fa-solid fa-trash"></i>
                                                    </Button>
                                                </Tooltip>

                                            </dd>
                                            
                                        </div>

                                    </dl>
                                </div>

                            ))

                        }
                    </>

                )

            } 
                

                
        </section>
    );
}
