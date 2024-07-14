import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button , Textarea } from '@nextui-org/react';

export default function ProfessionalSummaryForm() {

   
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
                <h2 className="text-lg font-medium text-gray-900">Professional Summary</h2>

                <p className="mt-1 text-sm text-gray-600">
                    It provides a brief overview of your skills, experience, and career goals. It serves as a snapshot of your professional profile, giving potential employers a quick insight.
                </p>
            </header>

            <form className="mt-5 grid ">
                


                    <div>
                        
                      

                        <Textarea
                        //   key={variant}
                            variant="bordered"
                            radius="sm"
                            color="success"
                            placeholder="Enter your summary"
                            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                        />

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
