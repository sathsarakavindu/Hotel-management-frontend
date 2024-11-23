import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Users(){
  const [userList, getUserList] = useState([]);
//   const [fName, getFname] = useState("");
//   const [lName, getLname] = useState("");
//   const [email, getEmail] = useState("");
//   const [wts, getwhatsapp] = useState("");
//   const [contact, getContact] = useState("");
//   const [satatus, getStatus] = useState("");
  const [Loading, isLoading] = useState(false);

  const token = localStorage.getItem("token");
  console.log("Token " + token);
  if(token == null){
      window.location.href = "/login";
  }


  useEffect(()=>{
    if(!Loading){
        axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/' + 'all-users',
            {
                headers:{
                  Authorization: "Bearer "+ token
                }
              }
        ).
        then((results)=>{
              console.log(results.data.result);
              getUserList(results.data.result);
              const fetchedData = results.data.result;
              getUserList(fetchedData);
              
              isLoading(true);
        }).
        catch((err)=>{
          console.log('Error: ' + err);
        });
    }
  }, [Loading]);

 async function disableAccount(email){

  const changedData = {
    email: email
  };

   await axios.put(import.meta.env.VITE_BACKEND_URL + '/api/users/' + 'accountdisable',
    changedData,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    ).then((result)=>{
        toast.success("Successfully disabled.");
        isLoading(false);
        console.log(result);
    }).catch(()=>{});
 }

 async function enableAccount(email){

    const changedData = {
      email: email
    };
  
     await axios.put(import.meta.env.VITE_BACKEND_URL + '/api/users/' + 'accountenable',
      changedData,
          {
              headers: {
                  Authorization: 'Bearer ' + token
              }
          }
      ).then((result)=>{
          toast.success("Successfully enabled.");
          isLoading(false);
          console.log(result);
      }).catch(()=>{});
   }



    return(
        <div className="w-full p-4">
            <h1 className="text-white flex justify-center pb-5 text-2xl font-bold">User List</h1>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="px-4 py-2 text-left border">First Name</th>
                        <th className="px-4 py-2 text-left border">Last Name</th>
                        <th className="px-4 py-2 text-left border">Email</th>
                        <th className="px-4 py-2 text-left border">Whatsapp No</th>
                        <th className="px-4 py-2 text-left border">Contact No</th>
                        <th className="px-4 py-2 text-left border">Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {userList.map((users, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border ">{users.firstName}</td>
                            <td className="px-4 py-2 border">{users.lastName}</td>
                            <td className="px-4 py-2 border">
                               {users.email}
                            </td>
                            <td className="px-4 py-2 border">
                                {users.whatsapp}
                            </td>
                            <td className="px-4 py-2 border">{users.phone}</td>
                           {
                            (users.disabled) ?  
                          <td className={`px-4 py-2 border`}>
                            <button className="bg-red-300 justify-center items-center flex px-3 rounded-xl" onClick={async ()=>{
                            await enableAccount(users.email);
                              isLoading(false);
                            }}> Disable</button>
                          </td> :  
                         <td className={`px-4 py-2 border`}>
                               <button className="bg-green-300  justify-center items-center flex px-3 rounded-xl" onClick={async ()=>{
                             
                             await disableAccount(users.email);
                              isLoading(false);
                               }}>Enable</button>
                          </td>
                        }
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}