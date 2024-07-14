import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button , DatePicker } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";


export default function WorkExperienceForm() {

   
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
                <h2 className="text-lg font-medium text-gray-900">Work Experiences</h2>

                <p className="mt-1 text-sm text-gray-600">

                    Demonstrates your ability to perform tasks and responsibilities similar to those required in the new role.

                </p>
            </header>

            <form >
                
                <div className="mt-3 grid grid-cols-3 gap-5">

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
                            <InputLabel  className='mt-2' htmlFor="company_name" value="Company Name" />

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

                        <InputLabel className='mt-2' htmlFor="employment_dates" value="Start date" />

                        <DatePicker className='mt-1' radius='sm' color='success' variant="bordered" showMonthAndYearPickers/>

                        {/* <InputError className="mt-2" message={errors.name} /> */}
                    </div>

                    <div>

                        <InputLabel htmlFor="employment_dates" value="End date" />

                        <DatePicker className='mt-1' radius='sm' color='success' variant="bordered" showMonthAndYearPickers/>

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
