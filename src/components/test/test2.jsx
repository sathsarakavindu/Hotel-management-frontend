import { createClient } from '@supabase/supabase-js';
import {useState} from 'react';

const supabaseUrl = "https://okfmvjviftoijhgyekgk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZm12anZpZnRvaWpoZ3lla2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0MjI0MjMsImV4cCI6MjA0Njk5ODQyM30.aAvSiZYkxq8uTHT_Zx3_eXgU8bWdTwEcN0Fm-LIl_Ac";

const supabase = createClient(supabaseUrl, supabaseKey);

const ImageUploader = () =>{
     const [file, setFile] = useState(null);
     const[error, setError] = useState(null);
     const[uploading, setUploading] = useState(false);

     const handleFileChange = (e) =>{
        console.log(e.target.files);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError(null);
     };

     const handleUpload = async () =>{
         if(!file){
            setError("Please select a file first.");
            return;
         }

         try{
            setUploading(true);
            setError(null);

            //Generate a unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            //Upload the file to supabase storage
            const {error: uploadError} = await supabase.storage.from('hotel').upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

            if(uploadError){
                throw uploadError;
            }

            //Get the public URL of the uploaded file
            const {data: {publicUrl}} = supabase.storage.from('hotel').getPublicUrl(filePath);

           console.log('File uploaded successfully:', publicUrl);
           setFile(null);

           //Reset the file input
           const fileInput = document.querySelector('input[type="file"]');

           if(fileInput) fileInput.value = '';
         }
         catch(err){
          console.log('Error uploading: ', err);
          setError(err.message || 'Error uploading file');
         }
         finally{
            setUploading(false);
         }
     };
     
}


