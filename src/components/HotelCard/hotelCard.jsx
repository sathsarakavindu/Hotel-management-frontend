import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function HotelCard(props) {
  const { hotel, categoryPrice } = props;
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [countFeedback, setFeddbackCount] = useState(0);
  const [formData, setFormData] = useState({
    roomId: hotel.room_id || "",
    category: hotel.room_category,
    email: "",
    start: "",
    end: "",
    notes: "",
    status: "pending",
  });
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const token = localStorage.getItem("token");

  const getFeedbackCount = () =>{

    axios.get(import.meta.env.VITE_BACKEND_URL + '/api/add-feedback/feedback-count').
    then((count)=>{
      console.log("Count "+ count.data.count);
      setFeddbackCount(count.data.count);
    }).
    catch((err)=>{
      console.log(err);
    });

  }

  const handleBookingSubmit = () => {

       if(token == null){
        navigate('/login');
        return;
       }

       axios.post(import.meta.env.VITE_BACKEND_URL + "/api/booking/addBooking", formData,{
        headers:{
          Authorization: "Bearer " + token
        }
       }).then((values)=>{
        toast.success("Booking saved successfully!");
       }).catch((err)=>{
         console.log(err);
       });




    // Perform booking logic here
    console.log("Booking Data:", formData);
    setShowBookingPopup(false);
    toast.success("Booking successfully submitted!");
  };



  const bookSubmit = () => {
    setShowBookingPopup(true); // Show the popup card
  };


  const handleFeedbackSubmit =  () => {
    // toast.success("Feedback submitted!");
    // setShowFeedback(false);
    // console.log(`Feedback for ${hotel.room_name}:`, feedback);
    if(token != null){

      getFeedbackCount();

       axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/',{
        headers:{
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
       }).then((result)=>{
        const feedbackValues = {
          Feedback_id: countFeedback + 1,
          User_id: result.data.user.id,
          User_name: result.data.user.firstName,
          Room_id: hotel.room_id,
          Room_name: hotel.room_name,
          Feedback: feedback,
          Approvel: false
        };
        console.log(result.data.user);
        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/add-feedback',feedbackValues,{
         headers:{
          Authorization: "Bearer " + token
         }
        }).then((values)=>{
          toast.success("Feedback successfully added..!");
          console.log(values);
        }).catch((err)=>{
          console.log(`Feedback can't be added. Error is ${err}`);
        })
       
       }).catch((err)=>{
        console.log(`Your error is ${err}`);
       })
    }

  };
  /*
    useEffect(
   ()=>{
     

       if(token != null){
         console.log( + token);
         axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/',
            {
               headers:{
                  Authorization: "Bearer "+token,
                  "Content-Type": "application/json"
               }
            }
         ).then(
            (res)=>{
                  console.log(res);
   setName(res.data.user.firstName + " " + res.data.user.lastName);
       setUserFound(true);
            }
         );
       }
else{
   setName("");
}
   },
   [userFound]// This is the dependency array of useEffect Hook.
);
  */

  return (
    <div className="bg-gray-200 w-[650px] h-[320px] flex rounded-lg shadow-md overflow-hidden mb-6">
      {/* Image Section */}
      <div className="w-1/3">
        <img
          src={hotel.photos || "https://via.placeholder.com/200"}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Title and Description */}
        <div>
          <h2 className="text-xl font-bold mb-2">{hotel.room_name}</h2>
          <p className="text-gray-700 text-sm">{hotel.specialDescription}</p>
        </div>

        {/* Price and Guests */}
        <div className="mt-2">
          <p className="text-gray-800 text-sm">
            <span className="font-bold">Price:</span> Rs{categoryPrice} per night
          </p>
          <p className="text-gray-800 text-sm">
            <span className="font-bold">Guests:</span> Up to {hotel.num_of_guests} guests
          </p>
        </div>

        {/* Feedback Stars */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★ ★ ★ ★ ☆</span>
          <span className="ml-2 text-gray-600 text-sm">
            ({hotel.rating || "4.0"}/5)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={
            bookSubmit}>
            Book Now
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            onClick={() => setShowFeedback(true)}
          >
            Feedback
          </button>
        </div>
      </div>

      {/* Feedback Popup */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Submit Your Feedback</h2>
            <textarea
           
              rows="5"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                onClick={() => setShowFeedback(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

            {/* Booking Popup */}
            {showBookingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Book Your Stay</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="roomId" className="block text-gray-700 font-medium">
                  Room ID
                </label>
                <input
                  type="text"
                  id="roomId"
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 font-medium">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                  readOnly
                />
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
                  placeholder="Enter email"
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
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                  onClick={() => setShowBookingPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={handleBookingSubmit}
                >
                  Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
