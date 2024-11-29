/* eslint-disable react-hooks/rules-of-hooks */
import { FaSave } from "react-icons/fa";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddBooking() {
  const [isLoading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [isRoomIdEnabled, setRoomIdEnabled] = useState(false); // To track the lock state
  const [notification, setNotification] = useState(""); // To show notifications
  const [bookingInfo, setBookingInfo] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (token == null) {
    navigate("/login");
    return;
  }

  const [formData, setFormData] = useState({
    roomId: "",
    category: "",
    email: "",
    start: "",
    end: "",
    notes: "",
    status: "pending",
  });

  useEffect(() => {
    if (!isLoading) {
      getUserInfo();
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category/all-categories")
        .then((result) => {
          setCategoryList(result.data.categories);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoading]);

  function getAllRoomNumbers(cat) {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/room/all-roomids/" + cat)
      .then((response) => {
        const val = response.data.Room_numbers;
        setRoomNumbers(val);
        setRoomIdEnabled(true); // Enable Room ID dropdown
      })
      .catch((err) => {
        console.error("Error fetching room numbers:", err);
      });
  }

  function getUserInfo(){

    axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/',
      {
          headers:{
              Authorization: "Bearer "+token,
              "Content-Type": "application/json"
          }
      }
  ).then((res) => {
      if(res.data.user){
        console.log(res.data.user.email);
        getUserBookingInfo(res.data.user.email);
      }
  }).catch((err) => {
      console.error(err);
      
  });

  }

  function getUserBookingInfo(mail){
    axios.get(import.meta.env.VITE_BACKEND_URL + '/api/booking/get-booking/' + mail, {
      headers:{
        Authorization: 'Bearer ' + token
      }
    }).then((result)=>{
            console.log(result.data.result);
            setBookingInfo(result.data.result);
    }).catch((err)=>{
           console.log(err);
    });
  }

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.email);
    if (name === "category") {
      setRoomIdEnabled(false); // Reset the Room ID dropdown
      setFormData({ ...formData, roomId: "", [name]: value });
      if (value) {
        await getAllRoomNumbers(value);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate if Room ID exists in roomNumbers
    if (!roomNumbers.includes(formData.roomId)) {
      setNotification("Invalid Room ID. Please select a valid Room ID.");
      return;
    }
  console.log(`Entered email is ${formData.email}`);
    // Call the API to save the booking
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/booking/addBooking", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNotification("Booking saved successfully!");
        setFormData({
          roomId: "",
          category: "",
          email: "",
          start: "",
          end: "",
          notes: "",
          status: "pending",
        });
      })
      .catch((error) => {
        console.error("Error saving booking:", error);
        setNotification("Failed to save booking. Please try again.");
      });
  };

    console.log("New booking info: " + bookingInfo.length);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Booking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              New Booking
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {notification && (
                <div className="text-red-500 font-medium">{notification}</div>
              )}
              <div>
                <label htmlFor="roomId" className="block text-gray-700 font-medium">
                  Room ID
                </label>
                <select
                  id="roomId"
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!isRoomIdEnabled} // Lock the dropdown until category is selected
                >
                  <option value="" disabled>
                    Select Room ID
                  </option>
                  {roomNumbers.map((numList, index) => (
                    <option key={index} value={numList}>
                      {numList}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 font-medium">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categoryList.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
               <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter customer email"
                  required
                />
              </div>
              <div>
                <label htmlFor="start" className="block text-gray-700 font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start"
                  name="start"
                  value={formData.start}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="end" className="block text-gray-700 font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  id="end"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-gray-700 font-medium">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Add any additional notes"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center"
              >
                <FaSave className="mr-2" />
                Save Booking
              </button>
            </form>
          </div>

          {/* Existing Bookings Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Existing Bookings
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-2">Booking ID</th>
                    <th className="px-4 py-2">Room ID</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">End Date</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
    {/* Check if bookingInfo has data */}
    {bookingInfo && bookingInfo.length > 0 ? (
      bookingInfo.map((booking, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="px-4 py-2 border">{booking.bookingId}</td>
          <td className="px-4 py-2 border">{booking.roomId}</td>
          <td className="px-4 py-2 border">{booking.email}</td>
          <td className="px-4 py-2 border">{booking.start}</td>
          <td className="px-4 py-2 border">{booking.end}</td>
          <td className="px-4 py-2 border">{booking.status}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="px-4 py-2 border text-center">
          No bookings available
        </td>
      </tr>
    )}
  </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
