import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MessageLists from '@/Components/MessageLists';
import ChatWindow from '@/Components/ChatWindow';
// import MessageInput from '@/Components/MessageInput';
import { useState, useEffect} from "react";
import { Head } from '@inertiajs/react';


export default function Messenger({ 

    auth,messages=[],
    threads,
    selected_thread,
    highlighted_thread,
    contact_name,contacts,
    templates,
    reminder

}) {

    

    return (
        <AuthenticatedLayout
        
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight mb-5">Messaging</h2>}

        >
            <Head title="Dashboard" />
          
                 <div className="bg-white">

                     <div className='grid grid-cols-5'>

                            
                            <MessageLists 
                                threadItems={threads} 
                                highLightedThread={highlighted_thread} 
                                role={auth.user.role}
                                
                            />
                                
                            <div className='bg-slate-200 col-span-4'>

                                                                    
                                <div className='w-full'>

                                      
                                      <ChatWindow 

                                        messagesForThread={messages} 
                                        selectedThread={selected_thread} 
                                        name={contact_name} 
                                        autoCompleteContacts={contacts}
                                        templatesLists={templates}
                                        activeReminder={reminder}
                                      />  
                                            
                                              
                                       
                                 </div>

                                 
                               
                                
                            </div>
                    
                        </div>
                                            
                    
                    </div>
                    
                   

                    <footer class="text-slate-500 text-center py-7">
                        <div class="container mx-auto mt-10">
                            <p>&copy; Marcan Messenger</p>
                        </div>
                    </footer>
           
            
        </AuthenticatedLayout>
    );
}
