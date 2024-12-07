
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminPage from "./pages/admin-page/admin"
import HomePage from './pages/client-page/homePage'
import LoginPage from "./pages/login/login"
import CategoriesPages from "./pages/client-page/category"
import { Toaster } from "react-hot-toast"
import { UploadComponent } from "./components/test/test3"
import About from "./pages/client-page/about"
import CategoriesPage from "./pages/client-page/category"
import SignUp from "./pages/register/signup"
import FilteredCategory from "./pages/client-page/filteredCategory"
import AddBooking from "./pages/client-page/addBookings"
import OTPVerificationPage from "./pages/client-page/OTPVerificatioPage"
import BookNow from "./pages/client-page/bookNow"

function App() {
 

  return (
   <BrowserRouter>
   <Toaster  position="top-center"
  reverseOrder={false}/>
   <Routes path="/*">
   
   
   <Route path="/admin/*" element={<AdminPage/>}/>
   <Route path="/login" element={<LoginPage/>}/>
   <Route path="/otp-verification" element={<OTPVerificationPage/>}/>
   <Route path="/categories" element={<CategoriesPages/>}/>
    <Route path="/test" element={<UploadComponent/>}/>
    <Route path="/*" element={<HomePage/>}/>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/categories" element={<CategoriesPage/>}></Route>
    <Route path="/login" element={<LoginPage/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/filtered-category" element={<FilteredCategory/>}></Route>
    <Route path='/add-booking' element={<AddBooking/>}/>
    <Route path="/booking-now" element={<BookNow/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App