import { useState } from "react"
import { uploadMediaToSupabase, supabase } from "../../utils/mediaUpload";


export function UploadComponent(){
    const [file, setFile] = useState(null);

function handleClick(){
    uploadMediaToSupabase(file).then((res)=>{
        console.log(res)
    })
   const url = supabase.storage.from('images').getPublicUrl(file.name);
   console.log(url.data.publicUrl);
}

    return(
        <div>
            <input onChange={(e)=>{
                setFile(e.target.files[0])
            }} type="file"/>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}