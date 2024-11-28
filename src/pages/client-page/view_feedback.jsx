// import axios from "axios";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Feedback() {
  const token = localStorage.getItem("token");
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null); // Reference for scrolling container

  useEffect(() => {
    if (!isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/add-feedback", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((results) => {
          setFeedback(results.data.result);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoading]);

  // Scroll Left
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  // Scroll Right
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <div className="w-full p-4 flex-grow">
        <h1 className="text-center text-black font-bold text-3xl mb-6">
          Feedback
        </h1>

        {/* Horizontal Scrolling Section */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 z-10"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 z-10"
          >
            &gt;
          </button>

          {/* Feedback Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide px-8 py-4"
          >
            {feedback.map((feedbackValue, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between border border-gray-200"
              >
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    {feedbackValue.Room_name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Room ID:</strong> {feedbackValue.Room_id}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>User:</strong> {feedbackValue.User_name} (
                    {feedbackValue.User_id})
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Feedback:</strong> {feedbackValue.Feedback}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
