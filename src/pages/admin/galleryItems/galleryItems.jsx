// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export default function GalleryItems() {
//     const token = localStorage.getItem("token");
//     if (token == null) {
//         window.location.href = "/login";
//     }

//     const [galleryItems, setGalleryItems] = useState([]);
//     const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!galleryIsLoaded) {
//             axios.get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
//                 .then((res) => {
                    
//                     console.log(res.data.data);
//                     setGalleryItems(res.data.data);
//                     setGalleryIsLoaded(true);
                    
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                 });
//         }
//     }, [galleryIsLoaded]);

//     // function handleDelete(id) {
     
//     //     axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + id, {
//     //         headers: {
//     //             Authorization: "Bearer " + token,
//     //         },
//     //     }).then((res) => {
//     //         toast.success("Gallery Item Successfully Deleted!");
//     //         setGalleryIsLoaded(false);
//     //     }).catch((err) => {
//     //         toast.error("Gallery Item couldn't be deleted."+err);
//     //     });
//     // }
//     function handleDelete(id) {
//         if (!token) {
//             toast.error("User not authenticated. Please log in.");
//             return;
//         }
    
//         axios
//             .delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//             .then((res) => {
//                 toast.success("Gallery Item Successfully Deleted!");
//                 setGalleryIsLoaded(false); // Refreshes data
//             })
//             .catch((err) => {
//                 if (err.response && err.response.status === 403) {
//                     toast.error("Access denied. Please check permissions.");
//                 } else if (err.response && err.response.status === 401) {
//                     toast.error("Session expired. Please log in again.");
//                 } else {
//                     toast.error("Gallery Item couldn't be deleted. " + err.message);
//                 }
//             });
//     }
    

//     function handleAddNew() {
//         navigate("/admin/add-gallery-item");
//     }

//     return (
//         <div className="w-full">
//             <button
//                 className="bg-green-500 w-[60px] h-[60px] rounded-full text-2xl text-center flex items-center justify-center fixed bottom-2 right-5"
//                 onClick={handleAddNew}
//             >
//                 <FaPlus color='white' />
//             </button>
//             <h2 className="text-2xl font-semibold mb-4">Gallery Items</h2>
//             <table className="w-full border-collapse border border-gray-200">
//                 <thead>
//                     <tr>
//                         <th className="border border-gray-300 p-2">Item Name</th>
//                         <th className="border border-gray-300 p-2">Description</th>
//                         <th className="border border-gray-300 p-2">Image</th>
//                         <th className="border border-gray-300 p-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {galleryItems.map((item, index) => (
//                         <tr key={index} className="hover:bg-gray-100">
//                             <td className="border border-gray-300 p-2">{item.name}</td>
//                             <td className="border border-gray-300 p-2">{item.description}</td>
//                             <td className="border border-gray-300 p-2">
//                                 {item.image ? (
//                                     <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
//                                 ) : (
//                                     "No Image"
//                                 )}
//                             </td>
//                             <td className="border border-gray-300 p-2 flex items-center justify-center space-x-2">
//                                 <Link className="text-blue-500 hover:text-blue-700" to={"/admin/update-gallery-item"} state={item}>
//                                     <FaEdit />
//                                 </Link>
//                                 <button
//                                     onClick={() => {
                
//                                         handleDelete(item._id)
//                                     }}
//                                     className="text-red-500 hover:text-red-700"
//                                     title="Delete"
//                                 >
//                                     <FaTrash />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';

export default function GalleryItems() {
    const token = localStorage.getItem("token");
    if (token == null) {
        window.location.href = "/login";
    }

    const [galleryItems, setGalleryItems] = useState([]);
    const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!galleryIsLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
                .then((res) => {
                    setGalleryItems(res.data.data);
                    setGalleryIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [galleryIsLoaded]);

    function handleDelete(id) {
        if (!token) {
            toast.error("User not authenticated. Please log in.");
            return;
        }

        axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                toast.success("Gallery Item Successfully Deleted!");
                setGalleryIsLoaded(false);
            })
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    toast.error("Access denied. Please check permissions.");
                } else if (err.response && err.response.status === 401) {
                    toast.error("Session expired. Please log in again.");
                } else {
                    toast.error("Gallery Item couldn't be deleted. " + err.message);
                }
            });
    }

    function handleAddNew() {
        navigate("/admin/add-gallery-item");
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* <header className="px-6 py-4 bg-gray-800 text-white">
                <h1 className="text-3xl font-bold">Gallery Management</h1>
            </header> */}
            <Header/>
            <main className="flex-grow px-6 py-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Gallery Items</h2>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
                        onClick={handleAddNew}
                        title="Add New Item"
                    >
                        <FaPlus size={20} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse bg-white shadow rounded-lg">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-4 py-2 text-left">Item Name</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Image</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleryItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{item.name}</td>
                                    <td className="px-4 py-2 border">{item.description}</td>
                                    <td className="px-4 py-2 border">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded shadow"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border flex items-center justify-center space-x-4">
                                        <Link
                                            to={"/admin/update-gallery-item"}
                                            state={item}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            {/* <footer className="px-6 py-4 bg-gray-800 text-white text-center">
                &copy; 2024 Your Company. All rights reserved.
            </footer> */}
            <Footer/>
        </div>
    );
}
