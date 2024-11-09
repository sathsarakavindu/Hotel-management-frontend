import uploadMedia from "../../../utils/mediaUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";

export default function UpdateGalleryForm() {
   const location = useLocation();

   // Redirect if no state data is passed (e.g., user directly accesses the page)
   if (location.state == null) {
      window.location.href = "/admin/gallery";
   }

   const [name, setName] = useState(location.state.name || "");
   const [description, setDescription] = useState(location.state.description || "");
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

      if (!image) {
         // If no new image is selected, use the existing one
         const galleryInfo = {
            name,
            description,
            image: location.state.image
         };

         axios.put(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + location.state._id, galleryInfo, {
            headers: {
               Authorization: "Bearer " + token,
            },
         })
         .then((res) => {
            console.log(res);
            setIsLoading(false);
            toast.success("Gallery item successfully updated!");
            window.location.href = "/admin/gallery";
         })
         .catch((err) => {
            console.log(err);
            toast.error("Failed to update gallery item.");
         });

      } else {
         // Upload new image if selected
         uploadMedia(image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
               const galleryInfo = {
                  name,
                  description,
                  image: url
               };

               axios.put(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + location.state._id, galleryInfo, {
                  headers: {
                     Authorization: "Bearer " + token,
                  },
               })
               .then((res) => {
                  console.log(res);
                  setIsLoading(false);
                  toast.success("Gallery item successfully updated!");
                  window.location.href = "/admin/gallery";
               })
               .catch((err) => {
                  console.log(err);
                  toast.error("Failed to update gallery item.");
               });
            });
         });
      }
   };

   return (
      <div className="w-full h-[100vh] flex justify-center items-center">
         <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Gallery Item</h2>
            
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
               Upload New Image:
               <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded mt-1"
                  accept="image/*"
               />
            </label>

            <button type="submit" className="w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 justify-center flex">
               {
                  isLoading ? (
                     <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
                  ) : (
                     <span>Update Gallery Item</span>
                  )
               }
            </button>
         </form>
      </div>
   );
}
