import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <>
          
            <div className="min-h-screen  bg-gray-100">
                <nav class="bg-gray-100 p-4">
                    <div class="container mx-auto">
                        <Link href="/">
                            {/* <ApplicationLogo className="w-20 h-20 fill-current text-red-500" /> */}
                            <span class="text-green-500 text-2xl font-bold">Marcan.</span>
                        </Link>
                    
                    </div>
                </nav>
               <div className='mt-14 flex flex-col sm:justify-center items-center'>

                    

                    <div className={ "w-full sm:max-w-lg mt-6  px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg" }>
                        {children}
                    </div>

                </div>

            </div>

        </>
    );
}
