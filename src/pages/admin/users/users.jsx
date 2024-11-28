

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  useEffect(() => {
    if (!isLoading) {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/all-users", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((results) => {
          setUserList(results.data.result);
          setIsLoading(true);
        })
        .catch((err) => {
          console.error("Error: " + err);
        });
    }
  }, [isLoading]);

  const disableAccount = async (email) => {
    const changedData = { email };
    await axios
      .put(import.meta.env.VITE_BACKEND_URL + "/api/users/accountdisable", changedData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Account successfully disabled.");
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Error disabling account.");
        console.error(err);
      });
  };

  const enableAccount = async (email) => {
    const changedData = { email };
    await axios
      .put(import.meta.env.VITE_BACKEND_URL + "/api/users/accountenable", changedData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Account successfully enabled.");
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Error enabling account.");
        console.error(err);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="w-full p-4 flex-grow">
        <h1 className="text-gray-800 flex justify-center pb-5 text-2xl font-bold">User List</h1>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto w-full border border-gray-200 bg-white">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left border">First Name</th>
                <th className="px-4 py-2 text-left border">Last Name</th>
                <th className="px-4 py-2 text-left border">Email</th>
                <th className="px-4 py-2 text-left border">WhatsApp No</th>
                <th className="px-4 py-2 text-left border">Contact No</th>
                <th className="px-4 py-2 text-left border">Status</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{user.firstName}</td>
                  <td className="px-4 py-2 border">{user.lastName}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.whatsapp}</td>
                  <td className="px-4 py-2 border">{user.phone}</td>
                  <td className="px-4 py-2 border">
                    {user.disabled ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        onClick={() => enableAccount(user.email)}
                      >
                        Disabled
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        onClick={() => disableAccount(user.email)}
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
      </div>
      <Footer />
    </div>
  );
}
