import app from '../config/firebase'
import { createClient } from '@supabase/supabase-js';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage(app, "gs://imagesave-5292f.appspot.com");

const supabaseUrl = "https://okfmvjviftoijhgyekgk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZm12anZpZnRvaWpoZ3lla2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0MjI0MjMsImV4cCI6MjA0Njk5ODQyM30.aAvSiZYkxq8uTHT_Zx3_eXgU8bWdTwEcN0Fm-LIl_Ac";

export const supabase = createClient(supabaseUrl, supabaseKey);

export default function uploadMedia(file){

    if(file == null){
        return;
    }
    const fileRef = ref(storage, file.name);

   return uploadBytes(fileRef, file)

}

export function uploadMediaToSupabase(file){

  if(!file){
    console.log("No file selected");
    return;
  }
 return supabase.storage.from('images').upload(file.name, file, {
    cacheControl: '3600',
    upsert: false
  })


}
/*
.then((snapshot)=>{
       getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url);
       })
    })
*/