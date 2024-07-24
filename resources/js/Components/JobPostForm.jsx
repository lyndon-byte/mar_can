import { useState, useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm,router } from '@inertiajs/react';
import {today,getLocalTimeZone,parseDate} from "@internationalized/date";

import { Button , Card, Chip, CardHeader, CardBody, CardFooter, DatePicker, Textarea, Tooltip, Select, SelectItem, Listbox, ListboxItem} from '@nextui-org/react';

export default function JobPostForm({jobData}) {

    const [isEditMode,setIsEditMode] = useState(false)

    const [inputtedResponsibilty,setInputtedResponsibilty] = useState('')

    const [inputtedEducation,setInputtedEducation] = useState('')

    const [inputtedExperience,setInputtedExperience] = useState('')

    const [inputtedSkill,setInputtedSkill] = useState('')

    const [inputtedCertification,setInputtedCertification] = useState('')

    const [inputtedBenefits,setInputtedBenefits] = useState('')

    
    const { data, setData, post, errors, processing } = useForm({

        job_id:'',
        job_title: '',
        job_description: '',
        location: '',
        salary: '',
        employment_type: '',
        work_schedule: '',
        start_date:'',
        status: '',
        resposnsibility: [],
        education: [],
        experiences: [],
        skills: [],
        certifications: [],
        benefits: []
        
    });

    function handleSetResponsibility(){

        setData('resposnsibility',[...data.resposnsibility,{responsibility: inputtedResponsibilty}])
        setInputtedResponsibilty('')
    }

    function handleSetEducation(){

        setData('education',[...data.education,{education:inputtedEducation}])
        setInputtedEducation('')
    }

    function handleSetExperience(){

        setData('experiences',[...data.experiences,{experience:inputtedExperience}])
        setInputtedExperience('')
    }

    function handleSetSkill(){

        setData('skills',[...data.skills,{skill:inputtedSkill}])
        setInputtedSkill('')
    }

    function handleSetCertification(){

        setData('certifications',[...data.certifications,{certification:inputtedCertification}])
        setInputtedCertification('')
    }

    function handleSetBenefit(){

        setData('benefits',[...data.benefits,{benefit:inputtedBenefits}])
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


        router.get('/view-posted-job',{id:jobData.id},{preserveScroll: true, preserveState: true, onSuccess: () => {

            const dateObject = new Date(jobData.start_date);

            setIsEditMode(true)
            setData({

                job_id: jobData.id,
                job_title: jobData.job_title,
                job_description: jobData.job_description,
                location: jobData.location,
                salary: jobData.salary,
                employment_type: jobData.employment_type,
                work_schedule: jobData.work_schedule,
                start_date: jobData.start_date === '' ? '' :  parseDate(dateObject.toISOString().split('T')[0]),
                status: jobData.status,
                resposnsibility: jobData.responsibilities,
                education: jobData.required_education,
                experiences: jobData.required_experiences,
                skills: jobData.required_skills,
                certifications: jobData.required_certifications,
                benefits: jobData.benefits
            })

        }})

       
    }

    const submit = () => {

       if(isEditMode){

            post(route('update_job'),{onSuccess:() => {setIsEditMode(false)}});

       }else{

            post(route('save_new_job'));
       }

    };


    useEffect(() => {

        console.log(jobData)

    },[])

    return (
      <>
        { jobData === null || isEditMode ? (

                <>
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <section>
                                <header>
                                    <div className="text-lg font-medium text-gray-900">
                                        Add new job posting
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
                                                            
                                                            />

                                                            
                                                    </div>

                                                    <div>
                                                        <InputLabel className='mt-2' htmlFor="location" value="Location (Optional)" />

                                                        <TextInput

                                                            className="mt-1 block w-full"
                                                            value={data.location}
                                                            onChange={(e) => setData('location', e.target.value)}
                                                            placeholder="Just type Remote, Work from home , Hybrid , Or On-site"

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
                                                            defaultValue={data.start_date}
                                                            minValue={today(getLocalTimeZone())}
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
                                                        value={data.salary}
                                                        onChange={(e) => setData('salary', e.target.value)}
                                                    
                                                    
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
                                                        defaultSelectedKeys={[data.employment_type]}
                                                        onChange={(e) => setData('employment_type',e.target.value)}

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
                                                                    {element.responsibility}
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

                                        Educational requirements ensure that candidates have a fundamental level of knowledge and understanding in a specific field. This baseline is crucial for roles that require specialized knowledge or technical expertise.                                    
                                    
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
                                                                    {element.education}
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

                                    Specifying required experiences helps ensure that candidates possess the necessary skills and knowledge to perform the job effectively. This reduces the risk of hiring underqualified individuals who may struggle to meet job expectations.

                                    
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
                                                                        {element.experience}
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

                                         Specifying required skills helps ensure that candidates possess the necessary abilities to perform the job effectively. This reduces the risk of hiring individuals who may struggle to meet job expectations and responsibilities.                                    
                                    
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
                                                                    {element.skill}
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

                                        Certifications serve as a formal validation of a candidate's expertise and knowledge in a specific field. They indicate that the candidate has met industry standards and has a certain level of proficiency.                                    
                                    
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
                                                                        {element.certification}
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

                                        Offering attractive benefits helps to draw in top talent. Candidates often look for more than just a competitive salary; comprehensive benefits packages can be a deciding factor in their job choice.                                    
                                   
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
                                                                    {element.benefit}
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
                        <div className='flex justify-end mb-5'>
                            <Button
                                className='bg-slate-800 text-white'
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
                                
                            
                            
                                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                        <header>
                                            <div className="text-lg font-medium text-gray-900">
                                                Job details
                                                &nbsp;
                                                {

                                                    jobData !== null && (
                                                        
                                                        <Tooltip content="Edit Job information" className='bg-slate-800 text-white' radius='sm'>
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

                                        <div className='p-4'>
                                        
                                            <div class="mt-6 border-t border-gray-100">
                                                <dl class="divide-y divide-gray-100">

                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Job Title</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.job_title}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Job Description</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.job_description}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Location</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.location}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Salary</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><i class="fa-solid fa-dollar-sign"></i> {jobData.salary}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Employment Type</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.employment_type}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Start Date</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.start_date}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobData.status}</dd>
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Responsibilities</dt>
                                                        {

                                                                jobData.responsibilities.length !== 0 ?  (

                                                                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                            {

                                                                                jobData.responsibilities.map((item) => (
                                                                                    
                                                                                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                            <div class="flex w-0 flex-1 items-center">
                                                                                                <i class="fa-solid fa-star-of-life"></i>
                                                                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                    
                                                                                                    <span class="truncate font-medium">{item.responsibility}</span>
                                                                                            
                                                                                                </div>
                                                                                            </div>

                                                                                        </li>
                                                                                    
                                                                                                
                                                                                ))
                                                                            }
                                                                            
                                                                        </ul>
                                                                    </dd>

                                                                ) : (

                                                                    <>
                                                                        <p className='text-gray-400'>No data provided</p>
                                                                    </>

                                                                )


                                                    }
                                                    </div>

                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Required Education</dt>
                                                        {

                                                            jobData.required_education.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                            jobData.required_education.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                
                                                                                                <span class="truncate font-medium">{item.education}</span>
                                                                                        
                                                                                            </div>
                                                                                        </div>

                                                                                    </li>
                                                                                
                                                                                            
                                                                            ))
                                                                        }
                                                                        
                                                                    </ul>
                                                                </dd>

                                                            ) : (

                                                                <>
                                                                    <p className='text-gray-400'>No data provided</p>
                                                                </>

                                                            )


                                                        }
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Required Experiences</dt>
                                                        {

                                                            jobData.required_experiences.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                            jobData.required_experiences.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                
                                                                                                <span class="truncate font-medium">{item.experience}</span>
                                                                                        
                                                                                            </div>
                                                                                        </div>

                                                                                    </li>
                                                                                
                                                                                            
                                                                            ))
                                                                        }
                                                                        
                                                                    </ul>
                                                                </dd>

                                                            ) : (

                                                                <>
                                                                    <p className='text-gray-400'>No data provided</p>
                                                                </>

                                                            )


                                                        }
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Required Skills</dt>
                                                        {

                                                                jobData.required_skills.length !== 0 ?  (

                                                                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                            {

                                                                                jobData.required_skills.map((item) => (
                                                                                    
                                                                                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                            <div class="flex w-0 flex-1 items-center">
                                                                                                <i class="fa-solid fa-star-of-life"></i>
                                                                                                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                    
                                                                                                    <span class="truncate font-medium">{item.skill}</span>
                                                                                            
                                                                                                </div>
                                                                                            </div>

                                                                                        </li>
                                                                                    
                                                                                                
                                                                                ))
                                                                            }
                                                                            
                                                                        </ul>
                                                                    </dd>

                                                                ) : (

                                                                    <>
                                                                        <p className='text-gray-400'>No data provided</p>
                                                                    </>

                                                                )


                                                        }
                                                    </div>
                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Required Certifications</dt>
                                                        {

                                                            jobData.required_certifications.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                            jobData.required_certifications.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                
                                                                                                <span class="truncate font-medium">{item.certification}</span>
                                                                                        
                                                                                            </div>
                                                                                        </div>

                                                                                    </li>
                                                                                
                                                                                            
                                                                            ))
                                                                        }
                                                                        
                                                                    </ul>
                                                                </dd>

                                                            ) : (

                                                                <>
                                                                    <p className='text-gray-400'>No data provided</p>
                                                                </>

                                                            )


                                                        }
                                                    </div>

                                                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt class="text-sm font-medium leading-6 text-gray-900">Benefits</dt>
                                                        {

                                                            jobData.benefits.length !== 0 ?  (

                                                                <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                        {

                                                                            jobData.benefits.map((item) => (
                                                                                
                                                                                    <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">

                                                                                        <div class="flex w-0 flex-1 items-center">
                                                                                            <i class="fa-solid fa-star-of-life"></i>
                                                                                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                                                                                
                                                                                                <span class="truncate font-medium">{item.benefit}</span>
                                                                                        
                                                                                            </div>
                                                                                        </div>

                                                                                    </li>
                                                                                
                                                                                            
                                                                            ))
                                                                        }
                                                                        
                                                                    </ul>
                                                                </dd>

                                                            ) : (

                                                                <>
                                                                    <p className='text-gray-400'>No data provided</p>
                                                                </>

                                                            )


                                                        }
                                                    </div>
                                                </dl>
                                            
                                            </div>
                                            
                                        </div>
                                    </div>      
                                   
                    
                    </>
                )
            } 
      </>
    );
}
