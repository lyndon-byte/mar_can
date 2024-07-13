
import { Link, Button } from "@nextui-org/react";


export default function ProfileCompletionBanner({profile_name}){

    return (

            <div className='grid grid-cols-1 sm:grid-cols-2'>

                        <div className="p-24 m-auto text-3xl  text-gray-900">Welcome <span className='font-bold'>{profile_name}! </span> 
                        
                                <br/>
                                <span className='text-xl text-gray-600'>Thank you for choosing our company as part of your employment journey in Canada <i class="fa-brands fa-canadian-maple-leaf text-2xl"></i> </span>
                                <br/>
                                <span className='text-xl'>To get started, please fill out your employment profile.</span>
                                <br/>
                                <Button
                                
                                    href="/employment-profile"
                                    as={Link}
                                    showAnchorIcon
                                    variant="solid"
                                    className='mt-4 text-white bg-slate-700'
                                    radius='sm'

                                    >
                                    Fill Out Your Profile
                                </Button>

                        </div>
                        <div className='p-24'>
                                <img src="/welcome_applicant.avif" alt=""  />
                        </div>
            </div>

    )
}