
import axios from "axios";
import { useEffect, useState} from "react";
import Header from './../../components/header/header';
import { Footer } from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";


export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!categoriesIsLoaded){
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category").then((res)=>{
       
            setCategories(res.data.categories);
            setCategoriesIsLoaded(true);
       });
        }
    }, 
    [categoriesIsLoaded]
  );

  function deleteItem(name){
      //  alert("Deleting category with name: " + name);

       axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/category/"+ name).
       then(()=>{

         setCategoriesIsLoaded(false);
       }).
       catch(()=>{

       });
  }

  return (

    <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Category List</h1>
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
                    <th className="py-3 px-4 border-b">Image</th>
                    <th className="py-3 px-4 border-b">Category Name</th>
                    <th className="py-3 px-4 border-b">Description</th>
                    <th className="py-3 px-4 border-b">Price ($)</th>
                    <th className="py-3 px-4 border-b">Features</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category, index) => (
                    <tr key={index} className="text-gray-700 hover:bg-slate-200 cursor-pointer" onClick={()=>{
                        console.log(category.category_name);
                       navigate('/filtered-category', {
                        state: { category_name: category.category_name,
                                 category_price: category.price
                         },
                       });
                         
                        }}>
                        <td className="py-3 px-4 border-b text-center">
                            <img src={category.image} alt={category.category_name} className="w-12 h-12 mx-auto" />
                        </td>
                        <td className="py-3 px-4 border-b">{category.category_name}</td>
                        <td className="py-3 px-4 border-b">{category.description}</td>
                        <td className="py-3 px-4 border-b text-center">{category.price}</td>
                        <td className="py-3 px-4 border-b">
                            <ul className="list-disc list-inside">
                                {category.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <Footer />
</div>
 );
};


// <>
    // <Header/>
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold text-center mb-6">Category List</h1>
    //   <table className="min-w-full bg-white border border-gray-200">
    //     <thead>
    //       <tr className="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
    //         <th className="py-3 px-4 border-b">Image</th>
    //         <th className="py-3 px-4 border-b">Category Name</th>
    //         <th className="py-3 px-4 border-b">Description</th>
    //         <th className="py-3 px-4 border-b">Price ($)</th>
    //         <th className="py-3 px-4 border-b">Features</th>
    //         {/* <th className="py-3 px-4 border-b">Status</th> */}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {categories.map((category, index) => (
    //         <tr key={index} className="text-gray-700">
    //           <td className="py-3 px-4 border-b text-center">
    //             <img src={category.image} alt={category.category_name} className="w-12 h-12 mx-auto"/>
    //           </td>
    //           <td className="py-3 px-4 border-b">{category.category_name}</td>
    //           <td className="py-3 px-4 border-b">{category.description}</td>
    //           <td className="py-3 px-4 border-b text-center">{category.price}</td>
    //           <td className="py-3 px-4 border-b">
    //             <ul className="list-disc list-inside">
    //               {category.features.map((feature, i) => (
    //                 <li key={i}>{feature}</li>
    //               ))}
    //             </ul>
    //           </td>
    //           {/* <td className="py-2 px-4 border-b"><button className="bg-red-500 text-white px-4 py-1 rounded-lg ml-2"
    //           onClick={()=>{
    //             deleteItem(category.category_name);
    //           }}
    //           >Delete</button></td> */}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    
    // </div>
    // <Footer/>
    
    // </>
    
