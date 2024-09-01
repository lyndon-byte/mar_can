import React, { useEffect, useRef } from "react";
import { router, Link } from '@inertiajs/react'
import { useState, useCallback } from "react";
import { format } from 'date-fns';
import { debounce } from 'lodash';


import {
    
    Avatar,
    Badge,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Input,
    Listbox,
    ListboxItem,
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Tooltip,
    useDisclosure

} from "@nextui-org/react";


export default function MessageLists({threadItems=[],highLightedThread=null,role}){

    const [selectedThread, setSelectedThread] = useState(null);

    const [selectedThreadForDeletion, setSelectedThreadForDeletion] = useState(null);

    const [threadState,setThreadState] = useState('active') // active or will be change to archive through the program by selecting tab

    const topThreadListItem = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure(); // for opening and closing modal for thread deletion

    const handleSearch = useCallback(debounce((query) => {
        setSearchQuery(query);
        router.visit(route('search_thread', {search: query}), {
            preserveScroll: true,
            preserveState: true
        });
    }, 500),[]);
    

    const handleInputChange = (e) => {

        handleSearch(e.target.value);
       
    }

    const handleClear = () => {
        setSearchQuery('');
        router.visit(route('messaging'));
    }


    const handlePageReset = () => {

        router.get('/messaging')
        setSelectedThread(null)
    }

    const handleSelectThread = (thread,state) => {
    
       setSelectedThread(thread)
      
       router.get('/get-specific-thread-messages',{ thread: thread , state: state },{ preserveState: true})
    
    };

    const handleDeleteThread = (thread) => {

        onOpen()
        setSelectedThreadForDeletion(thread)
        
    };
    
    
    const handleDeleteThreadRequest = () => {


        router.post('/delete-thread', {id: selectedThreadForDeletion} , {

            onSuccess: () => {onClose()},

        })
        
    };

    const handleArchiveThread = (thread) => {

        router.post('/archive-thread',{ thread: thread },{ preserveState: true, replace: false })
    }

    const handleUnArchiveThread = (thread) => {

        router.post('/unarchive-thread',{ thread: thread },{ preserveState: true, replace: false })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'p');
    };


     const handleSelectActiveThreds = () => {
        
        router.visit('/messaging',{preserveState: true})
        setThreadState('active')
     }

    const handleSelectArchiveThreds = () => {
        
       router.visit('/get-archive-thread',{preserveState: true})
       setThreadState('archived')
    
    }

 
    useEffect(() => {

        setSelectedThread(highLightedThread)
      

    },[highLightedThread])


    return (

       <>      

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Delete Sms</ModalHeader>
                    <ModalBody>
                        <h5>Do you want to delete this sms?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                        </Button>
                        <Button color="default" onPress={handleDeleteThreadRequest}>
                        Proceed
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>

            <Listbox

                    hideSelectedIcon="true"
                    topContent = {          
                        
                        <>      
                               {

                                  role === 'SuperAdmin' && (

                                        <Link href='/dashboard' className="mt-4 mb-4 text-blue-600">&nbsp; &nbsp; <i class="fa-solid fa-arrow-left"></i> Back To Dashboard</Link>
                                  )
                                
                               }
                                <div className="flex flex-wrap justify-center mb-1">
                                    
                                    <ButtonGroup variant="flat" className="w-full" radius="sm">

                                        <Button className={threadState == 'active' ? "bg-slate-400 text-white w-full" : "w-full"}
                                            startContent = {<i className="fas fa-envelope"></i>}
                                            onClick={() => handleSelectActiveThreds()}
                                        
                                        >Messages</Button>
                                        <Button className={threadState == 'archived' ? "bg-slate-400 text-white w-full" : "w-full"}
                                            startContent = {<i className="fas fa-box-archive"></i>}
                                            onClick={() => handleSelectArchiveThreds()}
                                        >
                                            Archived
                                        </Button>
                                    
                                    </ButtonGroup>
                                    
                                </div>

                               <div className="flex mb-1" >


                                    <Tooltip content="New Message" radius='sm'  className='p-2 text-slate-100 bg-black '>
                                        <Button onClick={() => handlePageReset()} radius='sm' variant='ghost' isIconOnly><i class="fa-solid fa-plus"></i></Button>
                                    </Tooltip>
                                    <Input
                                        isClearable
                                        type="text"
                                        radius="sm"
                                        placeholder="Search.."
                                        className="w-full mx-1"
                                        classNames = {{
                                            inputWrapper: "group-data-[focus=true]:border-indigo-500"
                                        }}
                                        onChange={handleInputChange}
                                        onClear={handleClear}
                                        variant="bordered"
                                    />
                                  
                                </div>
                                    
                                
                        </>
                 
                    }
                    items={threadItems}
                    classNames={{
                        base: "w-full max-h-[660px] overflow-y-scroll nextui-listbox",
                        list: "",
                    }}
                    emptyContent={
                    
                        <div className="text-center mt-10 text-lg">

                            {threadState == 'active' ? 'No messages yet' : 'No archived messages yet'}

                        </div>  

                    }
                    >
                   
                    {(threadItems) => (



                            <ListboxItem 
                                    

                                    onClick={() => handleSelectThread(threadItems.id,threadItems.state)}
                                    key={threadItems.key}
                                    startContent={

                                        <Badge color="danger" content={threadItems.latest_message_count} isInvisible={threadItems.latest_message_count == 0 ? true : false} placement="top-right" shape="circle">
                                            
                                            <Avatar showFallback  content={<i class="fa-regular fa-user"></i>} color={threadItems.avatar_color}/>
                                            
                                        </Badge>
                                
                                    }
                                    className={ selectedThread == threadItems.id ?  'border border-dark-500 mb-1 bg-slate-400 text-white' : "border border-dark-500 mb-1"}
                                    style={{borderRadius: "0px" }}
                                    variant="flat"
                                    endContent={
                                    
                                    <div>

                                        <span className="font-bold text-tiny float-end mt-2">{formatDate(threadItems.updated_at)}</span>
                                        <br></br>
                                        <Dropdown>
                                            <DropdownTrigger >
                                                <Button isIconOnly size='sm' variant='ghost' className='border-0 float-end space-y-0'><i class="fa-solid fa-ellipsis-vertical text-lg"></i></Button>
                                            </DropdownTrigger>
                                            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                                
                                                { threadItems.state == 'active' ?

                                                    <DropdownItem
                                                        key={threadItems.id}
                                                        onClick={() => handleArchiveThread(threadItems.id)}
                                                        startContent={<i class="fa-solid fa-box-archive"></i>}
                                                        >
                                                        Archive
                                                    </DropdownItem> : 

                                                    <DropdownItem

                                                        key={threadItems.id}
                                                        onClick={() => handleUnArchiveThread(threadItems.id)}
                                                        startContent={<i class="fa-solid fa-box-open"></i>}
                                                        >
                                                        Unarchive
                                                    </DropdownItem>
                                                
                                                } 
                                                <DropdownItem
                                                    onClick={() => handleDeleteThread(threadItems.id)}
                                                    key={threadItems.id}
                                                    className="text-danger"
                                                    color="danger"
                                                    startContent={<i class="fa-solid fa-trash"></i>}
                                                >
                                                Delete
                                                </DropdownItem>

                                            </DropdownMenu>
                                        </Dropdown>
                                    
                                    
                                    </div>

                                }


                                >




                                    <div className="flex flex-col">

                                        <span className="font-bold text-lg">{threadItems.recipient_name}</span>
                                        <span className="text-default-600">{threadItems.latest_message}</span>

                                    </div>



                                </ListboxItem>
                
                      
                                

                    )}


                    

            </Listbox>
            
        </>
    
     
    )
        
    

}