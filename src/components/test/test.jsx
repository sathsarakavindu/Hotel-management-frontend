
//import storage from "../../utils/mediaUpload";
import { useState } from "react";
import uploadMedia from "../../utils/mediaUpload.js";

export default function TestComponent(){

      const[file, setFile] = useState(null);


      
        return(
        <div className="bg-red-900 w-full h-[100vh] flex justify-center items-center">
              <input type="file" defaultValue={file} onChange={(e)=>{
                setFile(e.target.files[0])
              }}/>
   
               <button onClick={()=>{
                uploadMedia(file)
               }}>Submit</button>
            </div>
        );
}


















// export default function TestComponent(){

//     const [num, setNum] = useState(0);

//         return(
//         <div className="bg-red-900 w-full h-[100vh] flex justify-center items-center">

//    <div className="bg-white w-[350px] h-[350px] flex justify-center items-center">

//           <button className="bg-blue-400 w-[60px] h-[60px] rounded-full text-[20px] items-center justify-center flex" 
//           onClick={()=>{
//             setNum(()=> num-1);
//           }}
//         >
//               -
//           </button>

//           <span className="text-6xl">{num}</span>

//           <button className="bg-blue-400 w-[60px] h-[60px] rounded-full text-[20px] items-center justify-center flex" 
//           onClick={
//             ()=>{
//                 setNum(()=>{return num+1});
                
//             }
//           }
//           > + </button>

//    </div>
  

//             </div>
//         );
// }