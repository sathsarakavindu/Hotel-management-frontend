import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {  useLocation, useNavigate } from "react-router-dom";
import uploadMedia from "../../../utils/mediaUpload";
import { getDownloadURL } from "firebase/storage";

export default function UpdateRoom(){

   const token = localStorage.getItem("token");

   if (!token) {
      window.location.href = "/login";
   }

   const roomData = useLocation();

    if(roomData.state == null){
      window.roomData.href = "/admin/rooms"
       
    }

   const [room_id, setRoomId] = useState(roomData.state.room_id);
   const [room_name, setRoomName] = useState(roomData.state.room_name);
   const [room_category, setRoomCategory] = useState(roomData.state.room_category);
   const [num_of_guests, setNumOfGuest] = useState(roomData.state.num_of_guests);
   const [description, setRoomDescription] = useState(roomData.state.specialDescription);
   const [maintain, setRoomMaintain] = useState(roomData.state.available);
   const [image, setImage] = useState(null);
   const [isLoading, setLoading] = useState(false);
   const categories = ["Normal", "Deluxe", "Luxury", "Standard"]; // Room categories

    const navigate = useNavigate();

    const handleBack = () =>{
        navigate(-1);
       }

       const handleImage = (e)=>{
          setImage(e.target.files[0]);
       }
     
 const handleSubmit = async(e) =>{
     e.preventDefault();
     setLoading(true);

     if(image == null){
      const roomInfo = {
         room_id: room_id,
         room_name: room_name,
         room_category:room_category,
         num_of_guests: num_of_guests,
         specialDescription: description,
         available: maintain,
         photos: roomData.state.photos
        };

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/room/" + room_id, 
         roomInfo,
         {
            headers: {
               Authorization: "Bearer " + token,
            },
         }
        ).then((res)=>{
         console.log(res);
         setLoading(false);
         toast.success("The Room was successfully updated..!");
          window.location.href = "/admin/rooms"
        }).catch((err)=>{
         console.log(err);
        })
     }
     else{
      uploadMedia(image).then((snapshot)=>{
         console.log("Image is not null");
        getDownloadURL(snapshot.ref).then((url)=>{
           
            const roomInfo = {
               room_id: room_id,
               room_name: room_name,
               room_category:room_category,
               num_of_guests: num_of_guests,
               specialDescription: description,
               available: maintain,
               photos: url
            };

            axios.put(import.meta.env.VITE_BACKEND_URL + "/api/room/" + room_id, 
               roomInfo, 
               {
                headers:{
                    Authorization: "Bearer " + token,
                },
               }
         ).then((res)=>{
                console.log(res);
                setLoading(false);
                toast.success("The Room was successfully updated..!");
              window.location.href = "/admin/rooms"
            }).catch(()=>{
               toast.error("Category can't be updated.");
            })
        })
      }).catch((err)=>{console.log(err)});

     }
 }

    return(
       <div className="w-full h-[100vh] flex justify-center items-center">
         <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Room Details</h2>
            
            <label className="block mb-2">
               Room No:
               <input
                  type="text"
                  value={room_id}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Room No"
                  required
               />
            </label>

            <label className="block mb-2">
               Room Name:
               <input
                  type="text"
                  value={room_name}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Room Name"
                  required
               />
            </label>

            {/* <label className="block mb-2">
               Room Category:
               <input
                  type="text"
                 value={room_category}
                 onChange={(e) => setRoomCategory(Number(e.target.value))}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Category"
                  required
               />
            </label> */}

<label className="block mb-2">
         Room Category:
         <select
            value={room_category}
            onChange={(e) => setRoomCategory(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
         >
            <option value="" disabled>
               Select a category
            </option>
            {categories.map((category, index) => (
               <option key={index} value={category}>
                  {category}
               </option>
            ))}
         </select>
      </label>


            <label className="block mb-2">
               Num of guest:
               <input
                  type="number"
                  value={num_of_guests}
                  onChange={(e) => setNumOfGuest(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter No of Guests"
               />
            </label>
            <label className="block mb-2">
               Maintain:
               <input
                  type="text"
                  value={maintain}
                  onChange={(e) => setRoomMaintain(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Room No"
                  required
               />
            </label>

            <label className="block mb-2">
              Special Description:
               <textarea
                  value={description}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Description"
                  required
               />
            </label>

            <label className="block mb-2">
               Upload Image:
               <input
                  type="file"
                  onChange={handleImage}
                  className="w-full p-2 border rounded mt-1"
                  accept="image/*"
               />
            </label>

            <button type="submit" className="w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 justify-center flex">
                Update Category
            
             
            </button>
            <button type="button" onClick={handleBack} className="w-full p-2 mt-4 bg-gray-500 text-white rounded hover:bg-gray-600">
         Back
        </button>
         </form>
      </div>
    );
}