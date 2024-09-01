import React, { useState } from 'react';
import { Link } from '@inertiajs/react';


export default function AdminContainer({head,content}){

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
            <div className="flex ">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-slate-800 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0`} style={{ zIndex: 1000 }}>
                    <div className="flex flex-col h-screen sticky top-0">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Menu</h2>
                                {/* Close button (visible only on small screens) */}
                                <button onClick={toggleSidebar} className="md:hidden text-white focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Sidebar content */}
                        <div className="flex-1 overflow-y-auto  p-6">
                            <ul className="space-y-4">
                                <li><Link href={route('dashboard')} className={`block py-2 px-4 rounded hover:bg-gray-700 ${route().current('dashboard') ? "bg-gray-500" : ""} `}>Dashboard</Link></li>
                                <li><Link href={route('all_applicants')} className={`block py-2 px-4 rounded hover:bg-gray-700 ${route().current('all_applicants') ? "bg-gray-500" : ""} `}>Applicants</Link></li>
                                <li><Link href={route('all_employers')}  className={`block py-2 px-4 rounded hover:bg-gray-700 ${route().current('all_employers') ? "bg-gray-500" : ""} `}>Employers</Link></li>
                                <li><Link href={route('all_jobs')} className={`block py-2 px-4 rounded hover:bg-gray-700 ${route().current('all_jobs') ? "bg-gray-500" : ""} `}>All Jobs</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile menu button */}
                    <header className="bg-gray-800 text-white p-4 md:hidden">
                        <button onClick={toggleSidebar} className="focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </header>

                    <main className="p-6">
                        <header className="text-2xl font-medium">{head}</header>
                        {content}
                    </main>
                </div>
            </div>

    );
};
