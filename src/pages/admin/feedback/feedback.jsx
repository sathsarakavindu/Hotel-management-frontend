


import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";

export default function AdminFeedback() {
  const token = localStorage.getItem("token");

  const [feedback, setFeedback] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // Fetch feedback data on initial render and after approval/disapproval
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/add-feedback", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setFeedback(response.data.result);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (isLoading) {
      fetchFeedback();
    }
  }, [isLoading, token]);

  // Approve feedback
  const ApproveFeedback = async (Feedback_id) => {
    console.log(`Approving _id: ${Feedback_id}`);
    const approve = { Feedback_id };

    try {
      await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/add-feedback/approve", approve, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Successfully enabled.");
      setLoading(true); // Trigger data re-fetch
    } catch (err) {
      console.log(err);
    }
  };

  // Disable feedback
  const DisableFeedback = async (Feedback_id) => {
    console.log(`Disabling _id: ${Feedback_id}`);
    const approve = { Feedback_id };

    try {
      await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/add-feedback/disapprove-feedback", approve, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Successfully disabled.");
      setLoading(true); // Trigger data re-fetch
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="w-full p-4 flex-grow">
        <h1 className="flex m-4 items-center justify-center text-black font-bold text-2xl">
          Feedback
        </h1>
        <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-left border">Feedback Id</th>
              <th className="px-4 py-2 text-left border">Room Id</th>
              <th className="px-4 py-2 text-left border">Room Name</th>
              <th className="px-4 py-2 text-left border">User Id</th>
              <th className="px-4 py-2 text-left border">User Name</th>
              <th className="px-4 py-2 text-left border">Feedback</th>
              <th className="px-4 py-2 text-left border">Approval</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((feedbackValues, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{feedbackValues.Feedback_id}</td>
                <td className="px-4 py-2 border">{feedbackValues.Room_id}</td>
                <td className="px-4 py-2 border">{feedbackValues.Room_name}</td>
                <td className="px-4 py-2 border">{feedbackValues.User_id}</td>
                <td className="px-4 py-2 border">{feedbackValues.User_name}</td>
                <td className="px-4 py-2 border">{feedbackValues.Feedback}</td>
                <td className="px-4 py-2 border">
                  {feedbackValues.Approvel ? (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => DisableFeedback(feedbackValues.Feedback_id)}
                    >
                      Disabled
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={() => ApproveFeedback(feedbackValues.Feedback_id)}
                    >
                      Enabled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
