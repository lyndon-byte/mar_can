import React from "react";
import { useState, useEffect, useRef } from "react";
import { useForm, router } from "@inertiajs/react";
import { 
    
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Chip,
    DateRangePicker,
    Divider,
    Listbox, 
    ListboxItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Pagination,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spinner,
    Select,
    SelectItem,
    Tooltip,
    Textarea,
    useDisclosure
    
    
} from "@nextui-org/react";

import TextForChat from "./TextForChat";
import { format } from 'date-fns';
import {today,getLocalTimeZone} from "@internationalized/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";




export default function ChatWindow({messagesForThread=[],selectedThread='',name='',autoCompleteContacts=[], templatesLists=[],activeReminder = []}){

    const [message,setMessage] = useState('');

    const [reminderMessage, setReminderMessage] = useState('');

    const [email,setEmail] = useState('');

    const [messagesLists, setMessagesLists] = useState([]);

    const [openTemplatesList, setOpenTemplatesList] = useState(false);

    const [isTemplatesForReminder,setIsTemplatesForReminder] = useState(false);

    const [isOpenCreateReminderModal,setIsOpenCreateReminderModal] = useState(false);

    const [isOpenActiveRemindersModal,setIsOpenActiveRemindersModal] = useState(false);

    const [intervalReminder,setIntervalReminder] = useState('');

    const [isLoadingSaveReminderBtn,setIsLoadingSaveReminderBtn] = useState(false);

    const [isDisableOpenReminderModalBtn,setIsDisableOpenReminderModalBtn] = useState(true);

    const [reminderMessageError,setReminderMessageError] = useState('');

    const [reminderIntervalError,setReminderIntervalError] = useState('');

    const [reminderDateError,setReminderDateError] = useState('');

    const [isOpenTemplateModal,setIsOpenTemplateModal] = useState(false);
    
    const [autoCompleteContactSearch,setAutoCompleteContactSearch] = useState('');

    const [activeReminderContactName,setActiveReminderContactName] = useState('');

    const [showSpinner,setShowSpinner] = useState(false);
    
    // const {isOpen, onOpen, onClose, onOpenChange, setIsOpen} = useDisclosure();

    const handleSetTemplateReminder = () => {

        setIsOpenTemplateModal(true)
        setIsTemplatesForReminder(true)
    }

    const handleClosingReminderModal = () => {

        setIsOpenCreateReminderModal(false)
        setIsTemplatesForReminder(false)
        setReminderMessage('')
        setReminderMessageError('')
        setReminderIntervalError('')
        setReminderDateError('')
    }

    const handleShowActiveRemindersModal = (name) => {

        setActiveReminderContactName(name)
        setIsOpenActiveRemindersModal(true)

    }

    const handleDeleteSmsReminder = (id) => {

        router.post('/delete-reminder-sms',{id: id},{preserveState: true})
    }
    

    const handleSelectTemplate = (message) => {

        setIsOpenTemplateModal(false)

        if(isTemplatesForReminder){

            setReminderMessage(message)

        }else{

            setMessage(message)
        }
    }

    const handlePageChange = (page) => {

        router.get('/messaging',{page},{preserveScroll: true, preserveState: true})
        
    }

    const [dateValue, setDateValue] = useState({

        start:  '',
        end:  '',

    });

    // const handleSaveReminder = () => {

    //     router.post('/save-reminder-sms',{
            
    //             email: email, 
    //             message: reminderMessage,
    //             interval: intervalReminder.anchorKey,
    //             start_date: dateValue.start,
    //             end_date: dateValue.end 

    //         },
    //         {
    //             onStart: () => {
                    
                    
    //                 setIsLoadingSaveReminderBtn(true)
    //                 setReminderMessageError('')
    //                 setReminderIntervalError('')
    //                 setReminderDateError('')
    //             },
    //             onSuccess: () => {
                    
    //                 setReminderMessage('')
    //                 setIsOpenCreateReminderModal(false)
    //                 setIsLoadingSaveReminderBtn(false)
                 
    //             },
    //             onError: (errors) => {
                    
    //                 setIsLoadingSaveReminderBtn(false)
                   
    //                 if(errors.message){

    //                     setReminderMessageError(errors.message)
                    
    //                 }
                    
    //                 if(errors.interval){

    //                     setReminderIntervalError(errors.interval)
                    
    //                 }
                    
    //                 if(errors.start_date){

    //                     setReminderDateError(errors.start_date)
                        
    //                 } 
                    
    //                 if(errors.end_date){

    //                     setReminderDateError(errors.end_date)
                        
                        
    //                 }  

    //             },
    //             preserveState: true
    //         }
    //     )
        
        
    // }

    const handleSendMessage = () => {

        router.post('/send-message',{email: email , message: message},{
            onStart: () => {
                
                
                setShowSpinner(true)
                
            },
            onSuccess: () => {
                
                setMessage('')
                setShowSpinner(false)
                
            },
            onError: (errors) => {

                setShowSpinner(false)
                if(errors.message){

                    Swal.fire({

                        icon: 'warning',
                        title: 'error',
                        text:  errors.message,
                    
                    });
                
                }else if(errors.email){

                    Swal.fire({

                        icon: 'warning',
                        title: 'error',
                        text:  errors.email,

                    });
                    

                } else if(errors.credit){

                    Swal.fire({

                        icon: 'warning',
                        title: 'error',
                        text:  errors.credit,

                    });
                }  

            },
            preserveState: true
        })
        
        
    }

    //auto scroll to the last message in chat window

    const lastMessageRef = useRef(null);

     useEffect(() => {

       console.log(autoCompleteContactSearch)

    }, [autoCompleteContactSearch]);



    useEffect(()=>{

        setEmail(selectedThread)
        if(selectedThread != ''){

            setIsDisableOpenReminderModalBtn(false)
        }

    },[selectedThread])


    useEffect(()=>{

        setMessagesLists(messagesForThread)
        

    },[messagesForThread])

    useEffect(() => {

        if (lastMessageRef.current) {

            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            lastMessageRef.current.focus();

        }

    }, [messagesLists]);


    useEffect(() => {

        console.log(intervalReminder)

    },[intervalReminder])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'Pp');
    };

    return (
        
                <>
                    <Modal

                            isOpen={isOpenActiveRemindersModal} 
                            placement="top" 
                            onClose={setIsOpenActiveRemindersModal}
                            scrollBehavior="outside"
                        >
                        <ModalContent
                            
                        >
                        
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-gray-500">{activeReminderContactName + " active reminders"} </ModalHeader>
                                <ModalBody>

                                    { activeReminder.length == 0 &&( <p className="text-center text-gray-500 mt-3">no active reminders yet</p>)}

                                    {

                                        activeReminder.map((element) => (

                                            <Card 
                                             radius="sm"
                                            
                                            >
                                                <CardHeader className="justify-between">
                                                
                                                    <div className="flex gap-5">
                                                            <i class="far fa-bell text-2xl text-primary-300 ml-1"></i>
                                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                                <h4 className="text-small font-semibold leading-none text-default-600">{element.interval}</h4>
                                                                <h5 className="text-small tracking-tight text-default-400">Reminder</h5>
                                                            </div>
                                                    </div>
                                                
                                                    <Tooltip content="Delete this Reminder" placement="right" radius='sm'  className='p-2 text-slate-100 bg-black '>
                                                        <Button
                                                            className="bg-transparent text-foreground border-0"
                                                            color="primary"
                                                            radius="sm"
                                                            size="lg"
                                                            variant="bordered"
                                                            onPress={() => handleDeleteSmsReminder(element.id)}
                                                            isIconOnly
                                                            >
                                                            <i class="fa-solid fa-trash text-danger-500"></i>
                                                        </Button>
                                                    </Tooltip>
                                                </CardHeader>
                                              
                                                    <CardBody className="px-3 py-0 text-small text-gray-500">
                                                        <p className="text-sm">{element.message}</p>
                                                    </CardBody>

                                                <CardFooter>
                                                <span className="text-gray-600 text-sm">Started on {element.start_date} and will end on {element.end_date}.</span>
                                                </CardFooter>
                                            </Card>

                                        ))
                                        
                                    }

                                    

                                </ModalBody>
                                <ModalFooter>

                                    <Button color="default" variant="light" onPress={() => setIsOpenActiveRemindersModal(false)}>
                                        Close
                                    </Button>
                                  
                                </ModalFooter>
                            </>
                        
                        </ModalContent>
                    </Modal>



                    <Modal isOpen={isOpenCreateReminderModal} isDismissable={false} onClose={() => handleClosingReminderModal()}>
                        <ModalContent>
                       
                            <>
                                <ModalHeader className="flex flex-col gap-1">Set a reminder</ModalHeader>
                                <ModalBody>
                                    <Textarea
                                    
                                        variant="bordered"
                                        value={reminderMessage}
                                        onChange={(e) => setReminderMessage(e.target.value)}
                                        placeholder="Enter your message"
                                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                                        radius="sm"
                                        isInvalid={reminderMessageError != '' ? true : false}
                                        errorMessage={reminderMessageError}
                                        endContent={

                                            <Tooltip content="Use template" radius='sm'  className='p-2 text-slate-100 bg-black '>
                                                <Button 
                                                    isIconOnly 
                                                    radius="sm"
                                                    size="sm"
                                                    variant="ghost"
                                                    color="default"
                                                    onPress={() => handleSetTemplateReminder()}

                                                >
                                                    <i class="fa-solid fa-file text-xl"></i>
                                                </Button>
                                        </Tooltip>
                                         
                                        }
                                    />

                                    <Select 
                                        variant="bordered"
                                        label="Select an interval" 
                                        className="max-w-full" 
                                        radius="sm"
                                        onSelectionChange={setIntervalReminder}
                                        isInvalid={reminderIntervalError != '' ? true : false}
                                        errorMessage={reminderIntervalError}
                                    >
                                      
                                        <SelectItem key="daily">
                                            Daily
                                        </SelectItem>
                                        <SelectItem  key="weekly">
                                            Weekly
                                        </SelectItem>
                                      
                                    </Select>
                                    
                                                                    
                                     <DateRangePicker 
                                        variant="bordered"
                                        label="Duration" 
                                        className="max-w-full"
                                        radius="sm" 
                                        isInvalid={reminderDateError != '' ? true : false}
                                        errorMessage={reminderDateError}
                                        onChange={setDateValue}
                                        minValue={today(getLocalTimeZone())}
                                    />
        

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="default" variant="light" onPress={() => handleClosingReminderModal()}>
                                    Close
                                    </Button>
                                    <Button isLoading={isLoadingSaveReminderBtn} radius="sm" className="bg-slate-800 text-white" onPress={() => handleSaveReminder()}>
                                    Save
                                    </Button>
                                </ModalFooter>
                            </>
                        
                        </ModalContent>
                    </Modal>

                    <Modal size="3xl" isOpen={isOpenTemplateModal} onClose={setIsOpenTemplateModal} >
                        <ModalContent>
                     
                            <>
                                <ModalHeader className="flex flex-col gap-1">Templates</ModalHeader>
                                
                                <ModalBody>

                                    <Listbox

                                        aria-label="Actions"
                                        
                                        className='p-3 mb-4'
                                        items={templatesLists.data}
                                        classNames={{

                                            base: "w-full h-[550px] max-h-[450px] overflow-y-scroll nextui-listbox",
                                            list: "",

                                        }}
                                        emptyContent={
                                            <>
                                                
                                                <p className='text-center mt-3'>No saved templates yet</p>
        
                                            </>
                                        }
                                    >   
                                        {(templatesLists) => (

                                                <ListboxItem 
                                                    key={templatesLists.id}
                                                    className='border border-dark-500 mb-1 rounded-none p-4'  
                                                    onPress={() => handleSelectTemplate(templatesLists.template_message)}
                                                    >
                                                    <h2 className='text-lg font-semibold'>{templatesLists.template_title}</h2>
                                                    <p>{templatesLists.template_message}</p>
                                                </ListboxItem>
                                            )
                                        }
                                       
                                        
                                        
                                    </Listbox>

                                </ModalBody>
                                <ModalFooter className='flex justify-center mt-5'>
                               
                                    
                                    <Pagination 
                                        
                                        color='secondary'
                                        showControls 
                                        total={templatesLists.last_page} 
                                        initialPage={templatesLists.current_page}
                                        onChange={handlePageChange}
        
                                    />

                          
                                </ModalFooter>
                           
                            </>
                      
                        </ModalContent>
                    </Modal>   

                    <div className="h-[580px] ">
                                    <Listbox
                                       
                                       aria-label="Actions"
                                       emptyContent={

                                            <>
                                              
                                                <Autocomplete 

                                                    label="Select or enter email" 
                                                    className="max-w-md"

                                                    radius="sm"
                                                    size="lg"
                                                    allowsCustomValue
                                                    onKeyUp={(e) => setEmail(e.target.value)}	
                                                    onSelectionChange={(key) => setEmail(key)}

                                                 >  

                                                    
                                                    {autoCompleteContacts.map((items) => (
                                                    
                                                        <AutocompleteItem key={items.email}>{items.name + " (" + items.email + ")"}</AutocompleteItem>
                                                            
                                                            
                                                    ))}

                                                    
                                                  
                                                  
                                                   
                                                </Autocomplete>

                                            </>

                                       }
                                       topContent={

                                        <div className="d-flex">  
                                            {
                                                messagesForThread.length !== 0 && (
                                           
                                                    <Chip 
                                                    
                                                        size="lg"  
                                                        className='bg-slate-700 text-white p-5 m-3'
                                                        endContent={

                                                            
                                                           activeReminder.length !== 0 && (

                                                                <Tooltip content="Active Reminders" radius='sm'  className='p-2 text-slate-100 bg-black '>
                                                                    <Button
                                                                        
                                                                        variant="bordered"
                                                                        className="text-white border-none ml-1"
                                                                        size="sm"
                                                                        isIconOnly
                                                                        onPress={() => handleShowActiveRemindersModal(name)}
                                                                    >
                                                                        <i class="far fa-bell text-xl text-primary-300"></i>
                                                                    </Button>
                                                                </Tooltip>

                                                           )
                                                            
                                                        }
                                                        >
                                                        {name} &nbsp; {"( " + email + " )"}
                                                    
                                                           
                                                    </Chip>
    
                                                ) 
                                            }

                                            

                                        </div>
                                       



                                       }
                                       
                                       classNames={{
                                           base: "w-full",
                                           list: "max-h-[500px] overflow-x-auto",
                                        }}
                                       
                                       >
                                       {messagesLists.map((message, index) => (

                                          
                                           
                                            <ListboxItem  

                                                    ref={index === messagesLists.length - 1 ? lastMessageRef : null} 
                                                
                                                    // startContent={ <Avatar className='bg-indigo-500 text-white ' 
                                                    // name={message.sender}/> } 
                                                    key={index} className='w-fit'
                                                    isReadOnly
                                                >

                                                
                                                    <TextForChat 

                                                        reference={index === messagesLists.length - 1 ? lastMessageRef : null}
                                                        text={message.message}
                                                        type={message.type}
                                                        
                                                    />

                                                
                                                   <span className="text-slate-500">Sent at {formatDate(message.created_at)}</span>

                                            </ListboxItem>
                                            

                                        
                                            //  <ListboxItem 
                                                
                                                
                                            //     startContent={ <Avatar className='bg-slate-500 text-white' name={message.sender}/>} 
                                            //     key={index} className='w-fit'
                                                
                                            //  >
                                               
                                            //     <p 
                                            //     ref={index === messagesLists.length - 1 ? lastMessageRef : null}  
                                            //     tabIndex={index === messagesLists.length - 1 ? 0 : -1}
                                            //     className='bg-white text-dark w-fit p-3 rounded-full rounded-bl-none'>{message.message}</p>
                                               
                                            //  </ListboxItem> 

                                       ))}

                                     

                                    </Listbox>  

                                    

                                </div>
                                      
                                <Textarea
                                    
                                    placeholder="Enter your message"
                                    className="w-full"
                                    radius="none"
                                    size="lg"
                                    maxRows={4}
                                    value={message}
                                    onValueChange={setMessage}
                                    onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage() : null}
                                    endContent={
                                        <>
                                         


                                          {/* <Tooltip content="Set a reminder" radius='sm'  className='p-2 text-slate-100 bg-black '>
                                                <Button 
                                                    isIconOnly 
                                                    className="mx-2" 
                                                    radius="sm"
                                                    variant="ghost"
                                                    color="default"
                                                    onPress={() => setIsOpenCreateReminderModal(true)}
                                                    isDisabled={isDisableOpenReminderModalBtn}
                                                >
                                                    <i class="fa-solid fa-bell text-xl"></i>
                                                </Button>
                                            </Tooltip> */}

                                            { showSpinner ? ( 
                                            
                                                <Spinner color="success"/> 
                                            
                                              ): (

                                                    <Tooltip content="Send Message" radius='sm'  className='p-2 text-slate-100 bg-black '>
                                                        <Button 
                                                            isIconOnly 
                                                            radius="sm"
                                                            variant="ghost"
                                                            color="default"
                                                            className="border-none"
                                                            onPress={() =>  handleSendMessage()}
                                                        >
                                                            <i class="fa-solid fa-arrow-right text-xl"></i>
                                                        </Button>
                                                  </Tooltip>
                                                    
                                              )
                                            
                                            
                                            
                                            
                                            }
                                            
                                                
                                    
                                         
                                        </>
                                        
                                    }
                                />

                            
                               
                               
                                                
                                             
                </>

    )

}