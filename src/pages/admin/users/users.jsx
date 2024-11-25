// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function Users(){
//   const [userList, getUserList] = useState([]);
// //   const [fName, getFname] = useState("");
// //   const [lName, getLname] = useState("");
// //   const [email, getEmail] = useState("");
// //   const [wts, getwhatsapp] = useState("");
// //   const [contact, getContact] = useState("");
// //   const [satatus, getStatus] = useState("");
//   const [Loading, isLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   console.log("Token " + token);
//   if(token == null){
//       window.location.href = "/login";
//   }


//   useEffect(()=>{
//     if(!Loading){
//         axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/' + 'all-users',
//             {
//                 headers:{
//                   Authorization: "Bearer "+ token
//                 }
//               }
//         ).
//         then((results)=>{
//               console.log(results.data.result);
//               getUserList(results.data.result);
//               const fetchedData = results.data.result;
//               getUserList(fetchedData);
              
//               isLoading(true);
//         }).
//         catch((err)=>{
//           console.log('Error: ' + err);
//         });
//     }
//   }, [Loading]);

//  async function disableAccount(email){

//   const changedData = {
//     email: email
//   };

//    await axios.put(import.meta.env.VITE_BACKEND_URL + '/api/users/' + 'accountdisable',
//     changedData,
//         {
//             headers: {
//                 Authorization: 'Bearer ' + token
//             }
//         }
//     ).then((result)=>{
//         toast.success("Successfully disabled.");
//         isLoading(false);
//         console.log(result);
//     }).catch(()=>{});
//  }

//  async function enableAccount(email){

//     const changedData = {
//       email: email
//     };
  
//      await axios.put(import.meta.env.VITE_BACKEND_URL + '/api/users/' + 'accountenable',
//       changedData,
//           {
//               headers: {
//                   Authorization: 'Bearer ' + token
//               }
//           }
//       ).then((result)=>{
//           toast.success("Successfully enabled.");
//           isLoading(false);
//           console.log(result);
//       }).catch(()=>{});
//    }



//     return(
//         <div className="w-full p-4">
//             <h1 className="text-white flex justify-center pb-5 text-2xl font-bold">User List</h1>
//             <table className="table-auto w-full border-collapse">
//                 <thead>
//                     <tr className="bg-gray-800 text-white">
//                         <th className="px-4 py-2 text-left border">First Name</th>
//                         <th className="px-4 py-2 text-left border">Last Name</th>
//                         <th className="px-4 py-2 text-left border">Email</th>
//                         <th className="px-4 py-2 text-left border">Whatsapp No</th>
//                         <th className="px-4 py-2 text-left border">Contact No</th>
//                         <th className="px-4 py-2 text-left border">Status</th>
                        
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {userList.map((users, index) => (
//                         <tr key={index} className="hover:bg-gray-100">
//                             <td className="px-4 py-2 border ">{users.firstName}</td>
//                             <td className="px-4 py-2 border">{users.lastName}</td>
//                             <td className="px-4 py-2 border">
//                                {users.email}
//                             </td>
//                             <td className="px-4 py-2 border">
//                                 {users.whatsapp}
//                             </td>
//                             <td className="px-4 py-2 border">{users.phone}</td>
//                            {
//                             (users.disabled) ?  
//                           <td className={`px-4 py-2 border`}>
//                             <button className="bg-red-300 justify-center items-center flex px-3 rounded-xl" onClick={async ()=>{
//                             await enableAccount(users.email);
//                               isLoading(false);
//                             }}> Disable</button>
//                           </td> :  
//                          <td className={`px-4 py-2 border`}>
//                                <button className="bg-green-300  justify-center items-center flex px-3 rounded-xl" onClick={async ()=>{
                             
//                              await disableAccount(users.email);
//                               isLoading(false);
//                                }}>Enable</button>
//                           </td>
//                         }
                            
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Header from "../../../components/header/header";
// import { Footer } from "../../../components/footer/footer";

// export default function Users() {
//   const [userList, setUserList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   if (token == null) {
//     window.location.href = "/login";
//   }

//   useEffect(() => {
//     if (!isLoading) {
//       axios
//         .get(import.meta.env.VITE_BACKEND_URL + "/api/users/all-users", {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         })
//         .then((results) => {
//           setUserList(results.data.result);
//           setIsLoading(true);
//         })
//         .catch((err) => {
//           console.error("Error: " + err);
//         });
//     }
//   }, [isLoading]);

//   const disableAccount = async (email) => {
//     const changedData = { email };
//     await axios
//       .put(import.meta.env.VITE_BACKEND_URL + "/api/users/accountdisable", changedData, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then(() => {
//         toast.success("Account successfully disabled.");
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         toast.error("Error disabling account.");
//         console.error(err);
//       });
//   };

//   const enableAccount = async (email) => {
//     const changedData = { email };
//     await axios
//       .put(import.meta.env.VITE_BACKEND_URL + "/api/users/accountenable", changedData, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then(() => {
//         toast.success("Account successfully enabled.");
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         toast.error("Error enabling account.");
//         console.error(err);
//       });
//   };

//   return (
//     <div className="w-full p- min-h-screen bg-gray-50">
//       <Header/>
//       <h1 className="text-gray-800 flex justify-center pb-5 text-2xl font-bold">User List</h1>
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="table-auto w-full border border-gray-200 bg-white">
//           <thead>
//             <tr className="bg-gray-800 text-white">
//               <th className="px-4 py-2 text-left border">First Name</th>
//               <th className="px-4 py-2 text-left border">Last Name</th>
//               <th className="px-4 py-2 text-left border">Email</th>
//               <th className="px-4 py-2 text-left border">WhatsApp No</th>
//               <th className="px-4 py-2 text-left border">Contact No</th>
//               <th className="px-4 py-2 text-left border">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userList.map((user, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="px-4 py-2 border">{user.firstName}</td>
//                 <td className="px-4 py-2 border">{user.lastName}</td>
//                 <td className="px-4 py-2 border">{user.email}</td>
//                 <td className="px-4 py-2 border">{user.whatsapp}</td>
//                 <td className="px-4 py-2 border">{user.phone}</td>
//                 <td className="px-4 py-2 border">
//                   {user.disabled ? (
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                       onClick={() => enableAccount(user.email)}
//                     >
//                       Disabled
//                     </button>
//                   ) : (
//                     <button
//                       className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//                       onClick={() => disableAccount(user.email)}
//                     >
//                       Enabled
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer/>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  useEffect(() => {
    if (!isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/all-users", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((results) => {
          setUserList(results.data.result);
          setIsLoading(true);
        })
        .catch((err) => {
          console.error("Error: " + err);
        });
    }
  }, [isLoading]);

  const disableAccount = async (email) => {
    const changedData = { email };
    await axios
      .put(import.meta.env.VITE_BACKEND_URL + "/api/users/accountdisable", changedData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Account successfully disabled.");
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Error disabling account.");
        console.error(err);
      });
  };

  const enableAccount = async (email) => {
    const changedData = { email };
    await axios
      .put(import.meta.env.VITE_BACKEND_URL + "/api/users/accountenable", changedData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Account successfully enabled.");
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Error enabling account.");
        console.error(err);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="w-full p-4 flex-grow">
        <h1 className="text-gray-800 flex justify-center pb-5 text-2xl font-bold">User List</h1>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto w-full border border-gray-200 bg-white">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left border">First Name</th>
                <th className="px-4 py-2 text-left border">Last Name</th>
                <th className="px-4 py-2 text-left border">Email</th>
                <th className="px-4 py-2 text-left border">WhatsApp No</th>
                <th className="px-4 py-2 text-left border">Contact No</th>
                <th className="px-4 py-2 text-left border">Status</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{user.firstName}</td>
                  <td className="px-4 py-2 border">{user.lastName}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.whatsapp}</td>
                  <td className="px-4 py-2 border">{user.phone}</td>
                  <td className="px-4 py-2 border">
                    {user.disabled ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        onClick={() => enableAccount(user.email)}
                      >
                        Disabled
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        onClick={() => disableAccount(user.email)}
                      >
                        Enabled
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
