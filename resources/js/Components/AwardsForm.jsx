import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm,router } from '@inertiajs/react';
import { Button , Tooltip} from '@nextui-org/react';


export default function AwardsForm({awards}) {

   
    const { data, setData, post, errors, processing } = useForm({

        award_name: '',
        award_provider: ''


    });

    const [isAddMode,setIsAddMode] = useState(false)


    function handleAddMode(){

        setIsAddMode(true)
        setData({

            award_name: '',
            award_provider: ''
        })

    }

    function handleDeleteAward(id){

        router.post('/delete-award',{id:id},{preserveState:true,preserveScroll:true})
    }

    const submit = () => {


        post(route('add_award'),{preserveState: true, preserveScroll:true, onSuccess: () => {setIsAddMode(false)}});

    };

    return (
        <section>
            <header>
                <div className="text-lg font-medium text-gray-900">
                    Awards
                    &nbsp;
                    {

                        awards !== null && (
                            
                            
                                !isAddMode ? (

                                    <Tooltip content="Add awards" className='bg-slate-800 text-white' radius='sm'>
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
                                    
                                    <Tooltip content="View awards" className='bg-slate-800 text-white' radius='sm'>
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

                        Awards demonstrate that your work has been recognized and appreciated by others, whether it be your employer, industry, or peers.

                </p>

            </header>

            
            {

                awards === null || isAddMode ? (

                    <>
                        <div className="mt-3 grid grid-cols-2 gap-5">

                            <div>
                                
                                <InputLabel className='mt-2' htmlFor="award_name" value="Award Name" />

                                <TextInput
                                    
                                    className="mt-1 block w-full"
                                    value={data.award_name}
                                    onChange={(e) => setData('award_name', e.target.value)}
                                    isInvalid={errors.award_name ? true : false}
                                    errorMessage={errors.award_name}
                                />

                            </div>

                            <div>
                                    <InputLabel  className='mt-2' htmlFor="award_provider" value="Award provider" />

                                    <TextInput
                                        
                                        
                                        className="mt-1 block w-full"
                                        value={data.award_provider}
                                        onChange={(e) => setData('award_provider', e.target.value)}
                                        isInvalid={errors.award_provider ? true : false}
                                        errorMessage={errors.award_provider}
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

                ): (

                    <>

                            {

                                awards.map((element,index) => (



                                    <div class="mt-6 p-5 border-t border-gray-100">
                                        <dl class="divide-y divide-gray-100">
        
                                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    
                                                <dt class="text-sm font-medium leading-6 text-gray-900">
                                            
                                                    &nbsp;
                                                    {index + 1 + '.'}
                                                </dt>
                                                <dd class="mt-1 sm:mt-0">

                                                    <span className='leading-6 font-bold text-gray-700'>
                                                        {element.award_name} 
                                                    </span>
                                                    <br></br>
                                                    <span className='text-slate-700 '>
                                                        {element.award_provider}
                                                    </span>

                                                </dd>
                                                <dd class="mt-1 sm:mt-0">

                                                    <Tooltip content="Delete this award" className='bg-slate-800 text-white' radius='sm'>
                                                        <Button
                                                            className='border-0'
                                                            variant='ghost'
                                                            isIconOnly
                                                            color='danger'
                                                            onPress={() => handleDeleteAward(element.id)}
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
