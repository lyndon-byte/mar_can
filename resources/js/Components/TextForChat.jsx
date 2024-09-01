import React from 'react';
import { Avatar } from '@nextui-org/react';

export default function TextForChat ({ reference,text,type}) {
    // Split the string into words
    const words = text.split(' ');

    // Group the words into chunks of 10
    const lines = [];
    for (let i = 0; i < words.length; i += 10) {
        lines.push(words.slice(i, i + 10).join(' '));
    }

    return (
       
       <>
            
            <p ref={reference} className={'rounded-3xl p-5 mb-1 w-fit rounded-bl-none ' + (type == 'inbound' ? 'bg-slate-700 text-white' : 'bg-white text-dark')} >
                {lines.map((line, index) => (
                    // Add a unique key for each line
                    <React.Fragment key={index}>
                        {line}
                        {/* Insert a line break after each line except the last one */}
                        {index !== lines.length - 1 && <br />}
                    </React.Fragment>
                ))}
                <br />
               
            </p>    
            
       </>
           
       
    );
};


