// import { useState } from "react";
// import { Footer } from "../../components/footer/footer";
// import Header from "../../components/header/header";
// import './sign Up Styles/signUp.css';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function SignUp(){

//   const [fname, getFName] = useState("");
//   const [lname, getLName] = useState("");
//   const [email, getEmail] = useState("");
//   const [password, getPassword] = useState("");
//   const [whatsapp, getwhatsapp] = useState("");
//   const [telephone, getTelephone] = useState("");

//   const navigate = useNavigate();

//   const submitData = async (e) =>{
//     e.preventDefault();
//      if(!fname || !lname || !email || !password || !telephone){
//            alert("All required field must be filled out.");
//            return;
//      }
//      const userData = {
//       firstName: fname,
//       lastName: lname,
//       email: email,
//       password: password,
//       whatsapp: whatsapp,
//       phone: telephone,
//       type: "customer",
//       disabled: false,
//       emailVerified: false,
//     };

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/users`,
//         userData
//       );
//       console.log("User registered successfully:", response.data);
//       // Navigate to the login page after successful registration
//       navigate("/login");
//     } catch (error) {
//       console.error("Error during user registration:", error);
//       alert("Registration failed. Please try again.");
//     }

//   };


// return(
//   <>
//   <Header />
//   <div className="w-full h-screen pic-bg-signup flex items-center justify-center px-4">
//       <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-3xl shadow-lg">
//           <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//           <form className="space-y-4">
//               <div className="flex flex-wrap gap-4">
//                   <input
//                   required
//                       type="text"
//                       placeholder="First Name"
//                       className="flex-1 min-w-[45%] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                       onChange={(e)=>{
//                           getFName(e.target.value);
//                       }}
//                   />
//                   <input
//                       type="text"
//                       placeholder="Last Name"
//                       className="flex-1 min-w-[45%] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                       onChange={(e)=>{
//                         getLName(e.target.value);
//                       }}
//                   />
//               </div>
//               <input
//                   required
//                   type="email"
//                   placeholder="Email"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                   onChange={(e)=>{
//                     getEmail(e.target.value);
//                   }}
//              />
//               <input
//                   required
//                   type="password"
//                   placeholder="Password"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                   onChange={(e)=>{
//                     getPassword(e.target.value);
//                   }}
//               />
//               <input
//                   type="text"
//                   placeholder="WhatsApp No"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                   onChange={(e)=>{
//                     getwhatsapp(e.target.value);
//                   }}
//               />
//               <input
//                    required
//                   type="text"
//                   placeholder="Contact No"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                   onChange={(e)=>{
//                     getTelephone(e.target.value);
//                   }}
//               />
//               <button
//                   type="submit"
//                   className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
//                   onClick={()=>{}}
//               >
//                   Register
//               </button>
//           </form>
//       </div>
//   </div>
//   <Footer />
// </>
// );
  
// }
import { useState } from "react";
import { Footer } from "../../components/footer/footer";
import Header from "../../components/header/header";
import './sign Up Styles/signUp.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function SignUp() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telephone, setTelephone] = useState("");

  const navigate = useNavigate();

  const submitData = async (e) => {
    e.preventDefault(); // Prevents form submission default behavior

    // Input validation (optional, but recommended)
    if (!fname || !lname || !email || !password || !telephone) {
      alert("All required fields must be filled out.");
      return;
    }

    const userData = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      whatsapp: whatsapp,
      phone: telephone,
      type: "customer",
      disabled: false,
      emailVerified: false,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        userData 
      );
      toast.success("Successfully registered..!");
      console.log("User registered successfully:", response.data);
      // Navigate to the login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Error during user registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen pic-bg-signup flex items-center justify-center px-4">
        <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form className="space-y-4" onSubmit={submitData}>
            <div className="flex flex-wrap gap-4">
              <input
                required
                type="text"
                placeholder="First Name"
                className="flex-1 min-w-[45%] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setFName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="flex-1 min-w-[45%] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="WhatsApp No"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Contact No"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setTelephone(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
