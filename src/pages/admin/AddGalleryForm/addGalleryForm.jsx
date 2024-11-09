import uploadMedia from "../../../utils/mediaUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getDownloadURL } from "firebase/storage";

export default function AddGalleryItemForm() {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [image, setImage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const token = localStorage.getItem("token");

   if (!token) {
      window.location.href = "/login";
   }

   const handleImageChange = (e) => {
      setImage(e.target.files[0]);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         const snapshot = await uploadMedia(image);
         const imageUrl = await getDownloadURL(snapshot.ref);

         const galleryItem = {
            name: name,
            description: description,
            image: imageUrl
         };

         await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/gallery", galleryItem, {
            headers: {
               Authorization: "Bearer " + token
            }
         });

         setIsLoading(false);
         toast.success("Gallery item successfully added!");
      } catch (err) {
         setIsLoading(false);
         toast.error("Failed to add gallery item.");
      }
   };

   return (
      <div className="w-full h-[100vh] flex justify-center items-center">
         <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Gallery Item</h2>
            
            <label className="block mb-2">
               Item Name:
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter item name"
                  required
               />
            </label>

            <label className="block mb-2">
               Description:
               <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter item description"
                  required
               />
            </label>

            <label className="block mb-2">
               Upload Image:
               <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded mt-1"
                  accept="image/*"
               />
            </label>

            <button type="submit" className="w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 justify-center flex">
               {isLoading ? (
                  <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
               ) : (
                  <span>Add Item</span>
               )}
            </button>
         </form>
      </div>
   );
}
