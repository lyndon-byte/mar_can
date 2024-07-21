import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import {today,getLocalTimeZone} from "@internationalized/date";

import { Button , Card, Chip, CardHeader, CardBody, CardFooter, DatePicker, Textarea, Tooltip, Select, SelectItem, Listbox, ListboxItem} from '@nextui-org/react';

export default function JobPostForm({}) {

    const [isEditMode,setIsEditMode] = useState(false)


    const [inputtedResponsibilty,setInputtedResponsibilty] = useState('')

    const [inputtedEducation,setInputtedEducation] = useState('')

    const [inputtedExperience,setInputtedExperience] = useState('')

    const [inputtedSkill,setInputtedSkill] = useState('')

    const [inputtedCertification,setInputtedCertification] = useState('')

    const [inputtedBenefits,setInputtedBenefits] = useState('')

    
    const { data, setData, post, errors, processing } = useForm({

        job_title: '',
        job_description: '',
        location: '',
        salary: '',
        employment_type: '',
        work_schedule: '',
        start_date:today(getLocalTimeZone()),
        status: '',
        resposnsibility: [],
        education: [],
        experiences: [],
        skills: [],
        certifications: [],
        benefits: []
        
    });

    function handleSetResponsibility(){

        setData('resposnsibility',[...data.resposnsibility,inputtedResponsibilty])
        setInputtedResponsibilty('')
    }

    function handleSetEducation(){

        setData('education',[...data.education,inputtedEducation])
        setInputtedEducation('')
    }

    function handleSetExperience(){

        setData('experiences',[...data.experiences,inputtedExperience])
        setInputtedExperience('')
    }

    function handleSetSkill(){

        setData('skills',[...data.skills,inputtedSkill])
        setInputtedSkill('')
    }

    function handleSetCertification(){

        setData('certifications',[...data.certifications,inputtedCertification])
        setInputtedCertification('')
    }

    function handleSetBenefit(){

        setData('benefits',[...data.benefits,inputtedBenefits])
        setInputtedBenefits('')
    }


    
    const handleRemoveResponsibility = (responsibilityToRemove) => {

       
        setData('resposnsibility',data.resposnsibility.filter(resposnsibility => resposnsibility !== responsibilityToRemove ))


    };

    const handleRemoveEducation = (educationToRemove) => {

       
        setData('education',data.education.filter(education => education !== educationToRemove ))


    };
   
    const handleRemoveExperience = (experienceToRemove) => {

       
        setData('experiences',data.experiences.filter(experience => experience !== experienceToRemove ))


    };

    const handleRemoveSkill = (skillToRemove) => {

       
        setData('skills',data.skills.filter(skill => skill !== skillToRemove ))


    };


    const handleRemoveCertification = (certificateToRemove) => {

       
        setData('certifications',data.certifications.filter(certification => certification !== certificateToRemove ))


    };

    const handleRemoveBenefit = (benefitToRemove) => {

       
        setData('benefits',data.benefits.filter(benefit => benefit !== benefitToRemove ))


    };
   
   

    function handleEditMode(){

        setIsEditMode(true)
        setData({

            full_name : info.full_name,
            email: info.email_address,
            phone_number: info.phone_number,
            street_address: info.street_address,
            city: info.city,
            state: info.state,
            postal_code: info.postal_code,
            country: info.country
        })
    }

    const submit = () => {

        post(route('update_contact_information'),{preserveScroll:true, preserveState:true, onSuccess: () => {setIsEditMode(false)}});

    };

    return (
      <>
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <section>
                <header>
                    <div className="text-lg font-medium text-gray-900">
                        Add new job posting
                        {/* &nbsp;
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

                        } */}
                    
                    </div>
                    
                    <p className="mt-1 text-sm text-gray-600">
                        Detailed job postings improve the overall candidate experience. Candidates appreciate transparency and are more likely to engage with employers who provide clear and thorough information.
                    </p>

                </header>
            
                            <div className="mt-3 grid sm:grid-cols-2 grid-cols-1 gap-10">
                                <div>
                                    <div>
                                        
                                        <InputLabel className='mt-2' htmlFor="job_title" value="Job Title" />

                                        <TextInput
                                        
                                            className="mt-1 block w-full"
                                            value={data.job_title}
                                            onChange={(e) => setData('job_title', e.target.value)}
                                            isInvalid={errors.job_title ? true : false}
                                            errorMessage={errors.job_title}
                                        />
                                    

                                    </div>

                                    
                                    <div>
                                            <InputLabel  className='mt-2 mb-1' htmlFor="job_description" value="Job Description (Optional)" />

                                            <Textarea
                                                
                                                variant="bordered"
                                                radius="sm"
                                                color="success"
                                                className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                                                value={data.job_description}
                                                onChange={(e) => setData('job_description',e.target.value) }
                                                isInvalid={errors.job_description ? true : false}
                                                errorMessage={errors.job_description}
                                            />

                                            
                                    </div>

                                    <div>
                                        <InputLabel className='mt-2' htmlFor="location" value="Location (Optional)" />

                                        <TextInput

                                            className="mt-1 block w-full"
                                            value={data.phone_number}
                                            onChange={(e) => setData('phone_number', e.target.value)}
                                            isInvalid={errors.phone_number ? true : false}
                                            errorMessage={errors.phone_number}
                                        />

                                    
                                    </div>


                        

                                </div>
                            <div>
                                <div>
                                    <InputLabel className='mt-2' htmlFor="start_date" value="Start Date (Optional)" />

                                    <DatePicker 
                                            className='mt-1' 
                                            radius='sm' 
                                            color='success' 
                                            variant="bordered" 
                                            showMonthAndYearPickers
                                            minValue={today(getLocalTimeZone())}
                                            value={data.start_date}
                                            onChange={(value) => setData('start_date',value)}
                                        />
                                    

                                </div>

                                <div>

                                    <InputLabel className='mt-2' htmlFor="city" value="Salary (Optional)" />

                                    <TextInput
                                        
                                        startContent={

                                            <i class="fa-solid text-gray-400 fa-dollar-sign"></i>
                                        }
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        isInvalid={errors.city ? true : false}
                                        errorMessage={errors.city}
                                    
                                    />

                                
                                </div>

                                <div>

                                    <InputLabel className='mt-3 mb-1' htmlFor="employment_type" value="Employment Type (Optional)" />

                                    <Select 
                                        label="Select an employment type" 
                                        className="max-w-xs" 
                                        variant='bordered'
                                        color='success'
                                        radius='sm'
                                    >
                                        
                                        <SelectItem key="Full-time">
                                            Full Time
                                        </SelectItem>
                                        <SelectItem key="Part-time">
                                            Part Time
                                        </SelectItem>
                                        <SelectItem key="Contract">
                                            Contract
                                        </SelectItem>
                                        <SelectItem key="Temporary">
                                            Temporary
                                        </SelectItem>
                                        <SelectItem key="Internship">
                                            Internship
                                        </SelectItem>
                                        
                                    </Select>
                                


                                </div>
                                
                            </div>
                        </div>
                        

                
                    {/* 
                        <div className='p-4'>
                        
                            <div class="mt-6 border-t border-gray-100">
                                <dl class="divide-y divide-gray-100">

                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.full_name}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Phone number</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.phone_number}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.email_address}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Street Address</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.street_address}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">City</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.city}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">State</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.state}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Postal Code</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.postal_code}</dd>
                                    </div>
                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt class="text-sm font-medium leading-6 text-gray-900">Country</dt>
                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{info.country}</dd>
                                    </div>
                                    
                                
                                    
                                </dl>
                            
                            </div>
                            
                        </div>
                        
                    */}

                
                
            </section>

        </div>
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <header>
                    <div className="text-lg font-medium text-gray-900">
                        Add List of Responsibilities (Optional)
                    </div>
                    
                    <p className="mt-1 mb-4 text-sm text-gray-600">
                     Outlining responsibilities sets clear expectations for what the job will involve. This helps to prevent misunderstandings or surprises later in the hiring process or after hiring.
                    </p>

                 </header>
                    <Card 
                            radius='sm' 
                            className="mt-2 border-2 shadow-none border-danger-400' w-full"
                            classNames={{

                                body: 'shadow-none'
                            }}
                                    
                    >
                                        
                                <CardBody className='p-5'>

                                <Listbox
                                    aria-label="Actions"
                                    
                                    emptyContent={

                                        <p>List of responsibilities will show here</p>
                                    }
                                    
                                >
                                    {

                                        
                                              
                                        data.resposnsibility.map((element, index) => (
                                                                                        
                                                                                        
                                            <ListboxItem key={index}
                                                className="border rounded-md p-4"
                                              
                                                startContent={

                                                    <i class="fa-solid fa-star-of-life text-sm"></i>

                                                }
                                                endContent={

                                                    <Button
                                                        isIconOnly
                                                        variant='ghost'
                                                        color='danger'
                                                        className='border-none'
                                                        onPress={() => handleRemoveResponsibility(element)}
                                                    >
                                                        <i class="fa-solid fa-circle-xmark "></i>
                                                    </Button>

                                                }
                                            >
                                                {element}
                                            </ListboxItem>

                                        ))
                                            

                                        

                                    }
                                    
                                    
                                    </Listbox>


                                </CardBody>
                                        
                                <CardFooter  className='p-5'>
                                        
                                        <Textarea
                                            
                                            
                                            variant='bordered'
                                            radius='sm'
                                            className="text-slate-700 block max-w-full"
                                            value={inputtedResponsibilty}
                                            onChange={(e) => setInputtedResponsibilty(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSetResponsibility(); }}
                                            label="Type each item in the responsibilities list one by one and press enter."

                                         />

                                       

                        </CardFooter>
                                    
                    </Card>
        </div>        
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <header>
                    <div className="text-lg font-medium text-gray-900">
                        Required Educations (Optional)
                    </div>
                    
                    <p className="mt-1 mb-4 text-sm text-gray-600">

                        Outlining responsibilities sets clear expectations for what the job will involve. This helps to prevent misunderstandings or surprises later in the hiring process or after hiring.
                    
                    </p>

                 </header>
                    <Card 
                            radius='sm' 
                            className="mt-2 border-2 shadow-none border-danger-400' w-full"
                            classNames={{

                                body: 'shadow-none'
                            }}
                                    
                    >
                                        
                                <CardBody className='p-5'>

                                <Listbox
                                    aria-label="Actions"
                                    
                                    emptyContent={

                                        <p>List of required education will show here</p>
                                    }
                                    
                                >
                                    {

                                        
                                              
                                        data.education.map((element, index) => (
                                                                                        
                                                                                        
                                            <ListboxItem key={index}
                                                className="border rounded-md p-4"
                                              
                                                startContent={

                                                    <i class="fa-solid fa-star-of-life text-sm"></i>

                                                }
                                                endContent={

                                                    <Button
                                                        isIconOnly
                                                        variant='ghost'
                                                        color='danger'
                                                        className='border-none'
                                                        onPress={() => handleRemoveEducation(element)}
                                                    >
                                                        <i class="fa-solid fa-circle-xmark "></i>
                                                    </Button>

                                                }
                                            >
                                                {element}
                                            </ListboxItem>

                                        ))
                                            

                                        

                                    }
                                    
                                    
                                    </Listbox>


                                </CardBody>
                                        
                                <CardFooter  className='p-5'>
                                        
                                        <Textarea
                                            
                                            
                                            variant='bordered'
                                            radius='sm'
                                            className="text-slate-700 block max-w-full"
                                            value={inputtedEducation}
                                            onChange={(e) => setInputtedEducation(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSetEducation(); }}
                                            label="Type each item in the education list one by one and press enter."

                                         />

                                       

                        </CardFooter>
                                    
                    </Card>
        </div> 
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                 <header>
                    <div className="text-lg font-medium text-gray-900">
                        Required Experiences (Optional)
                    </div>
                    
                    <p className="mt-1 mb-4 text-sm text-gray-600">

                        Outlining responsibilities sets clear expectations for what the job will involve. This helps to prevent misunderstandings or surprises later in the hiring process or after hiring.
                    
                    </p>

                 </header>
                    <Card 
                            radius='sm' 
                            className="mt-2 border-2 shadow-none border-danger-400' w-full"
                            classNames={{

                                body: 'shadow-none'
                            }}
                                    
                    >
                                        
                                <CardBody className='p-5'>

                                <Listbox
                                    aria-label="Actions"
                                    
                                    emptyContent={

                                        <p>List of required experiences will show here</p>
                                    }
                                    
                                >
                                    {

                                        
                                              
                                        data.experiences.map((element, index) => (
                                                                                        
                                                                                        
                                            <ListboxItem key={index}
                                                className="border rounded-md p-4"
                                              
                                                startContent={

                                                    <i class="fa-solid fa-star-of-life text-sm"></i>

                                                }
                                                endContent={

                                                    <Button
                                                        isIconOnly
                                                        variant='ghost'
                                                        color='danger'
                                                        className='border-none'
                                                        onPress={() => handleRemoveExperience(element)}
                                                    >
                                                        <i class="fa-solid fa-circle-xmark "></i>
                                                    </Button>

                                                }
                                            >
                                                {element}
                                            </ListboxItem>

                                        ))
                                            

                                        

                                    }
                                    
                                    
                                    </Listbox>


                                </CardBody>
                                        
                                <CardFooter  className='p-5'>
                                        
                                        <Textarea
                                            
                                            
                                            variant='bordered'
                                            radius='sm'
                                            className="text-slate-700 block max-w-full"
                                            value={inputtedExperience}
                                            onChange={(e) => setInputtedExperience(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSetExperience(); }}
                                            label="Type each item in the experience list one by one and press enter."

                                         />

                                       

                        </CardFooter>
                                    
                    </Card>
        </div> 
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <header>
                    <div className="text-lg font-medium text-gray-900">
                        Required Skills (Optional)
                    </div>
                    
                    <p className="mt-1 mb-4 text-sm text-gray-600">

                        Outlining responsibilities sets clear expectations for what the job will involve. This helps to prevent misunderstandings or surprises later in the hiring process or after hiring.
                    
                    </p>

                 </header>
                    <Card 
                            radius='sm' 
                            className="mt-2 border-2 shadow-none border-danger-400' w-full"
                            classNames={{

                                body: 'shadow-none'
                            }}
                                    
                    >
                                        
                                <CardBody className='p-5'>

                                <Listbox
                                    aria-label="Actions"
                                    
                                    emptyContent={

                                        <p>List of required skills will show here</p>
                                    }
                                    
                                >
                                    {

                                        
                                              
                                        data.skills.map((element, index) => (
                                                                                        
                                                                                        
                                            <ListboxItem key={index}
                                                className="border rounded-md p-4"
                                              
                                                startContent={

                                                    <i class="fa-solid fa-star-of-life text-sm"></i>

                                                }
                                                endContent={

                                                    <Button
                                                        isIconOnly
                                                        variant='ghost'
                                                        color='danger'
                                                        className='border-none'
                                                        onPress={() => handleRemoveSkill(element)}
                                                    >
                                                        <i class="fa-solid fa-circle-xmark "></i>
                                                    </Button>

                                                }
                                            >
                                                {element}
                                            </ListboxItem>

                                        ))
                                            

                                        

                                    }
                                    
                                    
                                    </Listbox>


                                </CardBody>
                                        
                                <CardFooter  className='p-5'>
                                        
                                        <Textarea
                                            
                                            
                                            variant='bordered'
                                            radius='sm'
                                            className="text-slate-700 block max-w-full"
                                            value={inputtedSkill}
                                            onChange={(e) => setInputtedSkill(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSetSkill(); }}
                                            label="Type each item in the skill list one by one and press enter."

                                         />

                                       

                        </CardFooter>
                                    
                    </Card>
        </div> 
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <header>
                    <div className="text-lg font-medium text-gray-900">
                        Required Certifications (Optional)
                    </div>
                    
                    <p className="mt-1 mb-4 text-sm text-gray-600">

                        Outlining responsibilities sets clear expectations for what the job will involve. This helps to prevent misunderstandings or surprises later in the hiring process or after hiring.
                    
                    </p>

                 </header>
                    <Card 
                            radius='sm' 
                            className="mt-2 border-2 shadow-none border-danger-400' w-full"
                            classNames={{

                                body: 'shadow-none'
                            }}
                                    
                    >
                                        
                                <CardBody className='p-5'>

                                <Listbox
                                    aria-label="Actions"
                                    
                                    emptyContent={

                                        <p>List of required certifications will show here</p>
                                    }
                                    
                                >
                                    {

                                        
                                              
                                        data.certifications.map((element, index) => (
                                                                                        
                                                                                        
                                            <ListboxItem key={index}
                                                className="border rounded-md p-4"
                                              
                                                startContent={

                                                    <i class="fa-solid fa-star-of-life text-sm"></i>

                                                }
                                                endContent={

                                                    <Button
                                                        isIconOnly
                                                        variant='ghost'
                                                        color='danger'
                                                        className='border-none'
                                                        onPress={() => handleRemoveCertification(element)}
                                                    >
                                                        <i class="fa-solid fa-circle-xmark "></i>
                                                    </Button>

                                                }
                                            >
                                                {element}
                                            </ListboxItem>

                                        ))
                                            

                                        

                                    }
                                    
                                    
                                    </Listbox>


                                </CardBody>
                                        
                                <CardFooter  className='p-5'>
                                        
                                        <Textarea
                                            
                                            
                                            variant='bordered'
                                            radius='sm'
                                            className="text-slate-700 block max-w-full"
                                            value={inputtedCertification}
                                            onChange={(e) => setInputtedCertification(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSetCertification(); }}
                                            label="Type each item in the certification list one by one and press enter."

                                         />

                                       

                        </CardFooter>
                                    
                    </Card>
        </div>   

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <header>
                    <div className="text-lg font-medium text-gray-900">
                        Benefits (Optional)
                    </div>
                    
                    <p className="mt-1 mb-4 text-sm text-gray-600">

                        Outlining responsibilities sets clear expectations for what the job will involve. This helps to prevent misunderstandings or surprises later in the hiring process or after hiring.
                    
                    </p>

                 </header>
                    <Card 
                            radius='sm' 
                            className="mt-2 border-2 shadow-none border-danger-400' w-full"
                            classNames={{

                                body: 'shadow-none'
                            }}
                                    
                    >
                                        
                                <CardBody className='p-5'>

                                <Listbox
                                    aria-label="Actions"
                                    
                                    emptyContent={

                                        <p>List of benefits will show here</p>
                                    }
                                    
                                >
                                    {

                                        
                                              
                                        data.benefits.map((element, index) => (
                                                                                        
                                                                                        
                                            <ListboxItem key={index}
                                                className="border rounded-md p-4"
                                              
                                                startContent={

                                                    <i class="fa-solid fa-star-of-life text-sm"></i>

                                                }
                                                endContent={

                                                    <Button
                                                        isIconOnly
                                                        variant='ghost'
                                                        color='danger'
                                                        className='border-none'
                                                        onPress={() => handleRemoveBenefit(element)}
                                                    >
                                                        <i class="fa-solid fa-circle-xmark "></i>
                                                    </Button>

                                                }
                                            >
                                                {element}
                                            </ListboxItem>

                                        ))
                                            

                                        

                                    }
                                    
                                    
                                    </Listbox>


                                </CardBody>
                                        
                                <CardFooter  className='p-5'>
                                        
                                        <Textarea
                                            
                                            
                                            variant='bordered'
                                            radius='sm'
                                            className="text-slate-700 block max-w-full"
                                            value={inputtedBenefits}
                                            onChange={(e) => setInputtedBenefits(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSetBenefit(); }}
                                            label="Type each item in the benefit list one by one and press enter."

                                         />

                                       

                        </CardFooter>
                                    
                    </Card>
        </div>  
      </>
    );
}
