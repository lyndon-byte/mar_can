import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button , Textarea , Tooltip } from '@nextui-org/react';

export default function ProfessionalSummaryForm({proSummary}) {

   
    const { data, setData, post, errors, processing } = useForm({

        summary: ''

    });

    const [isEditMode,setIsEditMode] = useState(false);

    function handleEditMode(){

        setIsEditMode(true)
        setData({

            summary : proSummary.summary,
          
        })
    }

    const submit = () => {
       
        post(route('update_professional_summary'),{preserveState: true, preserveScroll:true, onSuccess: () => {setIsEditMode(false)}});
    };

    return (
        <section>
            <header>
                <div className="text-lg font-medium text-gray-900">
                    Professional Summary
                    &nbsp;
                    {

                        proSummary !== null && (
                            
                            <Tooltip content="Edit professional summary" className='bg-slate-800 text-white' radius='sm'>
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
                    It provides a brief overview of your skills, experience, and career goals. It serves as a snapshot of your professional profile, giving potential employers a quick insight.
                </p>
            </header>


                    {
                        proSummary === null || isEditMode ? (

                                <div className="mt-5">
                        
                      

                                        <div>
                                            <Textarea
                                            
                                                variant="bordered"
                                                radius="sm"
                                                color="success"
                                                placeholder="Enter your summary"
                                                className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                                                value={data.summary}
                                                onChange={(e) => setData('summary',e.target.value) }
                                                isInvalid={errors.summary ? true : false}
                                                errorMessage={errors.summary}
                                            />
                                        </div>
                                    
                                        <div className='grid justify-end'>

                                            <Button 

                                                className='mt-10  text-white bg-slate-700' 
                                                radius='sm'  
                                                onPress={() => submit()}
                                                isLoading={processing}                     
                                            >
                                            Save

                                            </Button>

                                        </div>
                       
                   
                        
                       
                                </div>


                        ) : (


                            <div class="mt-6 p-5 border-t border-gray-100">
                                <dl class="divide-y divide-gray-100">

                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Summary</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{proSummary.summary}</dd>
                                    </div>

                                </dl>
                            </div>
                        )

                    }
                  

                    
            
                    
            
        </section>
    );
}
