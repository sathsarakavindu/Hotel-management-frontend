// const bookings = [
//     {
//         "bookingId": 101,
//         "roomId": 301,
//         "email": "user1@example.com",
//         "status": "pending",
//         "reason": "Requested room with a view",
//         "start": "2024-10-25T14:00:00Z",
//         "end": "2024-10-30T10:00:00Z",
//         "notes": "Late check-in expected around 8 PM",
//         "timeStamp": "2024-10-22T12:34:56Z"
//     },
//     {
//         "bookingId": 102,
//         "roomId": 305,
//         "email": "user2@example.com",
//         "status": "confirmed",
//         "reason": "VIP guest",
//         "start": "2024-11-01T12:00:00Z",
//         "end": "2024-11-05T10:00:00Z",
//         "notes": "Early check-in at 11 AM",
//         "timeStamp": "2024-10-22T13:10:34Z"
//     },
//     {
//         "bookingId": 103,
//         "roomId": 302,
//         "email": "user3@example.com",
//         "status": "cancelled",
//         "reason": "Booking conflict",
//         "start": "2024-11-10T15:00:00Z",
//         "end": "2024-11-15T11:00:00Z",
//         "notes": "",
//         "timeStamp": "2024-10-22T15:20:10Z"
//     },
//     {
//         "bookingId": 104,
//         "roomId": 310,
//         "email": "user4@example.com",
//         "status": "pending",
//         "reason": "",
//         "start": "2024-12-01T16:00:00Z",
//         "end": "2024-12-07T12:00:00Z",
//         "notes": "Allergies: please remove carpets",
//         "timeStamp": "2024-10-22T16:45:22Z"
//     },
//     {
//         "bookingId": 105,
//         "roomId": 315,
//         "email": "user5@example.com",
//         "status": "confirmed",
//         "reason": "",
//         "start": "2024-12-15T13:00:00Z",
//         "end": "2024-12-20T11:00:00Z",
//         "notes": "",
//         "timeStamp": "2024-10-22T17:55:18Z"
//     }
// ];

// export default function AdminBooking(){




//     return(
//         <div className="w-full ">
//           <table>
// <thead>
//       <tr className="text-white">
//         <th className="px-4 py-2">Booking ID</th>
//         <th className="px-4 py-2">Email</th>
//         <th className="px-4 py-2">Start Date</th>
//         <th className="px-4 py-2">End Date</th>
//         <th className="px-4 py-2">Status</th>
//         <th className="px-4 py-2">Reason</th>
//       </tr>
// </thead>
            
//     <tbody>
//       {
//         bookings.map(
//             (booking, index)=>{
//                 return(
//                    <tr key={index}>
//                     <td>{booking.bookingId}</td>
//                     <td>{booking.email}</td>
//                     <td>{booking.start}</td>
//                     <td>{booking.end}</td>
//                     <td>{booking.status}</td>
//                     <h1> {booking.reason} </h1>
//                    </tr>
                    
//                 );
//             }
//        )
//       }

//     </tbody>

//           </table>

        

//         </div>
//     );
// }
const bookings = [
    {
        bookingId: 101,
        roomId: 301,
        email: "user1@example.com",
        status: "pending",
        reason: "Requested room with a view",
        start: "2024-10-25T14:00:00Z",
        end: "2024-10-30T10:00:00Z",
        notes: "Late check-in expected around 8 PM",
        timeStamp: "2024-10-22T12:34:56Z"
    },
    {
        bookingId: 102,
        roomId: 305,
        email: "user2@example.com",
        status: "confirmed",
        reason: "VIP guest",
        start: "2024-11-01T12:00:00Z",
        end: "2024-11-05T10:00:00Z",
        notes: "Early check-in at 11 AM",
        timeStamp: "2024-10-22T13:10:34Z"
    },
    {
        bookingId: 103,
        roomId: 302,
        email: "user3@example.com",
        status: "cancelled",
        reason: "Booking conflict",
        start: "2024-11-10T15:00:00Z",
        end: "2024-11-15T11:00:00Z",
        notes: "",
        timeStamp: "2024-10-22T15:20:10Z"
    },
    {
        bookingId: 104,
        roomId: 310,
        email: "user4@example.com",
        status: "pending",
        reason: "",
        start: "2024-12-01T16:00:00Z",
        end: "2024-12-07T12:00:00Z",
        notes: "Allergies: please remove carpets",
        timeStamp: "2024-10-22T16:45:22Z"
    },
    {
        bookingId: 105,
        roomId: 315,
        email: "user5@example.com",
        status: "confirmed",
        reason: "",
        start: "2024-12-15T13:00:00Z",
        end: "2024-12-20T11:00:00Z",
        notes: "",
        timeStamp: "2024-10-22T17:55:18Z"
    }
];

export default function AdminBooking() {
    return (
        <div className="w-full p-4">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="px-4 py-2 text-left border">Booking ID</th>
                        <th className="px-4 py-2 text-left border">Email</th>
                        <th className="px-4 py-2 text-left border">Start Date</th>
                        <th className="px-4 py-2 text-left border">End Date</th>
                        <th className="px-4 py-2 text-left border">Status</th>
                        <th className="px-4 py-2 text-left border">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{booking.bookingId}</td>
                            <td className="px-4 py-2 border">{booking.email}</td>
                            <td className="px-4 py-2 border">
                                {new Date(booking.start).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 border">
                                {new Date(booking.end).toLocaleDateString()}
                            </td>
                            <td className={`px-4 py-2 border capitalize ${getStatusClass(booking.status)}`}>
                                {booking.status}
                            </td>
                            <td className="px-4 py-2 border">
                                {booking.reason || 'No reason provided'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Helper function to apply status-based styles
function getStatusClass(status) {
    switch (status) {
        case "pending":
            return "text-yellow-500";
        case "confirmed":
            return "text-green-500";
        case "cancelled":
            return "text-red-500";
        default:
            return "";
    }
}
