import "./login.css";
import  { useState } from 'react';
import axios from 'axios';
import { Footer } from "../../components/footer/footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    const navigate = useNavigate();

    function handleLogin(){
        console.log(email, password);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", 
            {
              email: email, 
              password: password
            }
           ).then((res)=>{
           
            localStorage.setItem("token", res.data.token);
            console.log(res.data.user.disabled);
            if(res.data.user.disabled == false){
              toast.success("Successfully login..!");

              if(res.data.user.type == "customer"){
                window.location.href = "/"
  
              }else if(res.data.user.type == "admin"){
                  window.location.href = "/admin/bookings"
              }
            }
           else if(res.data.user.disabled == true){
            toast.error("Your account has been banned");
            return;
           }

           }).catch((err)=>{

            toast.error("Email or Password incorrect..!");
            console.log(`Error is ${err}`)
        });
    }

  /*  return(
      <>
        <div className="pic-bg w-full h-[100vh] flex justify-center items-center">
            
            <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center relative justify-center items-center">
             
              <h1 className="text-3xl  p-[15px] text-white text-center absolute top-[40px]">Login</h1>
              <input type="text" placeholder="Enter your email address" 
              className="w-[80%] bg-[#00000000] border border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[5px]" 
              defaultValue={email} 
              onChange={(e)=>{
               
                setEmail(e.target.value);
              }}
            />
              <input type="password" placeholder="Enter your password" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]" 
              defaultValue={password}
              onChange={(e)=>{
                console.log(e.target.value);
                setPass(e.target.value);
              }}
              />

              
              <button className="bg-blue-500 w-[80%] bottom-[40px] text-white h-[50px] absolute" onClick={
                ()=>{
                  handleLogin();
                }
              }>Login</button>
            </div>

            

        </div>
        <Footer/>
        </>
    );

    */
    return (
      <>
        <div className="pic-bg w-full h-screen flex justify-center items-center bg-cover bg-center relative">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900 via-purple-900 to-black opacity-50 z-0"></div>
    
          {/* Login Container */}
          <div className="w-[400px] h-auto backdrop-blur-md rounded-lg p-6 flex flex-col items-center shadow-lg bg-white/10 z-10">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-8">Login</h1>
    
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent border border-white text-white placeholder:text-gray-300 py-3 px-4 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
    
            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent border border-white text-white placeholder:text-gray-300 py-3 px-4 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={password}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
    
            {/* Login Button */}
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl mb-4"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
    
            {/* Sign Up Button */}
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
              onClick={() => {
                navigate("/signup"); // Navigate to the Sign Up page
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
    
    
}