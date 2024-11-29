// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../../../components/header/header";
// import { Footer } from "../../../components/footer/footer";

// export default function AdminRooms(){

    
//     const token = localStorage.getItem("token");
//     console.log("Token " + token);
//     if(token == null){
//         window.location.href = "/login";
//     }

//    const navigate = useNavigate();
//    const [rooms, setRooms] = useState([]);
//    const [roomsLoad, setRoomsLoad] = useState(false);

//    function handleDeleteRooms(roomId){

//       console.log(roomId);
//       axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/room/" + roomId,
//         {
//           headers:{
//             Authorization: "Bearer "+ token
//           }
//         }).then((res)=>{
//           toast.success("Category Successfully Deleted!");
//           setRoomsLoad(false);
//           console.log(res);
          
//         }).catch((err)=>{
//           toast.error("Category can't be deleted.")
//           console.log(err);
//         });
//   } 

//    useEffect(()=>{

//     if(!roomsLoad){
//         axios.get(import.meta.env.VITE_BACKEND_URL + '/api/room').
//         then((res)=>{
//            console.log(res.data.list);
//            setRooms(res.data.list);
//            setRoomsLoad(true);
//         }).catch((err)=>{
//              console.log(err);
//         });
//     }

//    }, [roomsLoad]);

//    function addRooms(){
//     console.log("Plus clicked");
//     // window.location.href = "/admin/add-category";
//     navigate("/admin/add-rooms");
//   }



//     return(
//         <div className="w-full">
//           <Header/>
//             <button className="bg-red-500 w-[60px] h-[60px] rounded-full text-2xl text-center flex items-center justify-center fixed bottom-2 right-5"
//             onClick={()=>{
//               addRooms()
//             }}>
//               <FaPlus color="white"/>
//             </button>
//            <h2 className="text-white text-2xl mt-4 mb-4 font-semibold text-center"> Admin Rooms</h2>
//            <table className="w-full border border-gray-200">
//                <thead>
//                 <tr className="bg-gray-800 text-white">
//                     <th className="border border-gray-200">Room Id</th>
//                     <th className="border border-gray-200">Room Name</th>
//                     <th className="border border-gray-200">Room Category</th>
//                     <th className="border border-gray-200">Booking Status</th>
//                     <th className="border border-gray-200">Guests</th>
//                     <th className="border border-gray-200">Maintain</th>
//                     <th className="border border-gray-200">Photo</th>
//                     <th className="border border-gray-200">Description</th>
//                     <th className="border border-gray-200">Speciality</th>
//                     <th className="border border-gray-200">Actions</th>
//                 </tr>
//                </thead>
//                <tbody>
//                 {
//                    rooms.map((roomSet, index)=>(
//                         <tr key={index} className="hover:bg-gray-100">
//                          <td className="border p-2">{roomSet.room_id}</td>
//                          <td className="border p-2">{roomSet.room_name}</td>
//                          <td className="border p-2">{roomSet.room_category}</td>
//                          <td className="border p-2">{roomSet.booking_status.toString()}</td>
//                          <td className="border p-2">{roomSet.num_of_guests}</td>
//                          <td className="border p-2">{roomSet.available.toString()}</td>
//                          <td className="border p-2">{roomSet.photos? (
//                             <img src={roomSet.photos} alt={roomSet.room_category} className="w-[60px] h-[60px] object-cover items-center justify-center flex text-center" />
//                          ): ("No Image")}</td>
//                          <td className="border p-2">{roomSet.specialDescription}</td>
//                          <td className="border p-2">{roomSet.is_special.toString()}</td>
//                          <td className="border p-2 flex">
//                          <Link className="text-blue-500 hover:text-blue-700" to={"/admin/update-rooms"} state={roomSet}>
//                 <FaEdit />
//                 </Link>
              
//                 <button
//                   onClick={() => {
//                     handleDeleteRooms(roomSet.room_id);
//                   }}
//                   className="text-red-500 hover:text-red-700"
//                   title="Delete"
//                 >
//                  <FaTrash />
//                 </button>
//                          </td>
//                         </tr>
//                    ))
//                 }
//                </tbody>
//            </table>
//            <Footer/>
//         </div>
//     );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";

// export default function AdminRooms() {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [rooms, setRooms] = useState([]);
//   const [roomsLoad, setRoomsLoad] = useState(false);

//   if (!token) {
//     window.location.href = "/login";
//   }

//   const handleDeleteRooms = (roomId) => {
//     axios
//       .delete(import.meta.env.VITE_BACKEND_URL + "/api/room/" + roomId, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => {
//         toast.success("Room successfully deleted!");
//         setRoomsLoad(false);
//       })
//       .catch(() => {
//         toast.error("Failed to delete the room.");
//       });
//   };

//   useEffect(() => {
//     if (!roomsLoad) {
//       axios
//         .get(import.meta.env.VITE_BACKEND_URL + "/api/room")
//         .then((res) => {
//           setRooms(res.data.list);
//           setRoomsLoad(true);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   }, [roomsLoad]);

//   const addRooms = () => {
//     navigate("/admin/add-rooms");
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <Header />
//       <div className="p-4 flex flex-col items-center">
//         <h2 className="text-gray-800 text-3xl font-bold mb-4">Admin Rooms</h2>
//         <table className="w-full table-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white">
//           <thead>
//             <tr className="bg-gray-800 text-white">
//               <th className="p-2 border">Room ID</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Category</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Guests</th>
//               <th className="p-2 border">Available</th>
//               <th className="p-2 border">Photo</th>
//               <th className="p-2 border">Description</th>
//               <th className="p-2 border">Special</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rooms.map((roomSet, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-100 transition-all text-gray-700"
//               >
//                 <td className="p-2 border">{roomSet.room_id}</td>
//                 <td className="p-2 border">{roomSet.room_name}</td>
//                 <td className="p-2 border">{roomSet.room_category}</td>
//                 <td className="p-2 border">{roomSet.booking_status.toString()}</td>
//                 <td className="p-2 border">{roomSet.num_of_guests}</td>
//                 <td className="p-2 border">{roomSet.available.toString()}</td>
//                 <td className="p-2 border">
//                   {roomSet.photos ? (
//                     <img
//                       src={roomSet.photos}
//                       alt={roomSet.room_category}
//                       className="w-16 h-16 object-cover rounded-lg"
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>
//                 <td className="p-2 border">{roomSet.specialDescription}</td>
//                 <td className="p-2 border">{roomSet.is_special.toString()}</td>
//                 <td className="p-2 border flex gap-2">
//                   <Link
//                     className="text-blue-500 hover:text-blue-700"
//                     to={"/admin/update-rooms"}
//                     state={roomSet}
//                     title="Edit Room"
//                   >
//                     <FaEdit />
//                   </Link>
//                   <button
//                     onClick={() => handleDeleteRooms(roomSet.room_id)}
//                     className="text-red-500 hover:text-red-700"
//                     title="Delete Room"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           className="bg-blue-500 text-white fixed bottom-4 right-4 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all"
//           onClick={addRooms}
//         >
//           <FaPlus size={20} />
//         </button>
//       </div>
//       <Footer />
//     </div>
//   );
// }

export default function AdminRooms() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomsLoad, setRoomsLoad] = useState(false);

  if (!token) {
    window.location.href = "/login";
  }

  const handleDeleteRooms = (roomId) => {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/room/" + roomId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Room successfully deleted!");
        setRoomsLoad(false);
      })
      .catch(() => {
        toast.error("Failed to delete the room.");
      });
  };

  useEffect(() => {
    if (!roomsLoad) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/room")
        .then((res) => {
          setRooms(res.data.list);
          setRoomsLoad(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [roomsLoad]);

  const addRooms = () => {
    navigate("/admin/add-rooms");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-800 text-3xl font-bold mb-4 text-center">
          Admin Rooms
        </h2>
        <button
            className="bg-red-500 w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-red-600"
            onClick={addRooms}
            title="Add New Room"
          >
            <FaPlus />
          </button>
          </div>
        <table className="w-full table-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 border">Room ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Guests</th>
              <th className="p-2 border">Available</th>
              <th className="p-2 border">Photo</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Special</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((roomSet, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-all text-gray-700"
              >
                <td className="p-2 border">{roomSet.room_id}</td>
                <td className="p-2 border">{roomSet.room_name}</td>
                <td className="p-2 border">{roomSet.room_category}</td>
                <td className="p-2 border">{roomSet.booking_status.toString()}</td>
                <td className="p-2 border">{roomSet.num_of_guests}</td>
                <td className="p-2 border">{roomSet.available.toString()}</td>
                <td className="p-2 border">
                  {roomSet.photos ? (
                    <img
                      src={roomSet.photos}
                      alt={roomSet.room_category}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="p-2 border">{roomSet.specialDescription}</td>
                <td className="p-2 border">{roomSet.is_special.toString()}</td>
                <td className="p-2 border flex gap-2">
                  <Link
                    className="text-blue-500 hover:text-blue-700"
                    to={"/admin/update-rooms"}
                    state={roomSet}
                    title="Edit Room"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteRooms(roomSet.room_id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Room"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Floating Add Button */}
        {/* <button
          className="bg-red-500 text-white fixed bottom-4 right-4 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-all"
          onClick={addRooms}
        >
          <FaPlus size={20} />
        </button> */}




      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
