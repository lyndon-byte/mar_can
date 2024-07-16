// PdfDropzone.js
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from '@inertiajs/react';


export default function ResumePicker(){

  

  const { data, setData, post } = useForm({

     pdf: '',

  });

  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({

      accept: {

        'application/pdf': ['.pdf'],

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

      post('/set-resume-file',{forceFormData: true, preserveState: true, onSuccess: () => {setIsOpenModal(true)}})

   }

  },[data.pdf])

  return (
    <div>
             <header>
                        <h2 className="text-lg font-medium text-gray-900">Fill out your employment profile information</h2>

                        <p className="mt-1 text-sm text-gray-600 mb-4">

                              Please upload your resume
                                
                        </p>

                </header>
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
        <p className='text-slate-500'>Drag 'n' drop a &nbsp;<i class="fa-solid fa-file-pdf text-2xl"></i>&nbsp; PDF file here, or click to select one </p>
      </div>
      
    </div>
  );
};



