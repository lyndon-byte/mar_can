import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm, router} from '@inertiajs/react';
import { Button ,Tooltip } from '@nextui-org/react';


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

    function handleDeleteCertificate(id){

        router.post('/delete-certificate',{id:id},{preserveState:true,preserveScroll:true})
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

                            certificates !== null && (
                            
                            
                                !isAddMode ? (

                                    <Tooltip content="Add certificate" className='bg-slate-800 text-white' radius='sm'>
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
                                    
                                    <Tooltip content="View certificate" className='bg-slate-800 text-white' radius='sm'>
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
                            
                            <div className="mt-3 grid sm:grid-cols-3 gap-5">

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
                                                
                                                    <div class="mt-6 p-5 border-t border-gray-100">
                                                        <dl class="divide-y divide-gray-100">
                        
                                                            <div class="px-4 py-6 text-center sm:text-start sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    
                                                                <dt class="text-sm font-medium leading-6 text-slate-500">
                                                            
                                                                    &nbsp;
                                                                
                                                                    {element.cert_code_reference !== null ? element.cert_code_reference : 'no certificate code'}
                                                                
                                                                </dt>
                                                                <dd class="mt-1 sm:mt-0">

                                                                    <span className='leading-6 font-bold text-gray-700'>
                                                                        {element.cert_name} 
                                                                    </span>
                                                                    <br></br>
                                                                    <span className='text-slate-700 '>
                                                                        {element.cert_provider}
                                                                    </span>

                                                                </dd>
                                                                <dd class="mt-1 sm:mt-0">

                                                                    <Tooltip content="Delete this certificate" className='bg-slate-800 text-white' radius='sm'>
                                                                        <Button
                                                                            className='border-0'
                                                                            variant='ghost'
                                                                            isIconOnly
                                                                            color='danger'
                                                                            onPress={() => handleDeleteCertificate(element.id)}
                                                                        >
                                                                            <i class="fa-solid fa-trash"></i>
                                                                        </Button>
                                                                    </Tooltip>

                                                                </dd>
                                                                
                                                            </div>
                        
                                                        </dl>
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
