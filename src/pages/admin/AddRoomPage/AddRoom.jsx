import axios from "axios";
import { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload";
import { getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddRooms() {
  const [roomId, setRoomId] = useState("");
  const [roomCategory, setRoomCategory] = useState("");
  //const [bookingStatus, setBookingStatus] = useState(false);
  const [specialDescription, setSpecialDescription] = useState("");
  const [numGuests, setNumGuests] = useState(3);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isSpecial, setIsSpecial] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleBack = () =>{
   navigate(-1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const snapshot = await uploadMedia(image);
      const url = await getDownloadURL(snapshot.ref);

      const roomInfo = {
        room_id: roomId,
        room_category: roomCategory,
        booking_status: false,
        num_of_guests: numGuests,
        available: isAvailable,
        specialDescription,
        is_special: isSpecial,
        photos: [url],
      };

      await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/room/' + roomId).then(async (result)=>{
  
        if(result != null){
         toast.error("There is an room from this room id");
         return;
        }
      }).catch(()=>{
         return;
   });

      await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/api/room`,
         roomInfo,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
 
       toast.success("The room was successfully added!");
       navigate("/admin/rooms");



    } catch (error) {
      toast.error("Failed to add room. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>

        <label className="block mb-2">
          Room Id:
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Room Id"
            required
          />
        </label>

        <label className="block mb-2">
          Room Category:
          <input
            type="text"
            value={roomCategory}
            onChange={(e) => setRoomCategory(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Room Category"
            required
          />
        </label>

        <label className="block mb-2">
          Number of Guests:
          <input
            type="number"
            value={numGuests}
            onChange={(e) => setNumGuests(Number(e.target.value))}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Number of Guests"
            required
          />
        </label>

        <label className="block mb-2">
          Description:
          <textarea
            value={specialDescription}
            onChange={(e) => setSpecialDescription(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter Room Description"
            required
          />
        </label>

        <label className="block mb-2">
         Maintainability:
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="ml-2"
          />
        </label>

        <label className="block mb-2">
          Special Room:
          <input
            type="checkbox"
            checked={isSpecial}
            onChange={(e) => setIsSpecial(e.target.checked)}
            className="ml-2"
          />
        </label>

        <label className="block mb-2">
          Upload Image:
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded mt-1"
            accept="image/*"
          />
        </label>

        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            "Add Room"
          )}
        </button>

        <button type="button" onClick={handleBack} className="w-full p-2 mt-4 bg-gray-500 text-white rounded hover:bg-gray-600">
         Back
        </button>
      </form>
    </div>
  );
}
