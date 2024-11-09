
import uploadMedia from "../../../utils/mediaUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";

export default function UpdateCategoryForm() {
   const location = useLocation();

   if(location.state == null){
     window.location.href = "/admin/categories"
      
   }

   const [name, setName] = useState(location.state.category_name);
   const [price, setPrice] = useState(location.state.price);
   const [features, setFeatures] = useState(location.state.features.join(","));
   const [description, setDescription] = useState(location.state.description);
   const [image, setImage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   
   console.log(location.state);

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

    if(image == null){
      console.log("Image is null");
      const categoryInfo = {
         description: description,
         price: price,
         features:featuresArray,
         image: location.state.image
        };

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name, 
         categoryInfo,
         {
            headers: {
               Authorization: "Bearer " + token,
            },
         }
        ).then((res)=>{
         console.log(res);
         setIsLoading(false);
         toast.success("Category was successfully updated..!");
          window.location.href = "/admin/categories"
        }).catch((err)=>{
         console.log(err);
        })
        
    }
    else{

      uploadMedia(image).then((snapshot)=>{
         console.log("Image is not null");
        getDownloadURL(snapshot.ref).then((url)=>{
           
            const categoryInfo = {
                    price: price,
                    features:featuresArray,
                    description: description,
                    image: url,  
            };

            axios.put(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name, 
               categoryInfo, 
               {
                headers:{
                    Authorization: "Bearer " + token,
                },
               }
         ).then((res)=>{
                console.log(res);
                setIsLoading(false);
                toast.success("Category was successfully updated..!");
              window.location.href = "/admin/categories"
            }).catch(()=>{
               toast.error("Category can't be updated.");
            })
        })
      })
   }
   };

   return (
      <div className="w-full h-[100vh] flex justify-center items-center">
         <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
            
            <label className="block mb-2">
               Category Name:
               <input
               disabled
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
                : <span>Update Category</span>
                }
             
            </button>
         </form>
      </div>
   );
}
