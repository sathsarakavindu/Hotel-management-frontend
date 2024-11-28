

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const token = localStorage.getItem("token");
  if (token == null) {
    window.location.href = "/login";
  }

  // useEffect(() => {
  //   if (!isLoading) {
  //     axios
  //       .post(import.meta.env.VITE_BACKEND_URL + "/api/users/all-users", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       })
  //       .then((results) => {
  //         setUserList(results.data.result);
  //         setIsLoading(true);
  //       })
  //       .catch((err) => {
  //         console.error("Error: " + err);
  //       });
  //   }
  // }, [isLoading]);


  useEffect(() => {
    const page = 1; // Example: Set the initial page number
    const pageSize = 10; // Example: Set the initial page size
  
    if (!isLoading) {
      axios
        .post(
          import.meta.env.VITE_BACKEND_URL + "/api/users/all-users",
          {
            page: page,
            pageSize: pageSize, // Include page number and size in the request body
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((results) => {
          setUserList(results.data.users);
          setTotalPage(results.data.pagination.totalPages)
          console.log( "totla pages " + results.data.pagination.totalPages);
          setIsLoading(true);
        })
        .catch((err) => {
          console.error("Error: " + err);
        });
    }
  }, [isLoading, page]);
  



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

  console.log(userList.length);

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
          <div className="w-full flex justify-center items-center">
           {  Array.from({length: totalPage}).map((
              item, index)=>{
                return(
                  <button className={`bg-blue-500 mx-[10px]
                  w-[20px] h-[20px] flex
                  text-center justify-center items-center
                  text-white ${page == (index+1) && " border border-black"}
                  `} onClick={()=>{setPage(index + 1)}}>
                    {index + 1}
                  </button>
                )
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
