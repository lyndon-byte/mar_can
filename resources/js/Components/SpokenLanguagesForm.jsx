import InputError from '@/Components/InputError';
import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button , Textarea  } from '@nextui-org/react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";


export default function SpokenLanguagesForm() {

   
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
                <h2 className="text-lg font-medium text-gray-900">Spoken Languages</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Opens up opportunities in roles that specifically require language skills, such as translation, interpretation, customer service, and international business.
                </p>
            </header>

            <form className="mt-3 grid ">
                


                    <div>
                        
                      

                        <Card 
                            radius='sm' 
                            className="w-full mt-2 border-2 shadow-none"
                            classNames={{

                                body: 'shadow-none'
                            }}
                        >
                            
            
                            <CardBody className='p-5'>
                                <p className='text-slate-500'>No entered spoken languages yet</p>
                            </CardBody>
                            <CardFooter  className='justify-end gap-2'>
                            

                                <TextInput
                                    id="email"
                                    type="email"
                                    className=" block max-w-sm"
                                    // value={data.email}
                                    // onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />

                                <Button
                                    radius='sm'
                                    variant='solid'
                                    color='success'
                                    className='text-white'
                                >
                                   Set
                                </Button>
                            </CardFooter>
                        </Card>

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
