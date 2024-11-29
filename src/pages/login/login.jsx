import "./login.css";
import  { useState } from 'react';
import axios from 'axios';
import { Footer } from "../../components/footer/footer";
import toast from "react-hot-toast";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

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

    return(
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
}