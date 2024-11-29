/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa";



export default function BookNow(){

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [isRoomIdEnabled, setRoomIdEnabled] = useState(false); // To track the lock state
  const [notification, setNotification] = useState(""); // To show notifications
  const [bookingInfo, setBookingInfo] = useState([]);

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


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Booking</h1>
            <form onSubmit={handleFormSubmit} className="space-y-4">
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
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  //onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
                >
                  <FaSave className="mr-2" />
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}