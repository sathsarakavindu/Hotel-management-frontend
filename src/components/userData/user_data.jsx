import axios from "axios";
import  { useState, useEffect } from 'react';

function UserTag(props){

   const [name, setName] = useState("");
   const [userFound, setUserFound] = useState(false);

  const token = localStorage.getItem("token");

//    const token = localStorage.getItem("token");

//   if(token != null){
//    console.log("Token was taken from user_data" + token);
//    axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/', 
//       {}, {
//         headers:{
//          Authorization: "Bearer " + token,
//          "Content-Type": "application/json"
//         }
//       }
//   ).then((res)=>{
//    console.log(res);
//    setName(res.data.user.firstName + " " + res.data.user.lastName);
//   });

//   }

  useEffect(
   ()=>{
     

       if(token != null){
         console.log( + token);
         axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/',
            {
               headers:{
                  Authorization: "Bearer "+token,
                  "Content-Type": "application/json"
               }
            }
         ).then(
            (res)=>{
                  console.log(res);
   setName(res.data.user.firstName + " " + res.data.user.lastName);
       setUserFound(true);
            }
         );
       }
else{
   setName("");
}
   },
   [userFound]// This is the dependency array of useEffect Hook.
);

   return(
    <div className='absolute right-0 flex items-center cursor-pointer'>
        <img className="rounded-full w-[75px] h-[75px]"
        src={props.imageLink} />
     <span className="text-white ml-[5px] mr-[10px] text-xl">{name}</span>
    
    <button onClick={()=>{
      localStorage.removeItem("token");
     
      setUserFound(false);
    }}>Logout</button>
    
    </div>
   );

}

export default UserTag;