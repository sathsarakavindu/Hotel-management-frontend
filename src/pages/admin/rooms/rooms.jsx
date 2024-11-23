import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminRooms(){

    
    const token = localStorage.getItem("token");
    console.log("Token " + token);
    if(token == null){
        window.location.href = "/login";
    }

   const navigate = useNavigate();
   const [rooms, setRooms] = useState([]);
   const [roomsLoad, setRoomsLoad] = useState(false);

   function handleDeleteRooms(roomId){

      console.log(roomId);
      axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/room/" + roomId,
        {
          headers:{
            Authorization: "Bearer "+ token
          }
        }).then((res)=>{
          toast.success("Category Successfully Deleted!");
          setRoomsLoad(false);
          console.log(res);
          
        }).catch((err)=>{
          toast.error("Category can't be deleted.")
          console.log(err);
        });
  } 

   useEffect(()=>{

    if(!roomsLoad){
        axios.get(import.meta.env.VITE_BACKEND_URL + '/api/room').
        then((res)=>{
           console.log(res.data.list);
           setRooms(res.data.list);
           setRoomsLoad(true);
        }).catch((err)=>{
             console.log(err);
        });
    }

   }, [roomsLoad]);

   function addRooms(){
    console.log("Plus clicked");
    // window.location.href = "/admin/add-category";
    navigate("/admin/add-rooms");
  }



    return(
        <div className="w-full">
            <button className="bg-red-500 w-[60px] h-[60px] rounded-full text-2xl text-center flex items-center justify-center fixed bottom-2 right-5"
            onClick={()=>{
              addRooms()
            }}>
              <FaPlus color="white"/>
            </button>
           <h2 className="text-white text-2xl mt-4 mb-4 font-semibold text-center"> Admin Rooms</h2>
           <table className="w-full border border-gray-200">
               <thead>
                <tr className="bg-gray-800 text-white">
                    <th className="border border-gray-200">Room Id</th>
                    <th className="border border-gray-200">Room Category</th>
                    <th className="border border-gray-200">Booking Status</th>
                    <th className="border border-gray-200">Guests</th>
                    <th className="border border-gray-200">Maintain</th>
                    <th className="border border-gray-200">Photo</th>
                    <th className="border border-gray-200">Description</th>
                    <th className="border border-gray-200">Speciality</th>
                    <th className="border border-gray-200">Actions</th>
                </tr>
               </thead>
               <tbody>
                {
                   rooms.map((roomSet, index)=>(
                        <tr key={index} className="hover:bg-gray-100">
                         <td className="border p-2">{roomSet.room_id}</td>
                         <td className="border p-2">{roomSet.room_category}</td>
                         <td className="border p-2">{roomSet.booking_status.toString()}</td>
                         <td className="border p-2">{roomSet.num_of_guests}</td>
                         <td className="border p-2">{roomSet.available.toString()}</td>
                         <td className="border p-2">{roomSet.photos? (
                            <img src={roomSet.photos} alt={roomSet.room_category} className="w-[60px] h-[60px] object-cover items-center justify-center flex text-center" />
                         ): ("No Image")}</td>
                         <td className="border p-2">{roomSet.specialDescription}</td>
                         <td className="border p-2">{roomSet.is_special.toString()}</td>
                         <td className="border p-2 flex">
                         <Link className="text-blue-500 hover:text-blue-700" to={""} >
                <FaEdit />
                </Link>
                <button
                  onClick={() => {
                    handleDeleteRooms(roomSet.room_id);
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                 <FaTrash />
                </button>
                         </td>
                        </tr>
                   ))
                }
               </tbody>
           </table>
        </div>
    );
}