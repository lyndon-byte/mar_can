import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage , router} from '@inertiajs/react';
import { Button , Textarea ,Chip , Tooltip} from '@nextui-org/react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";


export default function SpokenLanguagesForm({languages}) {

   
    const [inputtedLanguage,setInputtedLanguage] = useState('')

    const { data, setData, post, errors, processing } = useForm({

        language: '',
    
    });

    function handleSetLanguage(){

        setData('language',[...data.language,inputtedLanguage])
        setInputtedLanguage('')
    }

    const handleRemoveLanguange = (languageToRemove) => {

       
        setData('language',data.language.filter(language => language !== languageToRemove ))


    };

    const [isAddMode,setIsAddMode] = useState(false)

    function handleAddMode(){

        setIsAddMode(true)
        setData({

            language: '',
            
        })

    }

    function handleDeleteLanguage(id){

        router.post('/delete-language',{id:id},{preserveState:true,preserveScroll:true})
    }

    const submit = () => {
        

        post(route('add_language'),{preserveScroll:true, preserveState:true, onSuccess: ()=> {setIsAddMode(false)}});

    };

    return (
        <section>
            <header>
                <div className="text-lg font-medium text-gray-900">
                   
                   Spoken Languages
                   &nbsp;
                    {

                        languages !== null && (
                            
                            
                                !isAddMode ? (

                                    <Tooltip content="Add Language" className='bg-slate-800 text-white' radius='sm'>
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
                                    
                                    <Tooltip content="View Languages" className='bg-slate-800 text-white' radius='sm'>
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
                    Opens up opportunities in roles that specifically require language skills, such as translation, interpretation, customer service, and international business.
                </p>
            </header>
            {

                languages === null || isAddMode ? (

                    <div className="mt-3 grid ">
                

                          <div>
                                <Card 
                                        radius='sm' 
                                        className={errors.language ? 'w-full mt-2 border-2 shadow-none border-danger-400' : 'w-full mt-2 border-2 shadow-none'}
                                        classNames={{

                                            body: 'shadow-none'
                                        }}
                                    >
                                        
                        
                                        <CardBody className='p-5'>

                                            <div className='flex flex-wrap gap-2'>
                                                {
                                                    data.language.length != 0 ? (

                                                        <>
                                                            { data.language.map((element, index) => (
                                                                <Chip key={index} size="lg" onClose={() => handleRemoveLanguange(element)} color="success" className='text-slate-900' variant="flat">
                                                                {element}
                                                                </Chip>
                                                            ))}
                                                        </>

                                                    ) : (

                                                        <p className='text-slate-500'>No language entered yet</p>
                                                    )

                                                }
                                            </div>
                                        
                                            {/* <p className='text-slate-500'>No entered skills yet</p> */}
                                        </CardBody>
                                        <CardFooter  className='gap-2'>
                                        

                                            <TextInput
                                            
                                                className="text-slate-700 block max-w-sm"
                                                value={inputtedLanguage}
                                                onChange={(e) => setInputtedLanguage(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') handleSetLanguage(); }}
                                                label="Type your spoken language one by one and press enter."
                                            
                                                
                                            />

                                        </CardFooter>
                                    
                                    </Card>
                                    <p className='text-danger-400 mt-2'>{errors.language}</p>
                                    <Button 

                                        className='float-end mt-10 text-white bg-slate-700' 
                                        radius='sm'
                                        isLoading={processing}     
                                        onPress={() => submit()}                  
                                    >
                                    Save

                                    </Button>
                            </div>
                    
                        </div>

                ):(


                   
                    <>

                        <div className='gap-2 flex flex-wrap mt-3'>
                        { languages.map((element, index) => (
                                    <Chip key={index} size="lg"  onClose={() => handleDeleteLanguage(element.id)} className='text-slate-900' variant="flat">
                                            {element.language}
                                    </Chip>
                            ))}
                        </div>
                      
                    </>
                )
        }            
        </section>
    );
}
