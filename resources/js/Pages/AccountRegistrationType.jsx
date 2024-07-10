import { Head, Link, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';
import { Button, RadioGroup, Radio, useRadio, VisuallyHidden, cn} from "@nextui-org/react";



export default function AccountRegistrationType(){

    const [selectedType,setSelectedType] = useState('')
    
    const [buttonLoading,setButtonLoading] = useState(false)

    const CustomRadio = (props) => {
        const {
          Component,
          children,
          isSelected,
          description,
          getBaseProps,
          getWrapperProps,
          getInputProps,
          getLabelProps,
          getLabelWrapperProps,
          getControlProps,
        } = useRadio(props);
      
        return (
          <Component
            {...getBaseProps()}
            className={cn(
              "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
              "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
              "data-[selected=true]:border-success ",
            )}
          >
            <VisuallyHidden>
              <input {...getInputProps()} />
            </VisuallyHidden>
            <span {...getWrapperProps()}>
              <span {...getControlProps()} />
            </span>
            <div {...getLabelWrapperProps()}>
              {children && <span {...getLabelProps()}>{children}</span>}
              {description && (
                <span className="text-xl text-foreground opacity-70">{description}</span>
              )}
            </div>
          </Component>
        );
    };
    
    function handleSelection(string){

        setSelectedType(string)
    }

    function handleSetAccountType() {

        router.get('/register',{type: selectedType},
        
            { 
                
                onStart: function(){

                    setButtonLoading(true)

                },
                onSuccess: function(){

                    setButtonLoading(false)

                }
            
            }
        
        )

    }

    return (

        <GuestLayout>

            <Head title="Account Type Selection" />

                <h3 className='text-3xl text-slate-500 mb-10 mt-5 text-center'> Join as applicant or employer</h3>
                           
            <RadioGroup
                classNames={{

                    wrapper: 'mx-auto grid grid-cols-2 gap-5',
                    
                }}
                onValueChange={handleSelection}
            >
                <CustomRadio color="success" description="I'm an applicant, looking for employer" value="Applicant">
                    <i class="fa-solid fa-user mb-4 text-2xl text-slate-700"></i>
                </CustomRadio>
                <CustomRadio color="success" description="I'm an employer, hiring an applicant" value="Employer">
                     <i class="fa-solid mb-4 fa-briefcase text-2xl text-slate-700"></i>
                </CustomRadio>
              
            </RadioGroup>
            <div className='flex justify-center'>
                <Button 
                  radius='sm' 
                  className='mt-10 mb-10 bg-slate-700 text-white'
                  onPress={() => handleSetAccountType()}
                  isLoading={buttonLoading}
                  isDisabled={selectedType !== '' ? false : true}
                  
                >
                   {selectedType == 'Applicant' ? 'Apply to a job' : selectedType == '' ? 'Create an account' : 'Join as employer' }

                </Button>
            </div>
            <div className="flex justify-center mt-4 mb-4 text-gray-600">

                <span> Already have an account? <Link
                        href={route('login')}
                        className="underline text-success-600 hover:text-gray-500 rounded-md"
                    >
                        Login
                    </Link>
                </span>

                 
            </div>

        </GuestLayout>
    )

}