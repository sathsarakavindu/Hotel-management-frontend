// import axios from "axios";
// import  { useState, useEffect } from 'react';

// function UserTag(props){

//    const [name, setName] = useState("");
//    const [userFound, setUserFound] = useState(false);

//   const token = localStorage.getItem("token");



//   useEffect(
//    ()=>{
     

//        if(token != null){
//          console.log( + token);
//          axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/',
//             {
//                headers:{
//                   Authorization: "Bearer "+token,
//                   "Content-Type": "application/json"
//                }
//             }
//          ).then(
//             (res)=>{
//                   console.log(res);
//    setName(res.data.user.firstName + " " + res.data.user.lastName);
//        setUserFound(true);
//             }
//          );
//        }
// else{
//    setName("");
// }
//    },
//    [userFound]
// );

//    return(
//     <div className='absolute right-0 flex items-center cursor-pointer mr-2'>
//         <img className="rounded-full w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
//         src={props.imageLink} />
//      <span className="text-white ml-[5px] text-xl r">{name}</span>
    
//     <button onClick={()=>{
//       localStorage.removeItem("token");
     
//       setUserFound(false);
//     }}>Logout</button>
    
//     </div>
//    );

// }

// export default UserTag;

import axios from "axios";
import { useState, useEffect } from 'react';
import toast from "react-hot-toast";

function UserTag({ imageLink, name: initialName }) {
   const [name, setName] = useState(initialName || "");
   const [userFound, setUserFound] = useState(false);

   const token = localStorage.getItem("token");

   useEffect(() => {
       if(token != null){
           axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/',
               {
                   headers:{
                       Authorization: "Bearer "+token,
                       "Content-Type": "application/json"
                   }
               }
           ).then((res) => {
               if(res.data.user){
                   setName(`${res.data.user.firstName} ${res.data.user.lastName}`);
                   setUserFound(true);
               }
           }).catch((err) => {
               console.error(err);
               toast.error("Failed to fetch user data.");
           });
       } else {
           setName("");
       }
   }, [userFound, token]);

   const handleLogout = () => {
       localStorage.removeItem("token");
       setUserFound(false);
       toast.success("Logged out successfully.");
       window.location.href = "/login";
   };

   return (
    <div className="flex items-center space-x-2">
        <img 
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12" 
            src={imageLink} 
            alt="User Avatar" 
        />
        <span className="text-white text-sm sm:text-base">{name}</span>
        <button 
            onClick={handleLogout} 
            className="text-white text-sm sm:text-base underline hover:text-gray-200"
        >
            Logout
        </button>
    </div>
   );
}

export default UserTag;
