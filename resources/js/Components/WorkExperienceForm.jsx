import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { Button , DatePicker , Tooltip } from '@nextui-org/react';
import {today,getLocalTimeZone} from "@internationalized/date";


export default function WorkExperienceForm({work_exp}) {

    const [addNewMode,setAddNewMode] = useState(false)
   
    const { data, setData, post, errors, processing ,reset } = useForm({

        job_title: '',
        company_name:'',
        start_date: today(getLocalTimeZone()),
        end_date: today(getLocalTimeZone())


    });

    function handleAddMode(){

        setAddNewMode(true)
        setData({

            job_title: '',
            company_name: ''
        })
    }

    function handleDeleteWorkExp(id){

        router.post('/delete-work-experience',{id:id},{preserveState:true,preserveScroll:true})
    }

    const submit = () => {
   

        post(route('add_work_experience'),{preserveState:true,preserveScroll:true ,onSuccess: () => setAddNewMode(false)});

    };

    return (
        <section>
            <header>
                <div className="text-lg font-medium text-gray-900">
                    Work Experiences
                    &nbsp;
                    {

                        work_exp !== null && (
                            
                            
                                !addNewMode ? (

                                    <Tooltip content="Add work experience" className='bg-slate-800 text-white' radius='sm'>
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
                                    
                                    <Tooltip content="View work experiences" className='bg-slate-800 text-white' radius='sm'>
                                        <Button
                                            className='border-0'
                                            variant='ghost'
                                            isIconOnly
                                            onPress={() => setAddNewMode(false)}
                                        >
                                            <i class="fa-solid fa-eye"></i>
                                        </Button>
                                    </Tooltip>
                                )


                            
                        )

                    }
                </div>

                <p className="mt-1 text-sm text-gray-600">

                    Demonstrates your ability to perform tasks and responsibilities similar to those required in the new role.

                </p>
            </header>

                {

                    work_exp === null || addNewMode ? (

                        <>
                        
                            <div className="mt-3 grid grid-cols-3 gap-5">

                                <div>
                                    
                                    <InputLabel className='mt-2' htmlFor="job_title" value="Job title" />

                                    <TextInput
                                    
                                        className="mt-1 block w-full"
                                        value={data.job_title}
                                        onChange={(e) => setData('job_title', e.target.value)}
                                        isInvalid={errors.job_title ? true : false}
                                        errorMessage={errors.job_title}
                                    />

                                </div>


                                <div>
                                        <InputLabel  className='mt-2' htmlFor="company_name" value="Company Name" />

                                        <TextInput
                                        
                                            className="mt-1 block w-full"
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            isInvalid={errors.company_name ? true : false}
                                            errorMessage={errors.company_name}
                                        />

                                        {/* <InputError className="mt-2" message={errors.email} /> */}
                                </div>

                                <div>

                                    <InputLabel className='mt-2' htmlFor="employment_dates" value="Start date" />

                                    <DatePicker 

                                        className='mt-1' 
                                        radius='sm' 
                                        color='success' 
                                        variant="bordered" 
                                        showMonthAndYearPickers
                                        value={data.start_date}
                                        onChange={(value) => setData('start_date',value)}
                                        isInvalid={errors.start_date ? true : false}
                                        errorMessage={errors.start_date}
                                    
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */}
                                </div>

                                <div>

                                    <InputLabel htmlFor="employment_dates" value="End date" />

                                    <DatePicker 

                                        className='mt-1' 
                                        radius='sm' 
                                        color='success' 
                                        variant="bordered" 
                                        showMonthAndYearPickers
                                        value={data.end_date}
                                        onChange={(value) => setData('end_date',value)}
                                        isInvalid={errors.end_date ? true : false}
                                        errorMessage={errors.end_date}
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */}

                                </div>

                                </div>
                                    
                                <div className='grid justify-end'>
                                    <Button 

                                        className='mt-10 max-w-sm  text-white bg-slate-700' 
                                        radius='sm'  
                                        onPress={() => submit()}   
                                        isLoading={processing}                  
                                    >
                                        Save

                                    </Button>
                                </div>
                                                        
                        
                        </>

                    ): (

                        <>

                            {

                                work_exp.map((element) => (



                                    <div class="mt-6 p-5 border-t border-gray-100">
                                        <dl class="divide-y divide-gray-100">
        
                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                       
                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                               
                                                    &nbsp;
                                                   
                                                    {element.employment_dates}
                                                
                                                </dt>
                                                <dd class="mt-1 sm:mt-0">

                                                    <span className='leading-6 font-bold text-gray-700'>
                                                         {element.job_title} 
                                                    </span>
                                                    <br></br>
                                                    <span className='text-slate-700 '>
                                                        {element.company_name}
                                                    </span>

                                                </dd>
                                                <dd class="mt-1 sm:mt-0">

                                                    <Tooltip content="Delete this work experience" className='bg-slate-800 text-white' radius='sm'>
                                                        <Button
                                                            className='border-0'
                                                            variant='ghost'
                                                            isIconOnly
                                                            color='danger'
                                                            onPress={() => handleDeleteWorkExp(element.id)}
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
