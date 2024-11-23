import { useState } from "react";
import toast from "react-hot-toast";

export default function HotelCard(props) {
  const { hotel, categoryPrice } = props;
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    toast.success("Feedback submitted!");
    setShowFeedback(false);
    // Here, you can send the feedback to the server
    console.log(`Feedback for ${hotel.name}:`, feedback);
  };

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
          <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
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
    </div>
  );
}
