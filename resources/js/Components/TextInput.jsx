import { forwardRef, useEffect, useRef } from 'react';
import {Input} from "@nextui-org/react";


export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

   

    return (

        <Input 

            {...props}
           
            className={
                
                className
            }
            type={type}
            variant="bordered"
            radius='sm'
            color='success'
            
       />
       
    );
});
