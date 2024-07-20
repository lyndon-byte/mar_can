import { useState, useEffect} from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm,router } from '@inertiajs/react';

import { Button, Chip , Textarea , Tooltip, Select, SelectItem} from '@nextui-org/react';

export default function OrgInformationForm({info,org_industry}) {

    const [isEditMode,setIsEditMode] = useState(false)

    const [industries,setIndustries] = useState([])
 
    const { data, setData, post, errors, processing,reset } = useForm({

        company_name: '',
        org_overview: '',
        street_address: '',
        city: '',
        province: '',
        country: '',
        industry: [],
        size: '',
        
    });


    function handleEditMode(){
 
        setIsEditMode(true)

        setData({

           
            company_name: info.org_name,
            org_overview: info.org_overview,
            street_address: info.org_street,
            city: info.org_city,
            province: info.org_province,
            country: info.org_country,
            industry: data.industry,
            size: info.org_size,

        })

    }

    const handleDeleteIndustry = (id) => {

       
        router.post('/delete-industry',{id:id},{ preserveScroll:true, preserveState:true})

    };

    const handleSelectIndustry = (e) => {

        setData('industry',[...data.industry,e.anchorKey])

    }

    const submit = () => {

        post(route('update_org_profile_info'),{ preserveState:true,

            onSuccess: () => {
                
                setIsEditMode(false)
                reset('industry')
            
            }
            
        });

    };

    
    useEffect(() => {

        fetch('/industries.json')
        .then(response => response.json())
        .then(data => { setIndustries(data.industries) })
        .catch(error => console.error('Error fetching data:', error));

       
    }, []);


    

   
    return (
        <section>
            <header>

                <div className="text-lg font-medium text-gray-900">
                    Company Information 
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
                
              

            </header>
            {

                info === null || isEditMode ? (

                        <div className="mt-3 grid sm:grid-cols-2 grid-cols-1 gap-10">
                            <div>
                                <div>
                                    
                                        <InputLabel className='mt-2' htmlFor="company_name" value="Company Name" />

                                        <TextInput
                                        
                                            className="mt-1 block w-full"
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            isInvalid={errors.company_name ? true : false}
                                            errorMessage={errors.company_name}
                                        />
                                

                                </div>

                                <div>

                                       <Textarea
                                            
                                            variant="bordered"
                                            radius="sm"
                                            color="success"
                                            placeholder="Enter your company overview (Optional)"
                                            className="mt-5"
                                            value={data.org_overview}
                                            onChange={(e) => setData('org_overview',e.target.value) }
                                            isInvalid={errors.org_overview ? true : false}
                                            errorMessage={errors.org_overview}

                                        />

                                </div>

                                
                               


                    

                            </div>
                        <div>
                                
                                
                                <div>
                                        <InputLabel  className='mt-2' htmlFor="street_address" value="Street Address" />

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

                                            className="mt-1 block w-full"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            isInvalid={errors.city ? true : false}
                                            errorMessage={errors.city}
                                        />

                                
                                </div>

                            <div>

                                <InputLabel className='mt-2' htmlFor="province" value="Province" />

                                <TextInput

                                    
                                    className="mt-1 block w-full"
                                    value={data.province}
                                    onChange={(e) => setData('province', e.target.value)}
                                    isInvalid={errors.province ? true : false}
                                    errorMessage={errors.province}
                                    
                                    
                                />

                                

                            </div>

                            <div>

                                <InputLabel className='mt-2' htmlFor="country" value="Country" />

                                <TextInput

                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    isInvalid={errors.country ? true : false}
                                    errorMessage={errors.country}
                                
                                />

                            
                            </div>

                            <div >

                                
                                <div>
                                    <InputLabel className='mt-10 mb-1' htmlFor="state" value="Industry (Optional)" />

                                    
                                          <Select

                                                
                                                variant="bordered"
                                                isMultiline={true}
                                                selectionMode="multiple"
                                                radius='sm'
                                                placeholder="Select industries "
                                                color='success'
                                                classNames={{

                                                    base: "max-w-full",
                                                    trigger: "min-h-12 py-2",

                                                }}
                                                onSelectionChange={handleSelectIndustry}
                                              
                                            >
                                                { industries.map((industry) => (
                                                    
                                                    <SelectItem key={industry.name} textValue={industry.name}>

                                                        {industry.name}

                                                    </SelectItem>

                                                ))}

                                            </Select>
                                </div>
                                <div>
                                    
                                    <InputLabel className='mt-2' htmlFor="company_size" value="Company Size (Optional)" />

                                        <TextInput
                                            
                                            className="mt-1 block w-full"
                                            value={data.size}
                                            onChange={(e) => setData('size', e.target.value)}
                                            isInvalid={errors.size ? true : false}
                                            errorMessage={errors.size}
                                            placeholder="Enter estimated number of employees"

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
                    

                ) : (

                    <div className='p-4'>
                      
                        <div class="mt-6 border-t border-gray-100">
                            <dl class="divide-y divide-gray-100">

                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Company name</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.org_name}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Overview</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.org_overview !== null ? info.org_overview : 'no information was provided'}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Street address</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.org_street}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">City</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.org_city}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Province</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.org_province}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Country</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.org_country}</dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Industry</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {
                                        org_industry !== null ? (

                                            <>


                                                {


                                                    org_industry.map((item) => (

                                                        <Chip 
                                                            
                                                            className='text-white mx-1 bg-slate-700' 
                                                            onClose={() => handleDeleteIndustry(item.id)}
                                                        
                                                        >
                                                            {item.industry_name}
                                                            
                                                        </Chip>
                                                        
                                                    ))


                                                }
                                            
                                            </>

                                        ) : (


                                            <p>no information was provided</p>
                                        )
                                            

                                    }

                                  </dd>
                                </div>
                                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Company Size</dt>
                                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.org_size !== null ? info.org_size : 'no information was provided'}</dd>
                                </div>
                                
                              
                                
                            </dl>
                           
                        </div>
                        
                    </div>
                   
                )

            }
            
        </section>
    );
}
