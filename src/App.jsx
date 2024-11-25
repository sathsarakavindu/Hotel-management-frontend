
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminPage from "./pages/admin-page/admin"
import HomePage from './pages/client-page/homePage'

import LoginPage from "./pages/login/login"
import CategoriesPages from "./pages/client-page/category"
//import TestComponent from "./components/test/test"
import { Toaster } from "react-hot-toast"
import { UploadComponent } from "./components/test/test3"
import About from "./pages/client-page/about"
import CategoriesPage from "./pages/client-page/category"
import SignUp from "./pages/register/signup"
import FilteredCategory from "./pages/client-page/filteredCategory"
import AddRooms from "./pages/admin/AddRoomPage/AddRoom"
import AddBooking from "./pages/client-page/addBookings"

function App() {
 

  return (
   <BrowserRouter>
   <Toaster  position="top-center"
  reverseOrder={false}/>
   <Routes path="/*">
   
   
   <Route path="/admin/*" element={<AdminPage/>}/>
   <Route path="/login" element={<LoginPage/>}/>
   <Route path="/categories" element={<CategoriesPages/>}/>
    <Route path="/test" element={<UploadComponent/>}/>
    <Route path="/*" element={<HomePage/>}/>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/categories" element={<CategoriesPage/>}></Route>
    <Route path="/login" element={<LoginPage/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/filtered-category" element={<FilteredCategory/>}></Route>
    <Route path='/add-booking' element={<AddBooking/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App

/*
import Header from "./components/header/header"
import HomePage from './pages/client-page/homePage';
import TestComponent from './components/test/test';
import { UploadComponent } from './components/test/test3';
import About from './pages/client-page/about';

function App() {
  return (
    <>
      <Header />
      <div className="w-full h-screen bg-blue-900 flex items-center justify-center">
        <div className="border border-white bg-white p-8 rounded-lg w-[700px] shadow-lg">
          <form className="flex flex-col space-y-6">
            <div className="flex justify-between items-center space-x-4">
              <label htmlFor="start-date" className="font-semibold text-blue-900">Start Date:</label>
              <input
                type="date"
                id="start-date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between items-center space-x-4">
              <label htmlFor="end-date" className="font-semibold text-blue-900">End Date:</label>
              <input
                type="date"
                id="end-date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between items-center space-x-4">
              <label htmlFor="category" className="font-semibold text-blue-900">Category:</label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Luxury</option>
                <option>Normal</option>
                <option>Low</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App;
*/