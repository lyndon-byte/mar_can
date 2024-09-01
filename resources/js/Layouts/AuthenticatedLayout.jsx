import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { useRef } from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link ,usePage, router } from '@inertiajs/react';
import { Avatar,Badge, Button, Input,Tooltip } from '@nextui-org/react';
import TextInput from '@/Components/TextInput';
import AdminContainer from '@/Components/AdminContainer';

export default function Authenticated({ user, header, children }) {
    
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { auth } = usePage().props;

    const { component } = usePage()

    const ringtonePlayer = useRef(null)

    function handleShowMessaging(){

        router.get('/messaging');
    }
   
  
    useEffect(() =>{

      

        var pusher = new Pusher("abf3fa130d1cb3aff19d", {

            cluster: "ap1",

        });

        var channel = pusher.subscribe("message-channel");

        channel.bind("message-received", (data) => {

            if(user.email === data.receiver){


                var originalTitle = document.title;
            
                // Function to blink the title
                var blinkTitle = function() {

                    document.title = (document.title === originalTitle) ? 'New Message' : originalTitle;
                };
                
                // Interval to blink the title (every 500 milliseconds)
                var intervalId = setInterval(blinkTitle, 500);
                
                // Change the title back to the original after 3000 milliseconds (3 seconds)
                setTimeout(function() {
                    clearInterval(intervalId); // Stop the blinking
                    document.title = originalTitle; // Restore the original title
                }, 3000);
            
                ringtonePlayer.current.play()

                router.reload({preserveState: true})
            }
            
        });

    },[])

    return (
        <div className="min-h-screen bg-gray-100">
            <audio ref={ringtonePlayer} src="/notification.mp3" ></audio>
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-20" >
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    {/* <ApplicationLogo className="block h-9 w-auto fill-current text-red-500" /> */}
                                    <h3 className='text-2xl text-green-600'> Marcan.</h3>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                               
                                {
                                    user.role !== 'SuperAdmin' && (

                                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                            { user.role === 'Applicant' ? 'Home' : 'Dashboard' }
                                        </NavLink>

                                    ) 

                                }

                                { user.role === 'Applicant' ? (

                                        <NavLink href={route('applied_jobs')} active={route().current('applied_jobs')}>
                                               Applied Jobs                             
                                        </NavLink>


                                     ): (


                                        <>

                                        </>


                                     )
                                
                                }
                                

                                { user.role === 'SuperAdmin' && (

                                    <>

                                        {/* <NavLink href={route('all_applicants')} active={route().current('all_applicants')}>
                                            Applicants                           
                                        </NavLink>
                                        <NavLink href={route('all_employers')} active={route().current('all_employers')}>
                                            Employers                           
                                        </NavLink>
                                        <NavLink href={route('all_jobs')} active={route().current('all_jobs')}>
                                            Job Listings                           
                                        </NavLink> */}
                                        
                                    </>


                                )}
                            
                                    
                            
                               
                               
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            
                                   
                            <Badge content={auth.user.new_message_count}  size='md' color="danger">
                                <Tooltip content="Messages" className='bg-slate-900 text-white' >
                                    <Button 
                                      isIconOnly 
                                      color="success" 
                                      className='border-0 text-lg'   
                                      variant='ghost' 
                                      aria-label="Like"
                                      onClick={handleShowMessaging}
                                      
                                    >
                                        <i class="fa-solid fa-message"></i>
                                    </Button>  
                                </Tooltip>
                            </Badge>
                            
                              
                            <div className=" relative">
                                
                                <Dropdown>
                                        
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}       

                                                <Avatar size='sm' className='ms-3' showFallback src='https://images.unsplash.com/broken' />

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}><i class="fa-solid fa-user"></i> &nbsp; User Profile</Dropdown.Link>
                                        {
                                            user.role === 'Applicant' ? (

                                                <Dropdown.Link href={route('employment.profile')}><i class="fa-solid fa-briefcase"></i> &nbsp; Employment Profile</Dropdown.Link>

                                            ) : user.role === 'Employer' ? (

                                               
                                                <Dropdown.Link href={route('org.profile')}><i class="fa-solid fa-briefcase"></i> &nbsp; Organization Profile</Dropdown.Link>
                                            
                                            ) : (

                                                <>
                                                
                                                </>
                                            )

                                        }
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            <i class="fa-solid fa-right-from-bracket"></i> &nbsp;   Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                

                                    {

                                        user.role === 'SuperAdmin' ? (

                                            <svg
                                                className=" -me-0.5 h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />

                                                <path
                                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                    fillRule="evenodd"
                                                    d="M5.293 12.707a1 1 0 011.414 0L10 9.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414z"
                                                    clipRule="evenodd"
                                                />

                                            </svg>

                                        ) : (

                                             <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                                <path
                                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                                <path
                                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg> 

                                        )


                                    }

                                    
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            { user.role === 'Applicant' ? 'Home' : 'Dashboard' }
                        </ResponsiveNavLink>
                        { user.role === 'Applicant' ? (

                            <ResponsiveNavLink href={route('applied_jobs')} active={route().current('applied_jobs')}>
                                Applied Jobs                             
                            </ResponsiveNavLink>


                            ): (


                            <>
                                
                            </>
                        )}

                        
                        { user.role === 'SuperAdmin' && (

                        <>

                            <ResponsiveNavLink href={route('all_applicants')} active={route().current('all_applicants')}>
                                Applicants                           
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('all_employers')} active={route().current('all_employers')}>
                                Employers                           
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('all_jobs')} active={route().current('all_jobs')}>
                                Job Listings                           
                            </ResponsiveNavLink>
                            
                        </>


                        )}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>User Profile</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('employment.profile')}>Employment Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

            

            {

                user.role === 'SuperAdmin' ? (

                   

                    component === 'Messenger' ? (

                        <main>{children}</main>

                    ) : (

                        <AdminContainer
                    
                            head={header}
                            content={children}

                        />

                    )

                ) : (

                    <main>{children}</main>
                )

            }

        </div>
    );
}
