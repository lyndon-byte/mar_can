import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button , DatePicker } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";


export default function CharacterReferencesForm() {

   
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({

        // name: user.name + " " + user.last_name,
        // email: user.email


    });



    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'));
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Character References</h2>

                <p className="mt-1 text-sm text-gray-600">

                    References can vouch for your honesty, integrity, and ethical behavior, which are critical traits for any professional.

                </p>
                
            </header>

            <form >
                
                <div className="mt-3 grid grid-cols-3 gap-5">

                    <div>
                            <InputLabel  className='mt-2' htmlFor="name" value="Name" />

                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                // value={data.email}
                                // onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />

                            {/* <InputError className="mt-2" message={errors.email} /> */}
                    </div>


                    <div>

                            <InputLabel  className='mt-2' htmlFor="number" value="Contact Number" />

                            <TextInput

                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                // value={data.email}
                                // onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                        {/* <InputError className="mt-2" message={errors.name} /> */}
                        
                    </div>

                    <div>
                        
                        <InputLabel className='mt-2' htmlFor="job_title" value="Job title" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            // value={data.name}
                            // onChange={(e) => setData('name', e.target.value)}
                            
                        />

                    </div>

                    
                    <div>

                        <InputLabel className='mt-2' htmlFor="company name" value="Company Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            // value={data.name}
                            // onChange={(e) => setData('name', e.target.value)}
                            
                        />

                        {/* <InputError className="mt-2" message={errors.name} /> */}

                    </div>

                  </div>
                        
                <div className='grid justify-end'>
                    <Button 

                        className='mt-10 max-w-sm text-white bg-slate-700' 
                        radius='sm'                       
                        >
                        Save

                    </Button>
                </div>

                </form>
        </section>
    );
}
