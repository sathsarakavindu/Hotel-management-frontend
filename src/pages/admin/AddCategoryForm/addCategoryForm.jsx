
import uploadMedia from "../../../utils/mediaUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getDownloadURL } from "firebase/storage";

export default function AddCategoryForm() {
   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [features, setFeatures] = useState("");
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
    const featuresArray = features.split(',');
    console.log(featuresArray);

      uploadMedia(image).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
            console.log(url);
            const categoryInfo = {
                
                    category_name: name,
                    description: description,
                    price: price,
                    features:featuresArray,
                    image: url
                  
            };

            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/category", categoryInfo, {
                headers:{
                    Authorization: "Bearer " + token
                }
            }).then((res)=>{
                console.log(res);
                setIsLoading(false);
                toast.success("Category was successfully added..!");
            }).catch(()=>{
               toast.error("Category can;t be added");
            })
        })
      })
   };

   return (
      <div className="w-full h-[100vh] flex justify-center items-center">
         <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
            
            <label className="block mb-2">
               Category Name:
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter category name"
                  required
               />
            </label>

            <label className="block mb-2">
               Price:
               <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter price"
                  required
               />
            </label>

            <label className="block mb-2">
               Features (comma-separated):
               <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter features (e.g., Free Wi-Fi, Air conditioning)"
               />
            </label>

            <label className="block mb-2">
               Description:
               <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter category description"
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
                {
                    isLoading?
                    <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
                : <span>Add Category</span>
                }
             
            </button>
         </form>
      </div>
   );
}
