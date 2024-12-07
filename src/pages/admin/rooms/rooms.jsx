
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";

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
