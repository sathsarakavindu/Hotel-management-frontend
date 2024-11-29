/* eslint-disable react-hooks/rules-of-hooks */



//  import { useEffect, useState } from "react";
// import { Footer } from "../../../components/footer/footer";
//  import Header from "../../../components/header/header";
//  import axios from "axios";
// import { useNavigate } from "react-router-dom";



// export default function AdminBooking() {

//    const token = localStorage.getItem("token");

//       if(!token){
         
//          return;
//       }


//     const [bookingInfo, setBooking] = useState([]);
//     const [isLoading, setLoading] = useState(false);    

   
//    const navigate = useNavigate();

//    useEffect(()=>{

//          if(!isLoading){
//            axios.get(import.meta.env.VITE_BACKEND_URL + '/api/booking', 
//             {
//                 headers:{
//                     Authorization: 'Bearer ' + token
//                 }
//             }
//            )
//            .then((result)=>{
//               console.log(result.data.result);
//               setBooking(result.data.result);
//               setLoading(true);
//            }).
//            catch((err)=>{
//             console.log(err);
//            });
//          }
//    }, [isLoading]);


//    const approveBooking = () =>{

    
//    }



//     return (
//         <div className="flex flex-col min-h-screen bg-gray-100">
//             <Header />
//             <div className="flex items-center justify-between p-6">
//                 <h1 className="text-3xl font-semibold text-gray-800">Bookings</h1>
//             </div>
//             <div className="flex-grow overflow-x-auto px-4 sm:px-6 lg:px-8">
//                 <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
//                     <thead className="bg-gray-800 text-white">
//                         <tr>
//                             <th className="px-4 py-2 text-left">Booking ID</th>
//                             <th className="px-4 py-2 text-left">Email</th>
//                             <th className="px-4 py-2 text-left">Start Date</th>
//                             <th className="px-4 py-2 text-left">End Date</th>
//                             <th className="px-4 py-2 text-left">Status</th>
//                             <th className="px-4 py-2 text-left">Reason</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookingInfo.map((booking, index) => (
//                             <tr
//                                 key={index}
//                                 className="hover:bg-gray-100 border-b border-gray-200"
//                             >
//                                 <td className="px-4 py-2">{booking.bookingId}</td>
//                                 <td className="px-4 py-2">{booking.email}</td>
//                                 <td className="px-4 py-2">
//                                     {new Date(booking.start).toLocaleDateString()}
//                                 </td>
//                                 <td className="px-4 py-2">
//                                     {new Date(booking.end).toLocaleDateString()}
//                                 </td>
//                                 <td
//                                     className={`px-4 py-2 capitalize font-medium ${getStatusClass(
//                                         booking.status
//                                     )}`}
//                                 >
//                                     {booking.status}
//                                 </td>
//                                 <td className="px-4 py-2">
//                                     {booking.reason || "No reason provided"}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// // Helper function to apply status-based styles
// function getStatusClass(status) {
//     switch (status) {
//         case "pending":
//             return "text-yellow-500";
//         case "confirmed":
//             return "text-green-500";
//         case "cancelled":
//             return "text-red-500";
//         default:
//             return "";
//     }
// }



 import { useEffect, useState } from "react";
import { Footer } from "../../../components/footer/footer";
 import Header from "../../../components/header/header";
 import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminBooking() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
  
    const [bookingInfo, setBooking] = useState([]);
    const [isLoading, setLoading] = useState(false);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isLoading) {
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/booking", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((result) => {
            console.log(result.data.result);
            setBooking(result.data.result);
            setLoading(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [isLoading]);

    const toggleStatus = (index) => {
        setBooking((prevBooking) => {
          // Create a new copy of the bookings array
          const updatedBookings = prevBooking.map((booking, idx) => {
            if (idx === index) {
              // Return a new booking object with updated status
              return {
                ...booking,
                status: booking.status === "pending" ? "approved" : "pending",
              };
            }
            return booking; // Keep other bookings unchanged
          });
          return updatedBookings; // Return the updated bookings array
        });
      };


  const ApproveBooking = (bookingId)=>{

           const selectedId = { bookingId };

           console.log(bookingId);

        axios.put(import.meta.env.VITE_BACKEND_URL + '/api/booking/approvebooking',
            selectedId,
            {
            headers: {
                Authorization: "Bearer " + token,
              },
        }).
        then((result)=>{
            console.log(result.data);
        }).
        catch((err)=>{
            console.log(err);
        })
  }

      
  
    const getStatusButtonClass = (status) => {
      return status === "pending" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600";
    };
  
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-between p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Bookings</h1>
        </div>
        <div className="flex-grow overflow-x-auto px-4 sm:px-6 lg:px-8">
          <table className="w-full table-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Booking ID</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              {bookingInfo.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b border-gray-200">
                  <td className="px-4 py-2">{booking.bookingId}</td>
                  <td className="px-4 py-2">{booking.email}</td>
                  <td className="px-4 py-2">{new Date(booking.start).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(booking.end).toLocaleDateString()}</td>
                  {/* <td className="px-4 py-2">
                    <button
                      onClick={() => toggleStatus(index)}
                      className={`text-white font-semibold px-4 py-2 rounded ${getStatusButtonClass(
                        booking.status
                      )}`}
                    >
                      {booking.status === "pending" ? "Pending" : "Approved"}
                    </button>
                  </td> */}
                  <td className="px-4 py-2">
  <button
    onClick={ () => {
      ApproveBooking(booking.bookingId);
         toggleStatus(index);
         
    }}
    className={`text-white font-semibold px-4 py-2 rounded ${getStatusButtonClass(
      booking.status
    )}`}
  >
    {booking.status === "pending" ? "Pending" : "Approved"}
  </button>
</td>

                  <td className="px-4 py-2">{booking.reason || "No reason provided"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
  