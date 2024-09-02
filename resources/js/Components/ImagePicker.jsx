// PdfDropzone.js
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from '@inertiajs/react';


export default function ImagePicker(){

  

  const { data, setData, post } = useForm({

     pdf: '',

  });

  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({

    accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'image/gif': ['.gif'],
        
      },
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          const fileUrl = URL.createObjectURL(file);
          setPdfUrl(fileUrl);
          setData('pdf',file);
         
        }
      },

  });


  useEffect(() => {

    if(data.pdf !== ''){

    //   post('/set-resume-file',{forceFormData: true, preserveState: true, onSuccess: () => {setIsOpenModal(true)}})

   }

  },[data.pdf])

  return (
    <div>
            
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={{
          border: '2px dashed #cccccc',
          borderRadius: '4px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        <p className='text-slate-500'>Drag 'n' drop a &nbsp;<i class="fa-solid fa-image"></i>&nbsp; image file here, or click to select one </p>
      </div>
      
    </div>
  );
};



