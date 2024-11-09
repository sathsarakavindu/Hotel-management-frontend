import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
                    
                    console.log(res.data.data);
                    setGalleryItems(res.data.data);
                    setGalleryIsLoaded(true);
                    
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [galleryIsLoaded]);

    // function handleDelete(id) {
     
    //     axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + id, {
    //         headers: {
    //             Authorization: "Bearer " + token,
    //         },
    //     }).then((res) => {
    //         toast.success("Gallery Item Successfully Deleted!");
    //         setGalleryIsLoaded(false);
    //     }).catch((err) => {
    //         toast.error("Gallery Item couldn't be deleted."+err);
    //     });
    // }
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
                setGalleryIsLoaded(false); // Refreshes data
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
        <div className="w-full">
            <button
                className="bg-green-500 w-[60px] h-[60px] rounded-full text-2xl text-center flex items-center justify-center fixed bottom-2 right-5"
                onClick={handleAddNew}
            >
                <FaPlus color='white' />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Gallery Items</h2>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Item Name</th>
                        <th className="border border-gray-300 p-2">Description</th>
                        <th className="border border-gray-300 p-2">Image</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {galleryItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{item.name}</td>
                            <td className="border border-gray-300 p-2">{item.description}</td>
                            <td className="border border-gray-300 p-2">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td className="border border-gray-300 p-2 flex items-center justify-center space-x-2">
                                <Link className="text-blue-500 hover:text-blue-700" to={"/admin/update-gallery-item"} state={item}>
                                    <FaEdit />
                                </Link>
                                <button
                                    onClick={() => {
                
                                        handleDelete(item._id)
                                    }}
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
    );
}
