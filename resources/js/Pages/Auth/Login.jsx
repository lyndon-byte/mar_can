import { useEffect, useState } from 'react';
import { Checkbox,Button } from '@nextui-org/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {

    const [isRemember,setIsRemember] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: isRemember,
    });

   
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const toggleVisibilityForPassword = () => setIsVisiblePassword(!isVisiblePassword)

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = () => {
        

        post(route('login'));

    };



    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div>
                <Link href="/">
                           
                    <h3 className='text-2xl text-center mt-5 mb-10 text-slate-500'>Log in to Marcan</h3>
       
                </Link>
            </div>
            
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        isInvalid={errors.email ? true : false}
                        errorMessage={errors.email}
                    />

                    
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                        isInvalid={errors.password ? true : false}
                        errorMessage={errors.password}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibilityForPassword}>
                              {isVisiblePassword ? (
                                <i class="fa-solid fa-eye text-slate-600"></i>
                              ) : (
                                <i class="fa-solid fa-eye-slash text-slate-600"></i>
                              )}
                            </button>
                        }
                        type={isVisiblePassword ? 'text' : 'password'}
                    />

                    
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                    <Checkbox color='success' isSelected={isRemember} radius='sm' onValueChange={setIsRemember}>
                        Remember me
                    </Checkbox>
                        {/* <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        /> */}
                        <span className="ms-2 text-sm text-gray-600"></span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button onPress={() => submit()} color="success" className="ms-4 text-white" radius='sm' isLoading={processing}>
                        Log in
                    </Button>
                </div>
            
        </GuestLayout>
    );
}
