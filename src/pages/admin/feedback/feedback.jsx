// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function AdminFeedback(){
    
//     const token = localStorage.getItem("token");

//       const [feedback, setFeedback] = useState([]);
//       const [isLoading, setLoading] = useState(false);

//     useEffect(
//         ()=>{
//             if(!isLoading){
//                 axios.get(import.meta.env.VITE_BACKEND_URL + '/api/add-feedback', {
//                     headers:{
//                         Authorization: 'Bearer ' + token
//                     }
//                 })
//                 .then((results)=>{
//                    console.log(results.data.result);
//                    setFeedback(results.data.result);
//                    setLoading(true);
//                 }).catch((err)=>{
//                     console.log(err);
//                 });
//             }
//         }, 
//         [isLoading]
//     );

//      async function ApproveFeedback(id){
//         console.log(`_id is ${id}`);
//         const approve = {
//             _id: id
//         }
//         await  axios.put(import.meta.env.VITE_BACKEND_URL + '/api/add-feedback/approve',
//            approve,
//               {
//                   headers: {
//                       Authorization: 'Bearer ' + token
//                   }
//               }
//           ).then((result)=>{
//               toast.success("Successfully enabled.");
//               setLoading(false);
//               console.log(result);
//           }).catch((err)=>{
//             console.log(err);
//           });
//     }

//      async function DisableFeedback(id){
//         console.log(`_id is ${id}`);
//         const approve = {
//             _id: id
//         }
      
//         await  axios.put(import.meta.env.VITE_BACKEND_URL + '/api/add-feedback/disapprove-feedback',
//            approve,
//               {
//                   headers: {
//                       Authorization: 'Bearer ' + token
//                   }
//               }
//           ).then((result)=>{
//               toast.success("Successfully Disabled.");
//               setLoading(false);
//               console.log(result);
//           }).catch((err)=>{
//             console.log(err);
//           });
//     }



//     return(
//         <div className="w-full p-4">
//            <h1 className="flex m-4 items-center justify-center text-white font-bold text-2xl">Feedback</h1>
//            <table className="table-auto w-full border-collapse">
//                 <thead>
//                     <tr className="bg-gray-800 text-white">
//                         <th className="px-4 py-2 text-left border">Room Id</th>
//                         <th className="px-4 py-2 text-left border">Room Name</th>
//                         <th className="px-4 py-2 text-left border"> User Id</th>
//                         <th className="px-4 py-2 text-left border">User Name</th>
//                         <th className="px-4 py-2 text-left border">Feedback</th>
//                         <th className="px-4 py-2 text-left border">Approvel</th>
                        
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {feedback.map((feddbackValues, index) => (
//                         <tr key={index} className="hover:bg-gray-100">
//                             <td className="px-4 py-2 border ">{feddbackValues.Room_id}</td>
//                             <td className="px-4 py-2 border">{feddbackValues.Room_name}</td>
//                             <td className="px-4 py-2 border">
//                                {feddbackValues.User_id}
//                             </td>
//                             <td className="px-4 py-2 border">
//                                 {feddbackValues.User_name}
//                             </td>
//                             <td className="px-4 py-2 border">{feddbackValues.Feedback}</td>
//                            {
//                             (feddbackValues.Approvel) ?  
//                           <td className={`px-4 py-2 border`}>
//                             <button className=" bg-green-300 justify-center items-center flex px-3 rounded-xl" onClick={ async ()=>{
//                             await ApproveFeedback(feddbackValues._id);
//                             setLoading(false);
//                             }}> Enable</button>
//                           </td> :  
//                          <td className={`px-4 py-2 border`}>
//                                <button className="bg-red-300  justify-center items-center flex px-3 rounded-xl" onClick={ async ()=>{
                             
//                              await DisableFeedback(feddbackValues._id);
//                              setLoading(false);
//                                }}>Disable</button>
//                           </td>
//                         }
                            
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";


export default function AdminFeedback() {
  const token = localStorage.getItem("token");

  const [feedback, setFeedback] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/add-feedback", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((results) => {
          console.log(results.data.result);
          setFeedback(results.data.result);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoading]);

  async function ApproveFeedback(id) {
    console.log(`_id is ${id}`);
    const approve = {
      _id: id,
    };
    await axios
      .put(import.meta.env.VITE_BACKEND_URL + "/api/add-feedback/approve", approve, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        toast.success("Successfully enabled.");
        setLoading(false);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function DisableFeedback(id) {
    console.log(`_id is ${id}`);
    const approve = {
      _id: id,
    };

    await axios
      .put(import.meta.env.VITE_BACKEND_URL + "/api/add-feedback/disapprove-feedback", approve, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        toast.success("Successfully Disabled.");
        setLoading(false);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="w-full p-4 flex-grow">
        <h1 className="flex m-4 items-center justify-center text-black font-bold text-2xl">
          Feedback
        </h1>
        <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-left border">Room Id</th>
              <th className="px-4 py-2 text-left border">Room Name</th>
              <th className="px-4 py-2 text-left border">User Id</th>
              <th className="px-4 py-2 text-left border">User Name</th>
              <th className="px-4 py-2 text-left border">Feedback</th>
              <th className="px-4 py-2 text-left border">Approval</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((feddbackValues, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{feddbackValues.Room_id}</td>
                <td className="px-4 py-2 border">{feddbackValues.Room_name}</td>
                <td className="px-4 py-2 border">{feddbackValues.User_id}</td>
                <td className="px-4 py-2 border">{feddbackValues.User_name}</td>
                <td className="px-4 py-2 border">{feddbackValues.Feedback}</td>
                {feddbackValues.Approvel ? (
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={async () => {
                        await ApproveFeedback(feddbackValues._id);
                        setLoading(false);
                      }}
                    >
                      Enable
                    </button>
                  </td>
                ) : (
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={async () => {
                        await DisableFeedback(feddbackValues._id);
                        setLoading(false);
                      }}
                    >
                      Disable
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
