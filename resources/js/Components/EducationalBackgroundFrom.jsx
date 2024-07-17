import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Button , DatePicker,Tooltip } from '@nextui-org/react';
import {today,getLocalTimeZone} from "@internationalized/date";
import { router } from '@inertiajs/react';


export default function EducationalBackgroundFrom({educational_background}) {

   
    const { data, setData, post, errors, processing } = useForm({

        degree: '',
        school_name: '',
        graduation_date: today(getLocalTimeZone()),


    });
    

    const [isAddMode,setIsAddMode] = useState(false)

    function handleAddMode(){

        setIsAddMode(true)
        setData({

            degree: '',
            school_name: ''
        })

    }

    function handleDeleteEducBackground(id){

        router.post('/delete-educational-background',{id:id},{preserveState:true,preserveScroll:true})
    }

    const submit = () => {
    

        post(route('add_educational_background'),{preserveState: true, preserveScroll:true, onSuccess: () => {setIsAddMode(false)}});


    };

    return (
        <section>
            <header>
                <div className="text-lg font-medium text-gray-900">
                    Educational Background
                    &nbsp;
                    {

                        educational_background !== null && (
                            
                            
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

                    Provides employers with a way to verify your qualifications and credentials.

                </p>
            </header>

                {

                    educational_background === null || isAddMode ? (

                        <>
                            <div className="mt-3 grid sm:grid-cols-3 gap-5">

                                <div>
                                    
                                    <InputLabel className='mt-2' htmlFor="degree" value="Degree" />

                                    <TextInput
                                    
                                        className="mt-1 block w-full"
                                        value={data.degree}
                                        onChange={(e) => setData('degree', e.target.value)}
                                        isInvalid={errors.degree ? true : false}
                                        errorMessage={errors.degree}
                                    />

                                </div>


                                <div>
                                        <InputLabel  className='mt-2' htmlFor="school_name" value="School Name" />

                                        <TextInput
                                            
                                            className="mt-1 block w-full"
                                            value={data.school_name}
                                            onChange={(e) => setData('school_name', e.target.value)}
                                            isInvalid={errors.school_name ? true : false}
                                            errorMessage={errors.school_name}
                                        />

                                    
                                </div>

                                <div>

                                    <InputLabel className='mt-2' htmlFor="graduation_date" value="Graduation date" />

                                    <DatePicker 
                                        className='mt-1' 
                                        radius='sm' 
                                        color='success' 
                                        variant="bordered" 
                                        showMonthAndYearPickers
                                        value={data.graduation_date}
                                        onChange={(value) => setData('graduation_date',value)}
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

                                educational_background.map((element) => (



                                    <div class="mt-6 p-5 border-t border-gray-100">
                                        <dl class="divide-y divide-gray-100">
        
                                            <div class="px-4 py-6 sm:text-start text-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    
                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                            
                                                    &nbsp;
                                                
                                                    {element.graduation_date}
                                                
                                                </dt>
                                                <dd class="mt-1 sm:mt-0">

                                                    <span className='leading-6 font-bold text-gray-700'>
                                                        {element.school_name} 
                                                    </span>
                                                    <br></br>
                                                    <span className='text-slate-700 '>
                                                        {element.degree}
                                                    </span>

                                                </dd>
                                                <dd class="mt-1 sm:mt-0">

                                                    <Tooltip content="Delete this educational background" className='bg-slate-800 text-white' radius='sm'>
                                                        <Button
                                                            className='border-0'
                                                            variant='ghost'
                                                            isIconOnly
                                                            color='danger'
                                                            onPress={() => handleDeleteEducBackground(element.id)}
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
