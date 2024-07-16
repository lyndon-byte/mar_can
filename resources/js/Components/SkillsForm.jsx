import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage , router } from '@inertiajs/react';
import { Button , Textarea  } from '@nextui-org/react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Tooltip, Image,Chip} from "@nextui-org/react";


export default function SkillsForm({skills}) {

    const [inputtedskill,setInputtedskill] = useState('')

    const [isAddMode,setIsAddMode] = useState(false)
   
    const { data, setData, post, errors, processing } = useForm({

        skill_name: [],

        
    });

    function handkeSetSkill(){

        setData('skill_name',[...data.skill_name,inputtedskill])
        setInputtedskill('')
    }


    const handleRemoveSkill = (skillToRemove) => {

       
        setData('skill_name',data.skill_name.filter(skill => skill !== skillToRemove ))


    };

    

    function handleAddMode(){

        setIsAddMode(true)
        setData({

            skill_name: '',
            
        })

    }

    function handleDeleteSkill(id){

        router.post('/delete-skill',{id:id},{preserveState:true,preserveScroll:true})
    }



    const submit = () => {

       post(route('add_skill'),{preserveScroll:true, preserveState:true, onSuccess: ()=> {setIsAddMode(false)}});

    };

    return (
        <section>
            <header>
                <div className="text-lg font-medium text-gray-900">
                    Skills
                    &nbsp;
                    {

                        skills !== null && (
                            
                            
                                !isAddMode ? (

                                    <Tooltip content="Add skill" className='bg-slate-800 text-white' radius='sm'>
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
                                    
                                    <Tooltip content="View skills" className='bg-slate-800 text-white' radius='sm'>
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
                    It provides a clear and concise overview of your abilities, making it easier for employers to see what you bring to the table.
                </p>
            </header>

            <div className="mt-3 grid ">
                
                {

                    skills === null || isAddMode ? (

                        <>
                             <div>
                        
                      

                                    <Card 
                                        radius='sm' 
                                        className={errors.skill_name ? 'w-full mt-2 border-2 shadow-none border-danger-400' : 'w-full mt-2 border-2 shadow-none'}
                                        classNames={{

                                            body: 'shadow-none'
                                        }}
                                    >
                                        
                        
                                        <CardBody className='p-5'>

                                            <div className='flex flex-wrap gap-2'>
                                                {
                                                    data.skill_name.length != 0 ? (

                                                        <>
                                                            { data.skill_name.map((element, index) => (
                                                                <Chip key={index} size="lg" onClose={() => handleRemoveSkill(element)} color="success" className='text-slate-900' variant="flat">
                                                                {element}
                                                                </Chip>
                                                            ))}
                                                        </>

                                                    ) : (

                                                        <p className='text-slate-500'>No skills entered yet</p>
                                                    )

                                                }
                                            </div>
                                        
                                            {/* <p className='text-slate-500'>No entered skills yet</p> */}
                                        </CardBody>
                                        <CardFooter  className='gap-2'>
                                        

                                            <TextInput
                                            
                                                className="text-slate-700 block max-w-sm"
                                                value={inputtedskill}
                                                onChange={(e) => setInputtedskill(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') handkeSetSkill(); }}
                                                label="Type your skills one by one and press enter.






                                                "
                                            
                                                
                                            />

                                        </CardFooter>
                                    
                                    </Card>
                                    <p className='text-danger-400 mt-2'>{errors.skill_name}</p>
                                    <Button 

                                        className='float-end mt-10 text-white bg-slate-700' 
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
                            <div className='gap-2 flex flex-wrap mt-3'>
                              { skills.map((element, index) => (
                                        <Chip key={index} size="lg"  onClose={() => handleDeleteSkill(element.id)} className='text-slate-900' variant="flat">
                                                {element.skill_name}
                                        </Chip>
                                ))}
                            </div>
                              
                        </>
                    )
                }
                   

                    
            </div>
        </section>
    );
}
