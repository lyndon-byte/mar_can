import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@nextui-org/react';

export default function ContactInformationForm({user}) {

   
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({

        name: user.name + " " + user.last_name,
        email: user.email


    });



    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'));
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                     Some informations here provides a way for potential employers to reach you easily for interviews, job offers, and follow-up questions
                </p>
            </header>

            <form className="mt-3 grid grid-cols-2 gap-10">
                <div>
                    <div>
                        
                        <InputLabel className='mt-2' htmlFor="full_name" value="Full Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            
                        />

                    </div>

                    
                    <div>
                            <InputLabel  className='mt-2' htmlFor="email_address" value="Email Address" />

                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />

                            {/* <InputError className="mt-2" message={errors.email} /> */}
                    </div>

                    <div>
                        <InputLabel className='mt-2' htmlFor="phone_number" value="Phone Number" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        {/* <InputError className="mt-2" message={errors.name} /> */}
                    </div>


              

                </div>
                <div>
                    <div>
                        <InputLabel className='mt-2' htmlFor="street_address" value="Street Address" />

                        <TextInput

                            id="name"
                            className="mt-1 block w-full"
                            // value={user.role}
                            isReadOnly
                            
                        />

                        

                    </div>

                    <div>
                        <InputLabel className='mt-2' htmlFor="city" value="City" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            // value={data.name}
                            // onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        {/* <InputError className="mt-2" message={errors.name} /> */}
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <InputLabel className='mt-2' htmlFor="state" value="Province or State" />

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
                            <InputLabel className='mt-2' htmlFor="postal_code" value="Postal Code" />

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
                                <InputLabel className='mt-2' htmlFor="country" value="Country" />

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

                        
                    </div>

                    <Button 

                        className='float-end mt-10 text-white bg-slate-700' 
                        radius='sm'                       
                    >
                        Save 

                    </Button>
                    
                </div>
            </form>
        </section>
    );
}
