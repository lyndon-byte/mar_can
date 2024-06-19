import { Link, Head } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';



export default function Welcome({ auth, laravelVersion, phpVersion }) {

   const servicesRef = useRef(null)
   const aboutRef = useRef(null)
   const testimonialsRef = useRef(null)
   const contactRef = useRef(null)


   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


   const scrollToSection = (ref) => {
     ref.current.scrollIntoView({ behavior: 'smooth' });
   };

   const [openResponsiveNavOption,setOpenResponsiveNavOption] = useState(false);

   const handleResponsiveOptionSelection = (ref) => {

      scrollToSection(ref)
      setOpenResponsiveNavOption(false)
   }
    return (
        <>
            <Head title="Welcome" />

            <div>
              {isVisible && (
                <button className='inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150' onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                   <i className='fa-solid fa-arrow-up'></i>
                </button>
              )}  
             </div>

                <div class="bg-white">
                <header class="absolute inset-x-0 top-0 z-50 ">
                    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div class="flex lg:flex-1">
                        <a href="#" class="-m-1.5 p-1.5 text-white">
                        
                           Marcan

                        </a>
                    </div>
                    <div class="flex lg:hidden">
                        <button type="button" onClick={() => setOpenResponsiveNavOption(true)} class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
                        <span class="sr-only">Open main menu</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        </button>
                    </div>
                    <div class="hidden lg:flex lg:gap-x-12">
                        <button href="#" class="text-sm font-semibold leading-6 text-slate-100"  onClick={() => scrollToSection(servicesRef)}>Services</button>
                        <button href="#" class="text-sm font-semibold leading-6 text-slate-100" onClick={() => scrollToSection(aboutRef)}>About Us</button>
                        <button href="#" class="text-sm font-semibold leading-6 text-slate-100" onClick={() => scrollToSection(testimonialsRef)}>Testimonials</button>
                        <button href="#" class="text-sm font-semibold leading-6 text-slate-100" onClick={() => scrollToSection(contactRef)}>Contact Us</button>
                    </div>
                    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                                {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="font-semibold text-slate-100 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="text-sm font-semibold leading-6 text-slate-100 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                            >
                                                Log in
                                                
                                            </Link>

                                            <Link
                                                href={route('register')}
                                                className="ms-4 text-sm font-semibold leading-6 text-slate-100 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                        {/* <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in</a>
                        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Register</a> */}

                    </div>
                    </nav>
                    { openResponsiveNavOption && (

                        <div class="lg:hidden" role="dialog" aria-modal="true">
                                              
                          <div class="fixed inset-0 z-50"></div>
                          <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                              <div class="flex items-center justify-between">
                              <a href="#" class="-m-1.5 p-1.5">
                                  <span class="sr-only">Your Company</span>
                                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                              </a>
                              <button type="button" onClick={() => setOpenResponsiveNavOption(false)} class="-m-2.5 rounded-md p-2.5 text-gray-700">
                                  <span class="sr-only">Close menu</span>
                                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                              </button>
                              </div>
                              <div class="mt-6 flow-root">
                              <div class="-my-6 divide-y divide-gray-500/10">
                                  <div class="space-y-2 py-6">
                                      <button class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => handleResponsiveOptionSelection(servicesRef)}>Services</button>
                                      <button class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => handleResponsiveOptionSelection(aboutRef)}>About Us</button>
                                      <button class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => handleResponsiveOptionSelection(testimonialsRef)}>Testimonials</button>
                                      <button class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => handleResponsiveOptionSelection(contactRef)}>Contact Us</button>
                                  </div>
                                  <div class="py-6">
                                    {auth.user ? (

                                          <Link href={route('dashboard')} class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Dashboard</Link>

                                      ) : (
                                          <>

                                              <Link href={route('login')} class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</Link>

                                              <Link href={route('register')} class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Register</Link>

                                          </>
                                      )}  
                                   
                                  </div>
                              </div>
                              </div>
                            </div>
                        </div>

                      )



                    }

                 
                    
                </header>
                
                <div class="relative isolate px-6 pt-14 lg:px-8">
                    
                   <div className="hero-background" aria-hidden="true"></div>
                    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">


                    <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div class="relative rounded-full px-3 py-1 text-2xl leading-6 text-white ring-1 ring-white hover:ring-gray-900/20">
                          Marcan Visa Consultancy 
                        </div>
                    </div>
                    <div class="text-center">
                        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Dream, Work & Succeed</h1>
                        <p class="mt-6 text-lg leading-8 text-slate-200">A visa consultancy that serves every filipino applicants for canadian dream</p>
                        <div class="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#" class="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Get started</a>
                        <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                    </div>
                   
                </div>
             </div>
             
 <section ref={servicesRef} class="bg-white py-24 sm:py-32" >
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="font-semibold leading-7 text-xl text-red-500">" The best immigration consultancy in negros and panay "</h2>
      <p class="mt-5 text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">What can we offer?</p>
      <p class="mt-6 text-lg leading-8 text-gray-600"></p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
            <i class="fa-solid fa-school text-white"></i>
            </div>
            Student Visa
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
              <i class="fa-solid fa-briefcase text-white"></i>
            </div>
            Working Visa
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
              <i class="fa-solid fa-globe text-white"></i>
            </div>
            Visitor Visa
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
                <i class="fa-brands fa-canadian-maple-leaf text-white"></i>
            </div>
            Permanent resident visa
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
                <i class="fa-solid fa-users text-white"></i>
            </div>
            Citizenship
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600">Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.</dd>
        </div>
      </dl>
    </div>
  </div>
</section>


<section ref={aboutRef}>

       <header class="text-center py-12">
            <h1 class="text-4xl md:text-5xl font-bold leading-tight text-gray-800">About Us</h1>
            <p class="text-lg text-gray-600 mt-10">We are processing center direct to Canada,locally in Bacolod City, Negros Occidental</p>
        </header>
        <div class="py-16 bg-white">  
        <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div class="md:5/12 lg:w-5/12">
                <img src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png" alt="image" loading="lazy" width="" height=""/>
              </div>
              <div class="md:7/12 lg:w-6/12">
                <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">We Rise Above!</h2>
                <p class="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
                <p class="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
              </div>
            </div>
        </div>
      </div>             

</section>


<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
    <div class="max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper suspendisse.</p>
    </div>
    <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
      <li>
        <div class="flex items-center gap-x-6">
          <img class="h-16 w-16 rounded-full" src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg" alt=""/>
          <div>
            <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">Nestor Aprecio</h3>
            <p class="text-sm font-semibold leading-6 text-red-500">Consultant / CEO</p>
          </div>
        </div>
      </li>
      <li>
        <div class="flex items-center gap-x-6">
          <img class="h-16 w-16 rounded-full" src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg" alt=""/>
          <div>
            <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">Juan Dela Cruz</h3>
            <p class="text-sm font-semibold leading-6 text-red-500">Position</p>
          </div>
        </div>
      </li>
          
    
    </ul>
  </div>
</div>          


<section class="bg-white dark:bg-gray-900">
    <div class="max-w-6xl px-6 py-10 mx-auto">
        

       

        <main class="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div class="absolute w-full bg-red-500 -z-10 md:h-96 rounded-2xl"></div>
            
            <div class="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                <img class="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f2/6b/caption.jpg?w=1400&h=1400&s=1" alt="client photo" />
                
                <div class="mt-2 md:mx-6">

                    <div>
                      <h1 class="mt-2 text-2xl font-semibold text-white capitalize lg:text-3xl dark:text-white">
                        Our Mission
                      </h1>
                    </div>

                    <p class="mt-4 text-lg leading-relaxed text-white md:text-xl"> “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda”.</p>
                    
                   
                </div>
            </div>
        </main>
    </div>

    <div class="max-w-6xl px-6 py-10 mx-auto">
       

        <main class="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div class="absolute w-full bg-red-500 -z-10 md:h-96 rounded-2xl"></div>
            
            <div class="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                <img class="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl" src="https://www.planetware.com/wpimages/2022/02/canada-tourist-attractions-quebec-city-chateau-frontenac-boardwalk.jpg" alt="client photo" />
                
                <div class="mt-2 md:mx-6">
                    <div>
                      <h1 class="mt-2 text-2xl font-semibold text-white capitalize lg:text-3xl dark:text-white">
                        Our Vision
                      </h1>
                    </div>

                    <p class="mt-4 text-lg leading-relaxed text-white md:text-xl"> “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda”.</p>
                    
                   
                </div>
            </div>
        </main>
    </div>
</section>


       
               

{/* Testimonials */}

<section ref={testimonialsRef}>
      
<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Testimonials</h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">Learn how Filipinos reached their dreams with our expert advice.</p>
    </div>
    <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <article class="flex max-w-xl flex-col items-start justify-between">
        <div class="flex items-center gap-x-4 text-xs">
          <time datetime="2020-03-16" class="text-gray-500">Mar 16, 2020</time>
         
        </div>
        <div class="group relative">
          
          <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4">
          <img src="https://live.staticflickr.com/7570/15633581340_5974b86d88_z.jpg" alt="" class="h-10 w-10 rounded-full bg-gray-50"/>
          <div class="text-sm leading-6">
            <p class="font-semibold text-gray-900">
              <a href="#">
                <span class="absolute inset-0"></span>
                 Juan Dela cruz
              </a>
            </p>
            <p class="text-gray-600">Medical Nurse / Toronto General Hospital </p>
          </div>
        </div>
      </article>
      <article class="flex max-w-xl flex-col items-start justify-between">
        <div class="flex items-center gap-x-4 text-xs">
          <time datetime="2020-03-16" class="text-gray-500">Jul 23, 2023</time>
         
        </div>
        <div class="group relative">

          <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnB7uV7LSN5t4-IqNvnkMxoUF4HfD0Tf90iQ&s" alt="" class="h-10 w-10 rounded-full bg-gray-50"/>
          <div class="text-sm leading-6">
            <p class="font-semibold text-gray-900">
              <a href="#">
                <span class="absolute inset-0"></span>
                 Ben Naig
              </a>
            </p>
            <p class="text-gray-600">Trucker / Challenger Motor Freight (Cambridge)</p>
          </div>
        </div>
      </article>
      <article class="flex max-w-xl flex-col items-start justify-between">
        <div class="flex items-center gap-x-4 text-xs">
          <time datetime="2020-03-16" class="text-gray-500">April 16, 2024</time>
         
        </div>
        <div class="group relative">
          
          <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4">
          <img src="https://live.staticflickr.com/7310/13197804604_747bc05acb_z.jpg" alt="" class="h-10 w-10 rounded-full bg-gray-50"/>
          <div class="text-sm leading-6">
            <p class="font-semibold text-gray-900">
              <a href="#">
                <span class="absolute inset-0"></span>
                Kyle kabayan
              </a>
            </p>
            <p class="text-gray-600">Chef / Toqué! (Montreal, Quebec)</p>
          </div>
        </div>
      </article>
    
    </div>
  </div>
</div>

</section>



<section class="bg-white dark:bg-gray-900 mb-48" ref={contactRef}>
    <div class="container px-6 py-12 mx-auto">
        <div class="text-center">
            <p class="font-medium text-red-500 dark:text-blue-400">Contact us</p>

            <h1 class="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Get in touch</h1>

            <p class="mt-3 text-gray-500 dark:text-gray-400">Our friendly team is always here to assist.</p>
        </div>

        <div class="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-center justify-center text-center">
                <span class="p-3 text-red-500 rounded-full bg-red-100/80 dark:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </span>

                <h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Email</h2>
                <p class="mt-2 text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                <p class="mt-2 text-red-500 dark:text-blue-400">marcanvisaconsultancy2024@gmail.com</p>
            </div>

            <div class="flex flex-col items-center justify-center text-center">
                <span class="p-3 text-red-500 rounded-full bg-red-100/80 dark:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                </span>
                
                <h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Office</h2>
                <p class="mt-2 text-gray-500 dark:text-gray-400">Come say hello at our office</p>
                <p class="mt-2 text-red-500 dark:text-blue-400">Door No.4 JP Building, Corner Rosario Verbena St. Brgy. 33, Bacolod City, Negros Occidental</p>
            </div>

            <div class="flex flex-col items-center justify-center text-center">
                <span class="p-3 text-red-500 rounded-full bg-red-100/80 dark:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                </span>
                
                <h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Phone</h2>
                {/* <p class="mt-2 text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p> */}
                <p class="mt-2 text-red-500 dark:text-blue-400">+639127709548</p>
            </div>
        </div>
    </div>
</section>

        <div class="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                <div class="max-w-xl lg:max-w-lg">
                    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
                    <p class="mt-4 text-lg leading-8 text-gray-300">Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
                    <div class="mt-6 flex max-w-md gap-x-4">
                    <label for="email-address" class="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter your email"/>
                    <button type="submit" class="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Subscribe</button>
                    </div>
                </div>
                <dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                    <div class="flex flex-col items-start">
                    <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                    </div>
                    <dt class="mt-4 font-semibold text-white">Weekly articles</dt>
                    <dd class="mt-2 leading-7 text-gray-400">Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.</dd>
                    </div>
                    <div class="flex flex-col items-start">
                    <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                        </svg>
                    </div>
                    <dt class="mt-4 font-semibold text-white">No spam</dt>
                    <dd class="mt-2 leading-7 text-gray-400">Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.</dd>
                    </div>
                </dl>
                </div>
                </div>
                    {/* <div class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                        <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
                    </div> */}
            </div>
            
            <footer class="bg-gray-900 text-white py-4">
                <div class="container mx-auto text-center">
                    <p class="mb-2">&copy; 2024 Marcan Visa Consultancy</p>
                    <p class="text-gray-500">All rights reserved.</p>
                </div>
           </footer> 


        </>       
        
    );
}
