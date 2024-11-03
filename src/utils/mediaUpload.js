import app from '../config/firebase'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage(app, "gs://imagesave-5292f.appspot.com");

export default function uploadMedia(file){

    if(file == null){
        return;
    }
    const fileRef = ref(storage, file.name);

   return uploadBytes(fileRef, file)

}
/*
.then((snapshot)=>{
       getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url);
       })
    })
*/