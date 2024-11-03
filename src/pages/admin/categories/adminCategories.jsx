import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function AdminCategories(){

    const token = localStorage.getItem("token");
    console.log("Token " + token);
    if(token == null){
        window.location.href = "/login";
    }
   const[categories, setCategories] = useState([]);
   const[categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

    const navigate = useNavigate();


   useEffect(
    ()=>{

      if(!categoriesIsLoaded)
    {
     axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category").then((res)=>{
      console.log(res.data.categories);
      setCategories(res.data.categories);
      setCategoriesIsLoaded(true);
     }).catch((err)=>{
      console.log(err);
     });
  }
   
    }, [categoriesIsLoaded]);

    function handleDelete(name){

    // toast.success("Category deleted!");

      console.log(name);
      axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name,
        {
          headers:{
            Authorization: "Bearer "+ token
          }
        }).then((res)=>{
          toast.success("Category Successfully Deleted!");
          setCategoriesIsLoaded(false);
        }).catch((err)=>{
          toast.success("Category can't be deleted.")
        });
  } 

  function handlePlusClick(){
    console.log("Plus clicked");
    // window.location.href = "/admin/add-category";
    navigate("/admin/add-category");
  }

  // Function to handle editing a category (this could open an edit modal, for example)
  const handleEdit = (category) => {
    console.log("Edit category", category);
    // Here, you could open a modal to edit the category
  };

    return(
      <div className="w-full">
        <button className="bg-red-500 w-[60px] h-[60px] rounded-full text-2xl text-center flex items-center justify-center fixed bottom-2 right-5" 
        onClick={()=>{
          handlePlusClick();
        }}> <FaPlus color='white'/> </button>
      <h2 className="text-2xl font-semibold mb-4">Admin Categories</h2> 
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Category Name</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Features</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{category.category_name}</td>
              <td className="border border-gray-300 p-2">{category.description}</td>
              <td className="border border-gray-300 p-2">${category.price.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc list-inside">
                  {category.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 p-2">
                {category.image ? (
                  <img src={category.image} alt={category.category_name} className="w-20 h-20 object-cover" />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border border-gray-300 p-2 flex items-center justify-center space-x-2">
                <button
                  onClick={() => {}}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                <FaEdit />
                </button>
                <button
                  onClick={() => {
                    handleDelete(category.category_name);
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