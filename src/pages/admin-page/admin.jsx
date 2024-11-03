import { Link, Route, Routes } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { MdOutlineFeedback } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import AdminBooking from './../admin/Booking/adminBooking';
import AdminCategories from "../admin/categories/adminCategories";

import Users from "../admin/users/users";
import AdminFeedback from "../admin/feedback/feedback";
import GalleryItems from "../admin/galleryItems/galleryItems";
import AdminRooms from './../admin/rooms/rooms';
import AddCategoryForm from "../admin/AddCategoryForm/addCategoryForm";
export default function AdminPage(){
    return(<>
      <div className="w-full max-h-[100vh] overflow-hidden overflow-y-hidden flex">

      <div className="w-[30%] bg-blue-400 h-[100vh] flex flex-col"> 

       <div className="text-white text-[30px] text-center hover:font-bold hover:text-black flex justify-start items-center px-4"><Link to={"/admin/bookings"} className="flex items-center gap-2">  <CiBookmarkCheck /> Bookings</Link></div>
    
       <div className="text-white text-center text-[30px] hover:font-bold hover:text-black flex justify-start items-center px-4"><Link to={"/admin/categories"} className="flex items-center gap-2"> <MdOutlineCategory /> Categories</Link></div>

       <div className="text-white text-center text-[30px] hover:font-bold hover:text-black flex items-center justify-start px-4"><Link to={"/admin/rooms"} className="flex items-center gap-2"> <MdOutlineLocationOn /> Rooms</Link></div>

       <div className="text-white text-center text-[30px] hover:font-bold hover:text-black flex items-center justify-start px-4"><Link to={"/admin/users"} className="flex items-center gap-2"> <PiUsers /> Users</Link></div>

       <div className="text-white text-center text-[30px] hover:font-bold hover:text-black flex items-center justify-start px-4"> <Link to={"/admin/feedback"} className="flex items-center gap-2"> <MdOutlineFeedback /> Feedback</Link></div>
       <div className="text-white text-center text-[30px] hover:font-bold hover:text-black flex justify-start items-center px-4">  <Link to={"/admin/gallery"} className="flex items-center gap-2"> <GrGallery /> Gallery Items</Link></div>
       
      </div> 


     
     <div className="bg-blue-900 w-full max-h-[100vh] overflow-y-scroll">
       <Routes path="/*">
        <Route path="/bookings" element={<AdminBooking/>}/>
        <Route path="/categories" element={<AdminCategories/>}/>
        <Route path="/add-category" element={<AddCategoryForm/>}/>
        <Route path="/rooms" element={<AdminRooms/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/feedback" element={<AdminFeedback/>}/>
        <Route path="/gallery" element={<GalleryItems/>}/>
       </Routes>

     </div>


      </div>
    </>);
}