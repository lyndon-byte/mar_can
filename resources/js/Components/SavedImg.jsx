
import { Button ,Tooltip } from "@nextui-org/react"
import { router } from "@inertiajs/react"
import { useState,useEffect } from "react"



export default function SavedImg({fileName,usedBy}){

    const [isEditImg,setIsEditImg] = useState(false)

    function handleDeleteImg(){

        switch(usedBy){

            case 'hero':

                router.post('/delete-jumbotron-img',{},{preserveState: true});

            break;

            case 'about':

                router.post('/delete-about-img',{},{preserveState: true});

            break;

            case 'mission':

                 router.post('/delete-mission-img',{},{preserveState: true});

            break;

            case 'vision':

                router.post('/delete-vision-img',{},{preserveState: true});

            break;

            case 'milestone':

            break;

            case 'testimonial':

            break;
            
        }

        
    }


    return (

        <>
        
            <div class="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
                
                <dd class="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div class="flex w-0 flex-1 items-center">
                            <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                            </svg>
                            <div class="ml-4 flex min-w-0 flex-1 gap-2">
                            <span class="truncate font-medium">{fileName}</span>
                        
                            </div>
                        </div>
                        <div class="ml-4 flex-shrink-0">
                        
                             <Tooltip content="Delete this file" className='bg-slate-900 text-white' radius='sm'>
                                <Button 
                                    size="lg"
                                    isIconOnly
                                    variant="ghost"
                                    className="border-0"
                                    color="danger"
                                    onPress={() => handleDeleteImg()}
                                >
                                    <i class="fa-solid fa-trash"></i>

                                </Button>
                            </Tooltip>
                        
                    
                            
                        </div>
                        </li>
                    
                    </ul>
                </dd>
            </div>
        
        </>
    )

}