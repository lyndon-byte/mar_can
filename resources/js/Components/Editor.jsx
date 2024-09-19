import React, { useState, useEffect } from "react";
import {Button, Image, Tabs, Tab,Textarea, Tooltip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import TextInput from '@/Components/TextInput';
import ImagePicker from "./ImagePicker";
import SavedImg from "./SavedImg";
import { router } from "@inertiajs/react";
import { useDropzone } from 'react-dropzone';



export default function Editor({jumbotron,about,mission,vision,contact,offer,milestone,testimonials}) {

    const [selectedTab,setSelectedTab] = useState('hero')

    const [fileUrl,setFileUrl] = useState({

        hero_image: '',
        about_us_img: '',
        mission:'',
        vision:'',
        milestone_img:'',
        testimonials_img:'',

    });

    const [jumbotronFields,setJumbotronField] = useState({

        image_file: jumbotron ? jumbotron.img_url : '',
        brand_name: jumbotron ? jumbotron.brand : '',
        slogan: jumbotron ? jumbotron.slogan : '',
        tagline: jumbotron ? jumbotron.description : '',
        isProcessing: false
        
    })

    const [offerFields,setOfferField] = useState({

        offer_name: '',
        offer_description: '',
        isProcessing: false
        
    })

    const [aboutFields,setAboutField] = useState({

        image_file: about ? about.image_url : '',
        title: about ? about.title : '',
        description: about ? about.description : '',
        isProcessing: false
        
        
    })


    const [missionFields,setMissionField] = useState({

        image_file: mission ? mission.image_url : '',
        description: mission ? mission.description : '',
        isProcessing: false
        
        
    })

    const [visionFields,setVisionField] = useState({

        image_file: vision ? vision.image_url : '',
        description: vision ? vision.description : '',
        isProcessing: false
        
        
    })

    const [testimonialFields,setTestimonialField] = useState({

        image_file: '',
        name:'',
        position_and_workplace:'',
        testimony:'',
        isProcessing: false
    
    })


    const [contactFields,setContactField] = useState({

        email: contact ? contact.email : '',
        office_address: contact ? contact.office_address : '',
        phone_number: contact ? contact.phone_number : '',
        isProcessing: false
        
        
    })


    const [milestoneFields,setMilestoneField] = useState({

        milestone: '',
        image_file: '',
        isProcessing: false
        
    })


    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({

        accept: {
    
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/webp': ['.webp'],
          },
          onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {

                const fileUrl = URL.createObjectURL(file);

                switch(selectedTab){

                    case 'hero':

                        setJumbotronField(prevState => ({
                            ...prevState,        // Keep all the other existing fields
                            image_file: file // Update only the image_file field
                        }));

                     

                    break;

                    case 'about':

                        setAboutField(prevState => ({
                            ...prevState,        // Keep all the other existing fields
                            image_file: file // Update only the image_file field
                        }));

                    break;

                    case 'mission':

                        setMissionField(prevState => ({
                            ...prevState,        // Keep all the other existing fields
                            image_file: file // Update only the image_file field
                        }));

                    break;

                    case 'vision':

                        setVisionField(prevState => ({
                            ...prevState,        // Keep all the other existing fields
                            image_file: file // Update only the image_file field
                        }));

                    break;

                    case 'milestone':


                        setMilestoneField(prevState => ({
                            ...prevState,        // Keep all the other existing fields
                            image_file: file // Update only the image_file field
                        }));


                    break;

                    case 'testimonial':

                            
                        setTestimonialField(prevState => ({
                            ...prevState,        // Keep all the other existing fields
                            image_file: file // Update only the image_file field
                        }));



                    break;
                    
                }
             
             
            }
          },
    
    });

    function handleEditJumbotron(){

        router.post('/edit-jumbotron',{

            img: jumbotronFields.image_file,
            brand_name: jumbotronFields.brand_name,
            slogan: jumbotronFields.slogan,
            tagline: jumbotronFields.tagline,


        },
        {   onStart: () => {

            
                setJumbotronField((prevState) => ({ ...prevState,isProcessing: true}))

            },
            onSuccess: () => {

            
                setJumbotronField((prevState) => ({ ...prevState,isProcessing: false}))

            },
            preserveState: true
            
        }
        );

    }

    function handleEditAbout(){


        router.post('/edit-about',{

            img: aboutFields.image_file,
            title: aboutFields.title,
            description: aboutFields.description,
            

        },
        {   onStart: () => {

            
                setAboutField((prevState) => ({ ...prevState,isProcessing: true}))

            },
            onSuccess: () => {

            
                setAboutField((prevState) => ({ ...prevState,isProcessing: false}))

            },
            preserveState: true
            
        }
        );



    }

    function handleEditMission(){


        router.post('/edit-mission',{

            img: missionFields.image_file,
            description: missionFields.description,
            

        },
        {   onStart: () => {

            
                setMissionField((prevState) => ({ ...prevState,isProcessing: true}))

            },
            onSuccess: () => {

            
                setMissionField((prevState) => ({ ...prevState,isProcessing: false}))

            },
            preserveState: true
            
        }
        );



    }

    function handleEditVision(){


        router.post('/edit-vision',{

            img: visionFields.image_file,
            description: visionFields.description,
            

        },
        {   onStart: () => {

            
                setVisionField((prevState) => ({ ...prevState,isProcessing: true}))

            },
            onSuccess: () => {

            
                setVisionField((prevState) => ({ ...prevState,isProcessing: false}))

            },
            preserveState: true
            
        }
        );



    }

    function handleEditContact(){


        router.post('/edit-contact',{

            email: contactFields.email,
            office_address: contactFields.office_address,
            phone_number: contactFields.phone_number,
            

        },
        {   onStart: () => {

            
                setContactField((prevState) => ({ ...prevState,isProcessing: true}))

            },
            onSuccess: () => {

            
                setContactField((prevState) => ({ ...prevState,isProcessing: false}))

            },
            preserveState: true
            
        }
        );



    }


    function addOffers(){


        router.post('/add-offer',{

            offer_name: offerFields.offer_name,
            offer_description: offerFields.offer_description,
         
        },
        {   onStart: () => {

            
                setOfferField((prevState) => ({ ...prevState,isProcessing: true}))

            },
            onSuccess: () => {

            
                setOfferField((prevState) => ({ ...prevState,isProcessing: false}))
                setOfferField({offer_name:'',offer_description: ''})
            },
            preserveState: true
            
        }
        );



    }


    function handleDeleteOffer(id){

        router.post('/delete-offer',{id},{ preserveState: true, preserveScroll: true})

    }
    

    function addTestimonial(){


        router.post('/add-testimonial',{

            image_file: testimonialFields.image_file,
            name: testimonialFields.name,
            position_and_workplace: testimonialFields.position_and_workplace,
            testimony: testimonialFields.testimony,
           
         
        },
        {   onStart: () => {

            
                setTestimonialField((prevState) => ({ ...prevState,isProcessing: true}))

            },
            onSuccess: () => {

                setTestimonialField({image_file:'',name: '',position_and_workplace: '',testimony:''})
                setTestimonialField((prevState) => ({ ...prevState,isProcessing: false}))

            },
            preserveState: true,
            preserveScroll:true
            
        }
        );



    }

    function addMilestone(){


        router.post('/add-milestone',{

            image_file: milestoneFields.image_file,
            milestone: milestoneFields.milestone,
           
         
        },
        {   onStart: () => {

            
                setMilestoneField((prevState) => ({ ...prevState,isProcessing: true}))

            },
            onSuccess: () => {

                setMilestoneField({image_file:'',milestone: ''})
                setMilestoneField((prevState) => ({ ...prevState,isProcessing: false}))

            },
            preserveState: true,
            preserveScroll:true
            
        }
        );



    }

    function handleDeleteTestimonial(id){

        router.post('/delete-testimonial',{id},{ preserveState: true, preserveScroll: true})

    }

    

    function handleDeleteMilestone(id){

        router.post('/delete-milestone',{id},{ preserveState: true, preserveScroll: true})

    }
    

    useEffect(() => {

        console.log(jumbotron)

    },[])


  return (
    <div className="flex w-full flex-col">

        <label className="mb-5">Landing Page Sections</label>

        <Tabs aria-label="Options" radius="full" onSelectionChange={setSelectedTab}>
            <Tab key="hero" title="Hero">

                 <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the hero background image</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Upload the hero image
                                
                    </p>

                </header>

                <div>
            
                            <div
                            {...getRootProps({ className: 'dropzone' })}
                                style={{

                                    border: '2px dashed #cccccc',
                                    borderRadius: '4px',
                                    padding: '20px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                                        
                                }}
                                className="mb-5"
                            >
                                <input {...getInputProps()} />
                                <p className='text-slate-500'>Drag 'n' drop a &nbsp;<i class="fa-solid fa-image"></i>&nbsp; image file here, or click to select one </p>
                            </div>
                            {jumbotronFields.image_file.path && <span >selected file: {jumbotronFields.image_file.path}</span>}
                </div>

                {

                    jumbotron &&  (

                       jumbotron.img_url !== '' && (

                            <>
                                <label htmlFor="">Current hero background image</label>
                                <SavedImg usedBy={selectedTab} fileName={jumbotron.img_url}></SavedImg>
                            </>

                          

                       )
                        
                        

                        
                    ) 

                        

               }
                
                

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the hero brand</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the brand name
                                
                    </p>

                </header>
                
                <TextInput
                
                    
                  
                    variant="bordered"
                    className="max-w-lg"
                    value={jumbotronFields.brand_name}
                    onChange={(e) =>  setJumbotronField((prevState) => ({ ...prevState,brand_name: e.target.value}))}

                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the slogan</h2>

                        <p className="mt-1 text-sm text-gray-600 mb-4">

                            Enter the slogan
                                    
                        </p>

                </header>

                <TextInput


                  
                    variant="bordered"
                    className="max-w-lg"
                    value={jumbotronFields.slogan}
                    onChange={(e) =>  setJumbotronField((prevState) => ({ ...prevState,slogan: e.target.value}))}

                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the tagline</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the tagline
                                
                    </p>

                </header>

                <TextInput


                   
                    variant="bordered"
                    className="max-w-lg"
                    value={jumbotronFields.tagline}
                    onChange={(e) =>  setJumbotronField((prevState) => ({ ...prevState,tagline: e.target.value}))}

                />

                <Button
                    className="mt-16 text-white bg-slate-800"
                    radius="sm"
                    onClick={handleEditJumbotron}
                    isLoading={jumbotronFields.isProcessing}
                >
                    Save
                </Button>
            </Tab>
            <Tab key="services" title="Services">
                
                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Add Name</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the name of service or offer
                                
                    </p>

                </header>

                <TextInput


                   
                    variant="bordered"
                    className="max-w-lg"
                    value={offerFields.offer_name}
                    onChange={(e) =>  setOfferField((prevState) => ({ ...prevState,offer_name: e.target.value}))}

                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Add description</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the description of service or offer
                                
                    </p>

                </header>

                <Textarea
                 
                    variant="bordered"
                    className="max-w-xl"
                    value={offerFields.offer_description}
                    onChange={(e) =>  setOfferField((prevState) => ({ ...prevState,offer_description: e.target.value}))}

                />

                

                <Button
                    className="mt-16 text-white bg-slate-800"
                    radius="sm"
                    onClick={addOffers}
                    isLoading={offerFields.isProcessing}
                >
                    Save
                </Button>

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-10">Saved offers</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        saved offers will show here
                                
                    </p>

                </header>

                {

                        offer.map((element) => (



                            <div class="mt-6 p-5 border-t border-gray-100">
                                <dl class="divide-y divide-gray-100">

                                    <div class="px-1 sm:text-start text-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            
                                        <dt class="text-sm font-medium leading-6 text-gray-900">
                                    
                                            &nbsp;
                                        
                                            {element.offer_name}
                                        
                                        </dt>
                                        <dd class="sm:mt-0">

                                            <span className='text-lg font-bold text-gray-700'>
                                                {element.offer_description} 
                                            </span>
                                            
                                        </dd>
                                        <dd class="sm:mt-0">

                                            <Tooltip content="Delete this saved offer" className='bg-slate-800 text-white' radius='sm'>
                                                <Button
                                                    className='border-0'
                                                    variant='ghost'
                                                    isIconOnly
                                                    color='danger'
                                                    onPress={() => handleDeleteOffer(element.id)}
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
                   
            </Tab>
            <Tab key="about" title="About Us">
                
                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the About us page image</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Upload the image
                                
                    </p>

                </header>
               
                <div>
            
                <div
                    {...getRootProps({ className: 'dropzone' })}
                        style={{

                            border: '2px dashed #cccccc',
                            borderRadius: '4px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                                                
                        }}
                        className="mb-5"
                    >
                        <input {...getInputProps()} />
                        <p className='text-slate-500'>Drag 'n' drop a &nbsp;<i class="fa-solid fa-image"></i>&nbsp; image file here, or click to select one </p>
                    </div>
                    {aboutFields.image_file.path && <span >selected file: {aboutFields.image_file.path}</span>}
                </div>

                {

                    about &&  (



                        about.image_url !== '' && (

                                <>
                                    <label htmlFor="">Current hero background image</label>
                                    <SavedImg usedBy={selectedTab} fileName={about.image_url}></SavedImg>
                                </>

                            

                        )
                        
                        

                        
                    ) 

                        

                }


                

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the title</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the title
                                
                    </p>

                </header>

                <TextInput


                    variant="bordered"
                    className="max-w-lg"
                    value={aboutFields.title}
                    onChange={(e) =>  setAboutField((prevState) => ({ ...prevState,title: e.target.value}))}
                    
                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the description</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the description
                                
                    </p>

                </header>

                <Textarea
                 
                    variant="bordered"
                    className="max-w-xl"
                    value={aboutFields.description}
                    onChange={(e) =>  setAboutField((prevState) => ({ ...prevState,description: e.target.value}))}

                />

                

                <Button

                    className="mt-16 text-white bg-slate-800"
                    radius="sm"
                    onClick={handleEditAbout}
                    isLoading={aboutFields.isProcessing}
                >
                    Save
                </Button>
                   
            </Tab>
            <Tab key="mission" title="Mission">

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the Mission image</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Upload the image
                                
                    </p>

                </header>

                <div>

                <div
                    {...getRootProps({ className: 'dropzone' })}
                        style={{

                            border: '2px dashed #cccccc',
                            borderRadius: '4px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                                                
                        }}
                        className="mb-5"
                    >
                        <input {...getInputProps()} />
                        <p className='text-slate-500'>Drag 'n' drop a &nbsp;<i class="fa-solid fa-image"></i>&nbsp; image file here, or click to select one </p>
                    </div>
                    {missionFields.image_file.path && <span >selected file: {missionFields.image_file.path}</span>}
                </div>

                {

                        mission &&  (



                            mission.image_url !== '' && (

                                    <>
                                        <label htmlFor="">Current hero background image</label>
                                        <SavedImg usedBy={selectedTab} fileName={mission.image_url}></SavedImg>
                                    </>

                                

                            )
                            
                            

                            
                        ) 

                        

                }
                                
                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Mission</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the company's mission
                                
                    </p>

                </header>

                <Textarea

                    variant="bordered"
                    className="max-w-xl"
                    value={missionFields.description}
                    onChange={(e) =>  setMissionField((prevState) => ({ ...prevState,description: e.target.value}))}

                />

                <Button
                    
                    className="mt-16 text-white bg-slate-800"
                    radius="sm"
                    onClick={handleEditMission}
                    isLoading={missionFields.isProcessing}
                >
                    Save
                </Button>
                  
            </Tab>
            <Tab key="vision" title="Vision">

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the Mission image</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Upload the image
                                
                    </p>

                </header>

                <div>

                    <div
                    {...getRootProps({ className: 'dropzone' })}
                        style={{

                            border: '2px dashed #cccccc',
                            borderRadius: '4px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                                                
                        }}
                        className="mb-5"
                    >
                        <input {...getInputProps()} />
                        <p className='text-slate-500'>Drag 'n' drop a &nbsp;<i class="fa-solid fa-image"></i>&nbsp; image file here, or click to select one </p>
                    </div>

                    {visionFields.image_file.path && <span >selected file: {visionFields.image_file.path}</span>}
                
                </div>

                {

                    vision &&  (



                        vision.image_url !== '' && (

                                <>
                                    <label htmlFor="">Current hero background image</label>
                                    <SavedImg usedBy={selectedTab} fileName={vision.image_url}></SavedImg>
                                </>

                            

                        )
                        
                        

                        
                    ) 

                    

                }

                 <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Vision</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the company's vision
                                
                    </p>

                </header>

                <Textarea

                    variant="bordered"
                    className="max-w-xl"
                    value={visionFields.description}
                    onChange={(e) =>  setVisionField((prevState) => ({ ...prevState,description: e.target.value}))}

                />

                <Button
                    
                    className="mt-16 text-white bg-slate-800"
                    radius="sm"
                    onClick={handleEditVision}
                    isLoading={visionFields.isProcessing}
                    
                >
                    Save
                </Button>
                   
            </Tab>
            <Tab key="milestone" title="Milestones">
                
                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the hero milestone</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Upload the milestone image
                                
                    </p>

                </header>

                <div>
            
                    <div

                        {...getRootProps({ className: 'dropzone' })}
                            style={{

                                border: '2px dashed #cccccc',
                                borderRadius: '4px',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                                    
                            }}
                            className="mb-5"
                        >
                            <input {...getInputProps()} />
                            <p className='text-slate-500'>Drag 'n' drop a &nbsp;<i class="fa-solid fa-image"></i>&nbsp; image file here, or click to select one </p>
                        </div>

                        {  milestoneFields.image_file.path && ( <span>selected file: {milestoneFields.image_file.path}</span>)}
 
                </div>

                {

                    milestone.milestone_img &&  (


                        milestone.milestone_img.image_url !== '' && (

                                <>
                                    <div className="mt-5">
                                        <label htmlFor="" className="mt-10">Milestone image</label>
                                        <SavedImg usedBy={selectedTab} fileName={milestone.milestone_img.image_url}></SavedImg>
                                    </div>
                                </>

                            

                        )
                        
                        

                        
                    ) 

                        

                }

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Adding Milestone</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        enter the milestone
                                
                    </p>

                </header>

                <Textarea

                    variant="bordered"
                    className="max-w-xl"
                    value={milestoneFields.milestone}
                    onChange={(e) =>  setMilestoneField((prevState) => ({ ...prevState,milestone: e.target.value}))}

                />

                
                <Button
                    
                    className="mt-16 text-white bg-slate-800"
                    radius="sm"
                    onClick={addMilestone}
                    isLoading={milestoneFields.isProcessing}
                >
                    Save
                </Button>

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-10">Saved Milestones</h2>


                </header>

                <Table aria-label="Example static collection table" className="mt-5">
                <TableHeader>
                   
                    <TableColumn>Milesone</TableColumn>
                    <TableColumn>Created at</TableColumn>
                    
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                    <TableBody 

                        items={milestone.milestone}
                        emptyContent='No saved milestone yet'
                    >

                    {

                        

                        (item,index) => (

                                <TableRow key={index}>
                                  
                                    <TableCell>{item.milestone === null ? 'Empty' : item.milestone}</TableCell>
                                    <TableCell>{item.created_at}</TableCell>
                                    <TableCell>
                                        <Tooltip
                                            className='bg-slate-800 text-white'
                                            content='delete'
                                        >

                                            <Button 
                                                color="danger" 
                                                isIconOnly
                                                variant="ghost"
                                                className="border-none"
                                                onClick={() => handleDeleteMilestone(item.id)}
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>

                            )
                        

                    }

                    
                        
                    </TableBody>
                </Table>
                   
            </Tab>
            <Tab key="testimonial" title="Testimonials">
                
                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Add avatar image</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Upload the avatar image
                                
                    </p>

                </header>

                <div>

                    <div
                    {...getRootProps({ className: 'dropzone' })}
                        style={{

                            border: '2px dashed #cccccc',
                            borderRadius: '4px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            width: '200px'                      
                        }}
                        className="mb-5"
                    >
                        <input {...getInputProps()} />
                        <p className='text-slate-500'>Drag 'n' drop a &nbsp;<i class="fa-solid fa-image"></i>&nbsp; image file here, or click to select one </p>
                    </div>

                    {testimonialFields.image_file.path && <span >selected file: {testimonialFields.image_file.path}</span>}
                
                </div>

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-10">Name</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the name of the person who has testimonial
                                
                    </p>

                </header>

                <TextInput


                   
                    variant="bordered"
                    className="max-w-lg"
                    value={testimonialFields.name}
                    onChange={(e) =>  setTestimonialField((prevState) => ({ ...prevState,name: e.target.value}))}

                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-10">Position and work place</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Add the current job position and the current work place of the person who has testimonial
                                
                    </p>

                </header>

                <TextInput


                  
                    variant="bordered"
                    className="max-w-lg"
                    value={testimonialFields.position_and_workplace}
                    onChange={(e) =>  setTestimonialField((prevState) => ({ ...prevState,position_and_workplace: e.target.value}))}


                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Testimony</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Summarize or describe the person's testimonial
                                
                    </p>

                </header>

                <Textarea

                    variant="bordered"
                    className="max-w-xl"
                    value={testimonialFields.testimony}
                    onChange={(e) =>  setTestimonialField((prevState) => ({ ...prevState,testimony: e.target.value}))}
                    
                />



                <Button

                    className="mt-16 text-white bg-slate-800"
                    radius="sm"
                    onClick={addTestimonial}
                    isLoading={testimonialFields.isProcessing}

                >
                    Save
                </Button>

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-10">Saved Testimonials</h2>

                 
                </header>

                <Table aria-label="Example static collection table" className="mt-5">
                    <TableHeader>
                        <TableColumn>Image</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>TESTIMONY</TableColumn>
                        <TableColumn>POSITION AND WORKPLACE</TableColumn>
                        
                        <TableColumn>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody 
                    
                        items={testimonials}
                        emptyContent='No saved testimonial yet'
                    >

                     {

                        

                           (item,index) => (

                                <TableRow key={index}>
                                    <TableCell>

                                       
                                        {item.avatar_img}
                                            
                                        

                                    </TableCell>
                                    <TableCell>{item.full_name}</TableCell>
                                    <TableCell>{item.testimony}</TableCell>
                                    <TableCell>{item.job}</TableCell>
                                    <TableCell>
                                        <Tooltip
                                            className='bg-slate-800 text-white'
                                            content='delete'
                                        >

                                            <Button 
                                                color="danger" 
                                                isIconOnly
                                                variant="ghost"
                                                className="border-none"
                                                onClick={() => handleDeleteTestimonial(item.id)}
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
    
                            )
                        

                     }

                       
                        
                    </TableBody>
                </Table>
               
            </Tab>
            <Tab key="contact" title="Contact Us">
                
                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Email Address</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the email address that can contact by website visitors
                                
                    </p>

                </header>

                <TextInput

                    variant="bordered"
                    className="max-w-lg"
                    value={contactFields.email}
                    onChange={(e) =>  setContactField((prevState) => ({ ...prevState,email: e.target.value}))}

                />  

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Add Office Address</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the office address
                                
                    </p>

                </header>

                <TextInput


                   
                    variant="bordered"
                    className="max-w-lg"
                    value={contactFields.office_address}
                    onChange={(e) =>  setContactField((prevState) => ({ ...prevState,office_address: e.target.value}))}
                /> 

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Add Phone number</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        enter phone number that can contact by website visitors
                                
                    </p>

                </header>

                <TextInput


                   
                    variant="bordered"
                    className="max-w-lg"
                    value={contactFields.phone_number}
                    onChange={(e) =>  setContactField((prevState) => ({ ...prevState,phone_number: e.target.value}))}

                /> 

                <Button
                    
                    className="mt-16 text-white bg-slate-800"
                    radius="sm"
                    onClick={handleEditContact}
                    isLoading={contactFields.isProcessing}

                >
                    Save
                </Button>

               
            </Tab>
            

        </Tabs>

    </div>  

  );
}
